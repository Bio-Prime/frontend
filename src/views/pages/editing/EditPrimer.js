import React, { useRef } from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../constants";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import {Redirect} from "react-router-dom";
import PrimersService from "../../../services/PrimersService";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

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

export default function EditPrimer(props) {

    const setPrimersData = () => {
        if (typeof props.location.state !== 'undefined') {
            const primerData = props.location.state.data;

            // clean object
            for (let key in primerData) {
                if (primerData[key] === null || primerData[key] === undefined) {
                    primerData[key] = '';
                }
            }

            return primerData;
        } else return Constants.defaultPrimerData;
    };

    const [state, setState] = React.useState(setPrimersData);
    const formRef = useRef();

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

    // success alert
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const submit = (e) => {
        e.preventDefault();
        let formdata = new FormData(formRef.current);
        // original data that was put into the component
        let primerData = setPrimersData();

        formdata.forEach((value, key) => {
            primerData[key] = value;
        });

        PrimersService.update(primerData).then(returnData => {
            if (returnData != null) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
            setOpen(true);
        });
    };

    const showAlert = () => {
        if (success) {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    Primer successfully updated!
                </Alert>
            )
        } else {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    There was an error updating primer. Primer was not updated!
                </Alert>
            )
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const xsWidth = 12;
    const smWidth = 4;

    const renderRedirect = () => {
        if (typeof props.location.state === 'undefined') {
            return <Redirect to='/' />
        }
    };

    return (
        <div className={classes.paperCenter}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                {showAlert()}
            </Snackbar>
            <Paper className={classes.paper}>
                {renderRedirect()}
                <div className={classes.paperCenter}>
                    <Typography variant="h5" gutterBottom>
                        Edit oligonucleotide primer
                    </Typography>
                    <DialogContentText>
                        The fields marked with a "*" are mandatory.
                    </DialogContentText>

                    <form
                        ref={formRef}
                        name="primerForm"
                        className={classes.form}
                        noValidate
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <Typography gutterBottom variant="h6">
                                    Properties of oligonucleotide primer
                                </Typography>
                            </Grid>

                            <Divider variant="middle" />

                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Name of primer"
                                    defaultValue={state.name}
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
                                    required
                                    fullWidth
                                    label="Optimal T of annealing (°C)"
                                    value={state.optimalTOfAnnealing}
                                    onChange={handleNumbers}
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.organism}
                                    freeSolo
                                    options={Constants.organism}
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
                                    defaultValue={state.gen}
                                    name="gen"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Gen"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <TextField
                                    defaultValue={state.ncbiGenId}
                                    name="ncbiGenId"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="NCBI gen ID"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.humanGenomBuild}
                                    options={Constants.humanGenomBuild}
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
                                    defaultValue={state.positionInReference}
                                    options={Constants.positionInReference}
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
                                    defaultValue={state.typeOfPrimer}
                                    options={Constants.typeOfPrimer}
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
                                    defaultValue={state.fiveModification}
                                    options={Constants.fiveModification}
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
                                    defaultValue={state.threeModification}
                                    options={Constants.threeModification}
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
                                    Did you chech specificity in Blast?
                                </Typography>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="checkSpecifityInBlast"
                                        name="checkSpecifityInBlast"
                                        defaultValue={String(state.checkSpecifityInBlast)}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio color="primary" />}
                                            label="Yes"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio color="primary" />}
                                            label="No"
                                            labelPlacement="top"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}></Grid>

                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <Typography variant="h6" gutterBottom>
                                    Form of ordered primer
                                </Typography>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.formulation}
                                    options={Constants.formulation}
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
                                    defaultValue={state.storingT}
                                    freeSolo
                                    options={Constants.storingT}
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
                                    defaultValue={state.purificationMethod}
                                    options={Constants.purificationMethod}
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
                                            {options.label}
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
                                    value={state.amountAvailablePacks}
                                    onChange={handleNumbers}
                                />
                            </Grid>

                            <Grid item xs={1} sm={1} />

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

                            <Grid item xs={1} sm={1} />

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
                                    {Constants.concentrationOrderedUnit.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                    />
                                </TextField>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <Typography variant="h6" gutterBottom>
                                    Location of the primer in laboratory
                                </Typography>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.freezer}
                                    freeSolo
                                    options={Constants.freezer}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            name="freezer"
                                            required
                                            fullWidth
                                            label="Freezerd"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.drawer}
                                    freeSolo
                                    options={Constants.drawer}
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
                                    defaultValue={state.box}
                                    freeSolo
                                    options={Constants.box}
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
                                    Project information
                                </Typography>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.project}
                                    freeSolo
                                    options={Constants.project}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            required
                                            fullWidth

                                            name="project"
                                            label="Project"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <Autocomplete
                                    defaultValue={state.primerApplication}
                                    freeSolo
                                    options={Constants.primerApplication}
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
                                <TextField
                                    name="user"
                                    variant="outlined"
                                    value={state.user}
                                    fullWidth
                                    label="User"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <TextField
                                    defaultValue={state.applicationComment}
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
                                    defaultValue={state.designerName}
                                    name="designerName"
                                    variant="outlined"
                                    fullWidth
                                    label="Name & surname"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <TextField
                                    defaultValue={state.designerPublication}
                                    name="designerPublication"
                                    variant="outlined"
                                    fullWidth
                                    label="Publication"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <TextField
                                    defaultValue={state.designerPublication}
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
                                <TextField
                                    defaultValue={state.supplier}
                                    name="supplier"
                                    variant="outlined"
                                    fullWidth
                                    label="Supplier"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth}>
                                <TextField
                                    defaultValue={state.manufacturer}
                                    name="manufacturer"
                                    variant="outlined"
                                    fullWidth
                                    label="Manufacturer"
                                />
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <Typography variant="h6" gutterBottom>
                                    Additional information
                                </Typography>
                            </Grid>

                            <Grid item xs={xsWidth} sm={smWidth * 3}>
                                <TextField
                                    defaultValue={state.document}
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
                                    defaultValue={state.comment}
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
                                    defaultValue={state.analysis}
                                    name="analysis"
                                    label="Analysis"
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