import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import DialogContentText from "@material-ui/core/DialogContentText";

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

const amountUnits = [
    {
        value: "nmol",
        label: "nmol"
    },
    {
        value: "µL",
        label: "µL"
    },
    {
        value: "µM",
        label: "µM"
    },
    {
        value: "nM",
        label: "nM"
    }
];

export default function CommonParametersForm() {

    const [data, setData] = React.useState({
        sequence: '',
        orientation: '',
        fridge: '',
        drawer: '',
        box: '',
        amount: '',
        amountUnit: '',
        date: new Date('2014-08-18T21:11:54'),

    });

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Common parameters
            </Typography>
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
            <Grid container spacing={2} justify="flex-end">
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        variant="outlined"
                        fullWidth
                        id="amount"
                        label="Amount available"
                        name="amount"
                        type="number"
                        value={data.amount}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        name="amountUnit"
                        id="amountUnit"
                        variant="outlined"
                        select
                        label="Units"
                        required
                        value={data.amountUnit}
                        onChange={handleChange}
                        helperText="Enter measurement units"
                    >
                        {amountUnits.map(unit => (
                            <MenuItem key={unit.value} value={unit.value}>
                                {unit.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <DialogContentText>
                Location in the Lab
            </DialogContentText>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="fridge"
                        id="fridge"
                        select
                        label="Fridge name/number"
                        required
                        value={data.fridge}
                        onChange={handleChange}
                        helperText="Select fridge or freezer">
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="drawer"
                        id="drawer"
                        select
                        label="Drawer"
                        required
                        value={data.drawer}
                        onChange={handleChange}
                        helperText="Select drawer"
                    >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        variant="outlined"
                        fullWidth
                        id="box"
                        label="Box"
                        name="box"
                        type="number"
                        value={data.box}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        name="sequence"
                        variant="outlined"
                        required
                        fullWidth
                        id="sequence"
                        label="Sequence"
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        name="sequence"
                        variant="outlined"
                        required
                        fullWidth
                        id="sequence"
                        label="Sequence"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
