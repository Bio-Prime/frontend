import React, { useRef, useEffect } from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Constants from "../../constants";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import UserService from "../../../../services/UserService";
import {Redirect, useHistory} from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AuthService from "../../../../services/AuthService";

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
  const [open, setOpen] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
  };


  useEffect(() => {
    UserService.getAllUsernames().then((usernames) =>
      setState({
        ...state,
        usernames: usernames,
      })
    );
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const classes = useStyles();
  const history = useHistory();

  const formRef = useRef();

  const submit = (e) => {
    e.preventDefault();

    let formdata = new FormData(formRef.current);
    var user = {};
    formdata.forEach((value, key) => {
      user[key] = value;
    });
    console.log(user);

    UserService.add(user).then((data) => {
      if (data) {
        history.push("/admin");
      } else {
        if (AuthService.isAuthenticated()) {
          setOpen(true);
        } else {
          history.push("/login");
        }
      }
    });
  };

  if (AuthService.getUserRole() !== 'ADMIN') {
    return (
        <Redirect to='/dashboard' />
    )
  } else return (
    <Paper className={classes.paper}>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error adding user"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please check that all required fields are filled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.paperCenter}>
        <Typography variant="h5" gutterBottom>
          Create new user
        </Typography>
        <DialogContentText>
          The fields marked with a "*" are mandatory.
        </DialogContentText>

        <form name="userForm" ref={formRef} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography gutterBottom variant="h6">
                Properties of primer
              </Typography>
            </Grid>

            <Divider variant="middle" />

            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                required
                label="Full name"
                value={state.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {state.usernames.includes(state.username) ? (
                <TextField
                  error
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  helperText="Username already exists."
                  label="Username"
                  value={state.username}
                  onChange={handleChange}
                />
              ) : (
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  value={state.username}
                  onChange={handleChange}
                />
              )}
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={Constants.roles}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="role"
                    variant="outlined"
                    required
                    fullWidth
                    value={state.role}
                    onChange={handleChange}
                    label="Role"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="workTitle"
                variant="outlined"
                fullWidth
                required
                label="Work title"
                value={state.workTitle}
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
