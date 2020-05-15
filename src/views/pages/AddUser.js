import React, { useRef } from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Constants from "./constants";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";

const useStyles = makeStyles((theme) => ({
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

export default function AddUser() {
    const [state, setState] = React.useState(Constants.defaultUserData);

    const formRef = useRef();

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const classes = useStyles();

    const submit = (e) => {
        e.preventDefault();
        let formdata = new FormData(formRef.current);
        var object = {};
        formdata.forEach((value, key) => {
            object[key] = value;
        });
        console.log(object);
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.paperCenter}>
                <Typography variant="h5" gutterBottom>
                    Create new user
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
                        <Grid item xs={12} sm={12}>
                            <Typography gutterBottom variant="h6">
                                Properties of oligonucleotide primer
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
                                value={state.name}
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
                                value={state.username}
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
                                value={state.role}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                value={state.password}
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
                        Submit
                    </Button>
                </form>
            </div>
        </Paper>
    );
}
