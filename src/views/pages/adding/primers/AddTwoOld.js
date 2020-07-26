import React, {useEffect, useRef} from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../../constants";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import {Redirect, useHistory} from "react-router-dom";
import PrimersService from "../../../../services/PrimersService";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthService from "../../../../services/AuthService";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
        width: "85%",
    },
    paperCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default function AddOne() {
    const [state, setState] = React.useState(Constants.defaultPrimerData);
    const [forwState, setForwState] = React.useState(Constants.defaultPrimerData);
    const [revState, setRevState] = React.useState(Constants.defaultPrimerData);
    const [date, setDate] = React.useState(Date.now());
    const [foreignTables, setForeignTables] = React.useState({isLoaded: false});

    const formRef = useRef();
    const forwRef = useRef();
    const revRef = useRef();


    useEffect(() => {
        PrimersService.getAllForeignTables()
            .then((tables) => {
                return {...Constants.foreignTables, ...tables, isLoaded: true};
            })
            .then(setForeignTables);
    }, []);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleType = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleNumbers = (event) => {
        if (!isNaN(event.target.value))
            setState({
                ...state,
                [event.target.name]: event.target.value,
            });
    };

    const handleNumbersForw = (event) => {
        if (!isNaN(event.target.value))
            setForwState({
                ...forwState,
                [event.target.name]: event.target.value,
            });
    };

    const handleNumbersRev = (event) => {
        if (!isNaN(event.target.value))
            setRevState({
                ...revState,
                [event.target.name]: event.target.value,
            });
    };

    const handleLettersForw = (event) => {
        setForwState({
            ...forwState,
            [event.target.name]: event.target.value.replace(/([^a-zA-Z])/g, "").toUpperCase(),
        });
    };
    const handleLettersRev = (event) => {
        setRevState({
            ...revState,
            [event.target.name]: event.target.value.replace(/([^a-zA-Z])/g, "").toUpperCase(),
        });
    };

    const classes = useStyles();
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        let commonData = new FormData(formRef.current);
        let forwData = new FormData(forwRef.current);
        let revData = new FormData(revRef.current);


        PrimersService.getPrimerJsonExample().then((primer) => {
            let forw = {...primer};
            let rev = {...primer};

            commonData.forEach((value, key) => {
                forw[key] = value;
            });
            forwData.forEach((value, key) => {
                forw[key] = value;
            });
            commonData.forEach((value, key) => {
                rev[key] = value;
            });
            revData.forEach((value, key) => {
                rev[key] = value;
            });

            if (Constants.requiredOld.some((el) => forw[el] === "" && rev[el] === "")
                // eslint-disable-next-line
                || (rev["typeOfPrimer"] === "TaqProbe" && (rev["assayId"] == "" || rev["size"] == ""))) {
                alert("Required field missing.");
                return;
            }

            forw["orderStatus"] = "received";
            forw["orientation"] = "forward";
            forw["date"] = date;
            rev["orderStatus"] = "received";
            rev["orientation"] = "reverse";
            forw["date"] = date;

            console.log(forw);
            console.log(rev);

            PrimersService.add(forw)
                .then((forwPrimer) => {
                    PrimersService.add(rev).then((revPrimer) => {
                        PrimersService.addPair(forwPrimer, revPrimer);
                    });
                })
                .then(history.push("/dashboard"))
                .catch((err) => alert("Error adding primer:", err));

        });
    }

    const xsWidth = 12;
    const smWidth = 4;

    if (AuthService.getUserRole() !== 'ADMIN' && AuthService.getUserRole() !== 'RESEARCHER') {
        return <Redirect to='/dashboard'/>
    } else if (!foreignTables.isLoaded) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: "90vh"}}
            >
                <CircularProgress/>
            </Grid>
        );
    } else {
        return (
            <div className={classes.paperCenter}>
                <Paper className={classes.paper}>
                    <div className={classes.paperCenter}>
                        <Typography variant="h4" gutterBottom>
                            Add a pair of old primers
                        </Typography>
                        <DialogContentText>
                            The fields marked with a "*" are required.
                        </DialogContentText>
                        <DialogContentText>
                            Enter decimal numbers with "." and not ",".
                        </DialogContentText>

                        <form
                            ref={formRef}
                            name="commonForm"
                            className={classes.form}
                            noValidate
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography gutterBottom variant="h5">
                                        Common features
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        autoFocus
                                        options={foreignTables.organism}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="organism"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Organism"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="gen"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Gen"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="ncbiGenId"
                                        variant="outlined"
                                        fullWidth
                                        label="NCBI gen ID"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        options={foreignTables.humanGenomBuild}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="humanGenomBuild"
                                                variant="outlined"
                                                fullWidth
                                                label="Human genom build"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="lengthOfAmplicone"
                                        variant="outlined"
                                        fullWidth
                                        label="Length of amplicone"
                                        value={state.lengthOfAmplicone}
                                        onChange={handleNumbers}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel htmlFor="typeLabel">Type of primer</InputLabel>
                                        <Select
                                            native
                                            value={state.typeOfPrimer}
                                            onChange={handleType}
                                            label="Type of primer"
                                            inputProps={{
                                                name: "typeOfPrimer",
                                                id: "typeLabel",
                                            }}
                                        >
                                            <option aria-label="None" value=""/>
                                            {foreignTables.typeOfPrimer.map((constant) => (
                                                <option key={constant} value={constant}>{constant}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
                                        dispaly="block"
                                        style={useStyles.verticalCenter}
                                    >
                                        Did you check specificity in Blast?
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            aria-label="checkSpecifityInBlast"
                                            name="checkSpecifityInBlast"
                                            defaultValue="false"
                                        >
                                            <FormControlLabel
                                                value="true"
                                                control={<Radio color="primary"/>}
                                                label="Yes"
                                                labelPlacement="top"
                                            />
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio color="primary"/>}
                                                label="No"
                                                labelPlacement="top"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}></Grid>

                                {state.typeOfPrimer === "TaqProbe" && (
                                    <React.Fragment>
                                        <Grid item xs={xsWidth} sm={smWidth * 3}>
                                            <Typography variant="h6" gutterBottom>
                                                TaqProbe
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={xsWidth} sm={smWidth * 2}>
                                            <TextField
                                                name="sondaSequence"
                                                variant="outlined"
                                                fullWidth
                                                label="Sonda sequence"
                                            />
                                        </Grid>

                                        <Grid item xs={xsWidth} sm={smWidth}>
                                            <TextField
                                                name="assayId"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                label="Assay ID"
                                            />
                                        </Grid>


                                        <Grid item xs={xsWidth} sm={smWidth}>
                                            <Autocomplete
                                                options={Constants.size}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        required
                                                        name="size"
                                                        fullWidth
                                                        label="Size"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={xsWidth} sm={smWidth}>
                                            <Autocomplete
                                                options={foreignTables.threeQuencher}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        name="threeQuencher"
                                                        variant="outlined"
                                                        fullWidth
                                                        label="3' Quencher"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={xsWidth} sm={smWidth}>
                                            <Autocomplete
                                                options={foreignTables.fiveDye}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        name="fiveDye"
                                                        variant="outlined"
                                                        fullWidth
                                                        label="5' Dye"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </React.Fragment>
                                )}

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Form of ordered primer
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.formulation}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="formulation"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Formulation"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.storingT}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="storingT"
                                                variant="outlined"
                                                fullWidth
                                                label="Storing T (°C)"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.purificationMethod}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="purificationMethod"
                                                variant="outlined"
                                                fullWidth
                                                label="Purification method"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={8} sm={2}>
                                    <TextField
                                        name="amountAvailablePackType"
                                        variant="outlined"
                                        fullWidth
                                        select
                                        label="Pack type"
                                        value={state.amountAvailablePackType}
                                        onChange={handleChange}
                                    >
                                        {Constants.amountAvailablePackType.map((options) => (
                                            <MenuItem key={options.value} value={options.value}>
                                                {options.value}
                                            </MenuItem>
                                        ))}
                                        />
                                    </TextField>
                                </Grid>
                                <Grid item xs={3} sm={1}>
                                    <TextField
                                        name="amountAvailablePacks"
                                        variant="outlined"
                                        fullWidth
                                        label="Num"
                                        onChange={handleNumbers}
                                    />
                                </Grid>

                                <Grid item xs={1} sm={1}/>

                                <Grid item xs={8} sm={2}>
                                    <TextField
                                        name="amountAvailable"
                                        variant="outlined"
                                        fullWidth
                                        label="Amount available"
                                        value={state.amountAvailable}
                                        onChange={handleNumbers}
                                    />
                                </Grid>
                                <Grid item xs={3} sm={1}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Unit"
                                        value={
                                            state.amountAvailablePackType === "Plate" ? "wells" : "µl"
                                        }
                                    />
                                </Grid>

                                <Grid item xs={1} sm={1}/>

                                <Grid item xs={8} sm={2}>
                                    <TextField
                                        name="concentrationOrdered"
                                        variant="outlined"
                                        fullWidth
                                        label="Concentration"
                                        value={state.concentrationOrdered}
                                        onChange={handleNumbers}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={2}>
                                    <TextField
                                        name="concentrationOrderedUnit"
                                        variant="outlined"
                                        fullWidth
                                        select
                                        label="Unit"
                                        value={state.concentrationOrderedUnit}
                                        onChange={handleChange}
                                    >
                                        {Constants.concentrationOrderedUnit.map((options) => (
                                            <MenuItem key={options.value} value={options.value}>
                                                {options.label}
                                            </MenuItem>
                                        ))}
                                        />
                                    </TextField>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Project information
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.project}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                fullWidth
                                                name="project"
                                                label="Project"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.primerApplication}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                required
                                                name="primerApplication"
                                                fullWidth
                                                label="Application"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    {/* user is added automatically in backend so no reason to have the field,
                      leaving it for now, if we'll have to add it later */}
                                    {/* <TextField
                    variant="outlined"
                    value={foreignTables.currentUser}
                    fullWidth
                    label="User"
                  /> */}
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="applicationComment"
                                        label="Application comment"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Designer information
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="designerName"
                                        variant="outlined"
                                        fullWidth
                                        label="Name & surname"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="designerPublication"
                                        variant="outlined"
                                        fullWidth
                                        label="Publication"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="designerPublication"
                                        variant="outlined"
                                        fullWidth
                                        label="Link to database"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Supplier information
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.supplier}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="supplier"
                                                variant="outlined"
                                                fullWidth
                                                label="Supplier"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.manufacturer}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="manufacturer"
                                                variant="outlined"
                                                fullWidth
                                                label="Manufacturer"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            name="date"
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            label="Date of receipt"
                                            onChange={setDate}
                                            value={date}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Additional information
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="document"
                                        label="Documentation"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="comment"
                                        label="Comment"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="analysis"
                                        label="Analysis"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </form>

                        <p></p>
                        <p></p>
                        <form
                            ref={forwRef}
                            name="forwardForm"
                            className={classes.form}
                            noValidate
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography gutterBottom variant="h5">
                                        Forward primer
                                    </Typography>
                                </Grid>

                                <Divider variant="middle"/>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Name of primer"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 2}>
                                    <TextField
                                        name="sequence"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Sequence"
                                        value={forwState.sequence}
                                        onChange={handleLettersForw}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Length"
                                        value={forwState.sequence ? forwState.sequence.length : 0}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="tm"
                                        variant="outlined"
                                        fullWidth
                                        label="Tm (°C)"
                                        value={forwState.tm}
                                        onChange={handleNumbersForw}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="gcpercent"
                                        variant="outlined"
                                        fullWidth
                                        label="GC (%)"
                                        value={forwState.gcpercent}
                                        onChange={handleNumbersForw}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="optimalTOfAnnealing"
                                        variant="outlined"
                                        fullWidth
                                        label="Optimal T of annealing (°C)"
                                        value={forwState.optimalTOfAnnealing}
                                        onChange={handleNumbersForw}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.positionInReference}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="positionInReference"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Position in the reference"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.fiveModification}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="fiveModification"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="5' Modification"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.threeModification}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="threeModification"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="3' Modification"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Location of the primer in laboratory
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.freezer}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                name="freezer"
                                                required
                                                fullWidth
                                                label="Freezer"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.drawer}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                required
                                                name="drawer"
                                                fullWidth
                                                label="Drawer"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.box}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="box"
                                                label="Box"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Additional information
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="comment"
                                        label="Comment"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </form>

                        <p></p>
                        <p></p>
                        <form
                            ref={revRef}
                            name="reverseForm"
                            className={classes.form}
                            noValidate
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography gutterBottom variant="h5">
                                        Reverse primer
                                    </Typography>
                                </Grid>

                                <Divider variant="middle"/>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Name of primer"
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 2}>
                                    <TextField
                                        name="sequence"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Sequence"
                                        value={revState.sequence}
                                        onChange={handleLettersRev}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Length"
                                        value={revState.sequence ? revState.sequence.length : 0}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="tm"
                                        variant="outlined"
                                        fullWidth
                                        label="Tm (°C)"
                                        value={revState.tm}
                                        onChange={handleNumbersRev}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="gcpercent"
                                        variant="outlined"
                                        fullWidth
                                        label="GC (%)"
                                        value={revState.gcpercent}
                                        onChange={handleNumbersRev}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="optimalTOfAnnealing"
                                        variant="outlined"
                                        fullWidth
                                        label="Optimal T of annealing (°C)"
                                        value={revState.optimalTOfAnnealing}
                                        onChange={handleNumbersRev}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.positionInReference}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="positionInReference"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Position in the reference"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.fiveModification}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="fiveModification"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="5' Modification"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.threeModification}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="threeModification"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="3' Modification"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Location of the primer in laboratory
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.freezer}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                name="freezer"
                                                required
                                                fullWidth
                                                label="Freezer"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.drawer}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                required
                                                name="drawer"
                                                fullWidth
                                                label="Drawer"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
                                        options={foreignTables.box}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="box"
                                                label="Box"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Additional information
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <TextField
                                        name="comment"
                                        label="Comment"
                                        multiline
                                        fullWidth
                                        rows={2}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={submit}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Paper>
            </div>
        );
    }
}
