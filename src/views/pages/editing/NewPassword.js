import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useHistory, useLocation} from "react-router-dom";
import AuthService from "../../../services/AuthService";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    spaceBetween: {
        margin: theme.spacing(1, 0, 1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function NewPassword() {
    const classes = useStyles();

    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};

    const [state, setState] = React.useState({
        password: "",
        oldPassword: "",
        passwordRetype: "",
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        if (state.newPassword === state.newPasswordRetype) {
            let data = {
                username: AuthService.getUsername(),
                password: state.oldPassword,
                newPassword: state.password,
            }
            AuthService.changePassword(data, ()=>{
                alert("Password changed");
                history.push("/overview")
            },()=>{
                alert("Error updating password");
            })
        } else {
            alert("New passwords don't match");
        }

    };

    return (
        <Container maxWidth={"sm"}>
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <TextField
                        className={classes.spaceBetween}
                        variant="outlined"
                        fullWidth
                        name="username"
                        label="Username"
                        type="text"
                        autoComplete="username"
                        onChange={handleChange}
                        defaultValue={AuthService.getUsername()}
                    />
                    <TextField
                        className={classes.spaceBetween}
                        variant="outlined"
                        fullWidth
                        name="oldPassword"
                        label="Current password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        autoFocus={true}
                    />
                    <TextField
                        className={classes.spaceBetween}
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="New password"
                        type="password"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.spaceBetween}
                        variant="outlined"
                        fullWidth
                        name="passwordRetype"
                        label="Retype new password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"

                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submit}
                    >
                        Set new password
                    </Button>
                </form>
            </div>
        </Container>
    );
}
