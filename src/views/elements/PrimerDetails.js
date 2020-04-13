import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
    },
});

function createData(label, value) {
    return { label, value};
}

const rows = [
    createData('Generated Name', "ATCGNU"),
    createData('Sequence', "ATCGNU"),
    createData('Orientation', "ATCGNU"),
    createData('Length', "ATCGNU"),
    createData('Location in Lab', "ATCGNU"),
    createData('Position in the reference', "ATCGNU"),
    createData('Tm (°C)', "ATCGNU"),
    createData('Optimal T of annealing (°C)', "ATCGNU"),
    createData('Purification method', "ATCGNU"),
    createData('Amount available', "ATCGNU"),
    createData('Date', "ATCGNU"),
    createData('Length of amplicone', "ATCGNU"),
    createData('Storing T (°C)', "ATCGNU"),
    createData('GC%', "ATCGNU"),
    createData('Organism', "ATCGNU"),
    createData('Gen', "ATCGNU"),
    createData('Designer (name and surname)', "ATCGNU"),
    createData('5\' modification', "ATCGNU"),
    createData('3\' modification', "ATCGNU"),
    createData('Manufacturer', "ATCGNU"),
    createData('Supplier', "ATCGNU"),
    createData('Type of primer', "ATCGNU"),
    createData('Human genom build', "ATCGNU"),
    createData('NCBI gen ID', "ATCGNU"),
    createData('Checked specificity in blast?', "ATCGNU"),
    createData('Formulation', "ATCGNU"),
    createData('Application', "ATCGNU"),
    createData('Project', "ATCGNU"),
    createData('If TaqMan: sonda sequence', "ATCGNU"),
    createData('Ordered By', "ATCGNU"),
    createData('Comment', "ATCGNU"),
    createData('Analysis', "ATCGNU"),
];

export default function PrimersAddForm({open, setOpen}) {

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Primer Details</DialogTitle>
            <DialogContent>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Label</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
