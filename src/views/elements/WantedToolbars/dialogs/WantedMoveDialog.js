import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import PrimersService from "../../../../services/PrimersService";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function WantedMoveDialog({open, setOpen, primersToMove, reloadData}) {

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    const handleClickMove = () => {
        PrimersService.moveToOrdered(primersToMove).then(handleClose()).then(reloadData());
    };

    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Move to ordered Primers</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Move wanted primers to ordered primers?
                </DialogContentText>
                <div className={classes.root}>
                    <Button variant="contained" onClick={handleClickMove} color="primary">
                        Move
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
