import React, {useEffect, useRef} from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../../constants";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import { useHistory } from 'react-router-dom';
import PrimersService from "../../../../services/PrimersService";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
        width: '85%',
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
    const [date, setDate] = React.useState(Date.now().toString());
    const [foreignTables, setForeignTables] = React.useState({isLoaded:false});

    const formRef = useRef();

    useEffect(() => {
        PrimersService.getAllForeignTables().then((tables) => {
            return {...Constants.foreignTables, ...tables, isLoaded:true };
        }).then(setForeignTables);
    }, []);

    const handleChange = (event) => {
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

    const handleLetters = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value.replace(/([^a-zA-Z])/g, ""),
        });
    };

    const classes = useStyles();
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        let formdata = new FormData(formRef.current);
        var primer = {};
        formdata.forEach((value, key) => {
            primer[key] = value;
        });

        if (Constants.requiredWanted.every((el) => primer[el] !== "")) {
            // set to empty strings
            primer["storingT"] = "";
            primer["amountAvailablePackType"] = "";
            primer["amountAvailablePacks"] = "";
            primer["amountAvailable"] = "";
            primer["freezer"] = "";
            primer["drawer"] = "";
            primer["box"] = "";
            primer["project"] = "";
            primer["analysis"] = "";
            primer["date"] = date;

            // set order status to wanted
            primer["orderStatus"] = "wanted";
            PrimersService.add(primer).then(history.push('/orders')).catch((err) => alert("Error adding primer:", err));
        } else {
            alert("Required field missing.");
        }
    };

    const xsWidth = 12;
    const smWidth = 4;

    if (!foreignTables.isLoaded) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "90vh" }}
            >
                <CircularProgress />
            </Grid>
        );
    } else {
        return (
            <div className={classes.paperCenter}>
                <Paper className={classes.paper}>
                    <div className={classes.paperCenter}>
                        <Typography variant="h5" gutterBottom>
                            Add one wanted oligonucleotide primer
                        </Typography>
                        <DialogContentText>
                            The fields marked with a "*" are required.
                        </DialogContentText>
                        <DialogContentText>
                            Enter decimal numbers with "." and not ",".
                        </DialogContentText>

                        <form
                            ref={formRef}
                            name="primerForm"
                            className={classes.form}
                            noValidate
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography gutterBottom variant="h6">
                                        Properties of oligonucleotide primer
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
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth * 2}>
                                    <TextField
                                        name="sequence"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Sequence"
                                        value={state.sequence}
                                        onChange={handleLetters}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="length"
                                        variant="outlined"
                                        fullWidth
                                        label="Length"
                                        value={state.sequence ? state.sequence.length : 0}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="tm"
                                        variant="outlined"
                                        fullWidth
                                        label="Tm (°C)"
                                        value={state.tm}
                                        onChange={handleNumbers}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="gcpercent"
                                        variant="outlined"
                                        fullWidth
                                        label="GC (%)"
                                        value={state.gcpercent}
                                        onChange={handleNumbers}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <TextField
                                        name="optimalTOfAnnealing"
                                        variant="outlined"
                                        fullWidth
                                        label="Optimal T of annealing (°C)"
                                        value={state.optimalTOfAnnealing}
                                        onChange={handleNumbers}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
                                        freeSolo
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
                                        required
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
                                    <Autocomplete
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
                                    <Autocomplete
                                        options={foreignTables.typeOfPrimer}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="typeOfPrimer"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Type of primer"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
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

                                <Grid item xs={xsWidth} sm={smWidth}/>

                                <Grid item xs={xsWidth} sm={smWidth * 3}>
                                    <Typography variant="h6" gutterBottom>
                                        Form of ordered primer
                                    </Typography>
                                </Grid>

                                <Grid item xs={xsWidth} sm={smWidth}>
                                    <Autocomplete
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
                                        name="concentrationOrdered"
                                        variant="outlined"
                                        fullWidth
                                        required
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
                                            onAccept={setDate}

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

                            </Grid>
                            <Button
                                type="submit"
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
