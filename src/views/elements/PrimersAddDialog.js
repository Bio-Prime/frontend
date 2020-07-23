import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import DropzoneAreaCSV from "../../components/DropzoneAreaCSV";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function PrimersAddDialog({ open, setOpen }) {
  const history = useHistory();
  const [showDropzone, setDropzone] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const handleClickCSV = () => {
    if (showDropzone) {
      setDropzone(false);
    } else {
      setDropzone(true);
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Primer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          How many primers do you want to add to the database?
        </DialogContentText>
        <div className={classes.root}>
          <Button
              variant="contained"
              onClick={() => {
                history.push("/add-one-general");
              }}
              color="primary"
          >
            One general
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/add-one-new");
            }}
            color="primary"
          >
            One new
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/add-two-new");
            }}
            color="primary"
          >
            Two new
          </Button>
          <Button variant="contained" onClick={handleClickCSV} color="primary">
            CSV
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/add-one-old");
            }}
            color="primary"
          >
            One old
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              history.push("/add-two-old");
            }}
            color="primary"
          >
            Two old
          </Button>
          <div>{showDropzone ? <DropzoneAreaCSV handleClose={handleClose}/> : null}</div>
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
