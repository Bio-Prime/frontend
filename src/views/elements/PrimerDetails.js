import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from "@material-ui/core/Grid";
import DataTable from "../../components/DataTable";

const columns = [
    {
        name: "label",
        label: "Label",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "value",
        label: "Value",
        options: {
            filter: true,
            sort: true,
        }
    }
];

const data = [
        ['Generated Name', "ATCGNU"],
        ['Sequence', "TCTAAAAAGCATGTAAAAGAAA"],
        ['Orientation', "Forward"],
        ['Length', "553"],
        ['Location in Lab', "Freezer1"],
        ['Position in the reference', "5'-promotor"],
        ['Tm (°C)', "52"],
        ['Optimal T of annealing (°C)', "30"],
        ['Purification method', "Desalted"],
        ['Amount available', "10 nmol"],
        ['Date', "20. 3. 2020"],
        ['Length of amplicone', "10"],
        ['Storing T (°C)', "0"],
        ['GC%', "95"],
        ['Organism', "Homo Sapiens"],
        ['Gen', "gen-3"],
        ['Designer (name and surname)', "nekinevem"],
        ['5\' modification', "Aldehyde Modifier"],
        ['3\' modification', "Amino Linker C7"],
        ['Manufacturer', "nek manufacturer"],
        ['Supplier', "LipBled"],
        ['Type of primer', "DNA/RNA probe"],
        ['Human genom build', "NCBI Build 34"],
        ['NCBI gen ID', "NCBIgenI"],
        ['Checked specificity in blast?', "yes"],
        ['Formulation', "Lyophilized"],
        ['Application', "cDNA synthesis"],
        ['Project', "Analiza oligov"],
        ['If TaqMan: sonda sequence', "nekinevem"],
        ['Ordered By', "Simen Ravnik"],
        ['Comment', "Tole sem jaz narocil"],
        ['Analysis', "nekinevem"],
];

const options = {
    filterType: 'checkbox',
    downloadOptions: {
        filename: "primers.csv",
        separator: ","
    },
    selectableRows: "none",
    pagination: false,
    responsive: "scrollMaxHeight",
    print: false,
    download: false,
    search: false,
    filter: false,
    sort: false,
    viewColumns: false,
};

export default function PrimersAddForm({open, setOpen}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Primer Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <DataTable title={'Selected Oligonucleotide Primer'} columns={columns} data={data} options={options}/>
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
