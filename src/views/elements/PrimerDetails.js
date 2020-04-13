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
import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles({
    table: {
    },
});

function createData(label, value) {
    return { label, value};
};

const rows = [
    createData('Generated Name', "ATCGNU"),
    createData('Sequence', "TCTAAAAAGCATGTAAAAGAAA"),
    createData('Orientation', "Forward"),
    createData('Length', "553"),
    createData('Location in Lab', "Freezer1"),
    createData('Position in the reference', "5'-promotor"),
    createData('Tm (°C)', "52"),
    createData('Optimal T of annealing (°C)', "30"),
    createData('Purification method', "Desalted"),
    createData('Amount available', "10 nmol"),
    createData('Date', "20. 3. 2020"),
    createData('Length of amplicone', "10"),
    createData('Storing T (°C)', "0"),
    createData('GC%', "95"),
    createData('Organism', "Homo Sapiens"),
    createData('Gen', "gen-3"),
    createData('Designer (name and surname)', "nekinevem"),
    createData('5\' modification', "Aldehyde Modifier"),
    createData('3\' modification', "Amino Linker C7"),
    createData('Manufacturer', "nek manufacturer"),
    createData('Supplier', "LipBled"),
    createData('Type of primer', "DNA/RNA probe"),
    createData('Human genom build', "NCBI Build 34"),
    createData('NCBI gen ID', "NCBIgenI"),
    createData('Checked specificity in blast?', "yes"),
    createData('Formulation', "Lyophilized"),
    createData('Application', "cDNA synthesis"),
    createData('Project', "Analiza oligov"),
    createData('If TaqMan: sonda sequence', "nekinevem"),
    createData('Ordered By', "Simen Ravnik"),
    createData('Comment', "Tole sem jaz narocil"),
    createData('Analysis', "nekinevem"),
];

export default function PrimersAddForm({open, setOpen}) {

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Primer Details</DialogTitle>
            <DialogContent>

                <DialogContentText>
                    Selected Oligonucleotide Primer
                </DialogContentText>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TableContainer component={Paper}>
                            <Table size="small" className={classes.table} aria-label="simple table">
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
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
