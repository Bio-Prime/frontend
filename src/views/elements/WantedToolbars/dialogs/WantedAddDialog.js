import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function WantedAddDialog({open, setOpen}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add wanted Primer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sorry, adding wanted primers is not implemented yet...
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
