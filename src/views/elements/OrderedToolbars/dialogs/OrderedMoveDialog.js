import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import Constants from "../../../pages/constants";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import PrimersService from "../../../../services/PrimersService";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function OrderedMoveDialog({open, setOpen, data}) {

    const history = useHistory();

    const [state, setState] = React.useState(Constants.defaultPrimerData);

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

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    const handleClickMove = (e) => {
        e.preventDefault();
        let formdata = new FormData(formRef.current);
        var primer = data;
        formdata.forEach((value, key) => {
            primer[key] = value;
        });

        // set order status to wanted
        primer["orderStatus"] = "received";

        PrimersService.update(primer).then(() => history.push('/dashboard'));
    };

    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Move to Primers</DialogTitle>
            <DialogContent>
                <div className={classes.root}>

                    <form
                        ref={formRef}
                        name="primerForm"
                        className={classes.form}
                        noValidate
                    >
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                    Set amount available
                                </Typography>
                            </Grid>

                            <Grid item xs={8} sm={4}>
                                <TextField
                                    name="amountAvailablePackType"
                                    variant="outlined"
                                    fullWidth
                                    required
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
                            <Grid item xs={2} sm={2}>
                                <TextField
                                    name="amountAvailablePacks"
                                    variant="outlined"
                                    fullWidth
                                    label="Num"
                                    onChange={handleNumbers}
                                />
                            </Grid>

                            <Grid item xs={8} sm={4}>
                                <TextField
                                    name="amountAvailable"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    label="Amount available"
                                    value={state.amountAvailable}
                                    onChange={handleNumbers}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Unit"
                                    value={
                                        state.amountAvailablePackType === "Plate" ? "wells" : "µl"
                                    }
                                />
                            </Grid>


                            <Grid item xs={12} sm={12}>
                                <Autocomplete
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


                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                    Location of the primer in laboratory
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Autocomplete
                                    freeSolo
                                    options={Constants.freezer}
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

                            <Grid item xs={12} sm={4}>
                                <Autocomplete
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

                            <Grid item xs={12} sm={4}>
                                <Autocomplete
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

                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                    Project information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Autocomplete
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

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="user"
                                    variant="outlined"
                                    value={Constants.currentUser}
                                    fullWidth
                                    label="User"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                    Additional information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="analysis"
                                    label="Analysis"
                                    multiline
                                    fullWidth
                                    rows={2}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleClickMove}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
