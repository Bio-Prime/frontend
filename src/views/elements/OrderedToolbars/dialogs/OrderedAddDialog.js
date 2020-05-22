import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function PrimersAddDialog({ open, setOpen }) {
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add Ordered Primer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    How many primers do you want to add to ordered?
                </DialogContentText>
                <div className={classes.root}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            history.push("/add-one-ordered");
                        }}
                        color="primary"
                    >
                        Add one
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            history.push("/add-two-ordered");
                        }}
                        color="primary"
                    >
                        Add two
                    </Button>
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
