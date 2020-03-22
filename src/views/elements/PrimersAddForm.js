import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

const orientations = [
    {
        value: "forward",
        label: "Forward"
    },
    {
        value: "reverse",
        label: "Reverse"
    }
];

export default function PrimersAddForm({open, setOpen}) {

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        // handle on submit
        console.log(data);
    };

    const [data, setData] = React.useState({
        orientation: '',
        sequence: ''
    });

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new Primer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will be the form for adding primers into the database. It is yet to be implemented!
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            name="sequence"
                            variant="outlined"
                            required
                            fullWidth
                            id="sequence"
                            label="Sequence"
                            value={data.sequence}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            name="orientation"
                            id="orientation"
                            variant="outlined"
                            select
                            label="Orientation"
                            required
                            value={data.orientation}
                            onChange={handleChange}
                            helperText="Enter primer's orientation"
                        >
                            {orientations.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
