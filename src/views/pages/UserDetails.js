import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
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
        width: "60%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default function UserDetails({open, setOpen, data}) {

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = React.useState({
        id: data.id,
        name: data.name,
        username: data.username,
        role: data.role,
        primers: data.primers
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const classes = useStyles();

    return (
        <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">User Details</DialogTitle>
            <DialogContent>
                <Paper className={classes.paper}>
                    <div className={classes.paperCenter}>
                        <Typography variant="h5" gutterBottom>
                            Edit user
                        </Typography>
                        <DialogContentText>
                            The fields marked with a "*" are mandatory.
                        </DialogContentText>

                        <form
                            name="primerForm"
                            className={classes.form}
                            noValidate
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <Typography gutterBottom variant="h6">
                                        Properties of user
                                    </Typography>
                                </Grid>

                                <Divider variant="middle" />

                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="role"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Role"
                                        value={formData.role}
                                        onChange={handleChange}
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
                                Save
                            </Button>
                        </form>
                    </div>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
