import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import Grid from "@material-ui/core/Grid";
import DataTable from "../../components/DataTable";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Title from "../../components/Title";
import PrimersColumns from "./PrimersColumns";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 140,
    },
    fixedHeightTimesTwo: {
        height: 405,
    },
}));

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
    filter: false,
    sort: false,
    viewColumns: false,
};

const columnsRelated = PrimersColumns.getPrimersColumns();

const dataRelated = [
    ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
        "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
        "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
    ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Reverse", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
        "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
        "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
    ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
        "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
        "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],

];

const chartData = [
    {
        name: '20.2. 2020', nMol: 50,
    },
    {
        name: '1. 3. 2020', nMol: 20,
    },
    {
        name: '17. 3. 2020', nMol: 12,
    },
    {
        name: '20. 4. 2020', nMol: 8,
    },
];

const optionsRelated = {
    filterType: 'checkbox',
    downloadOptions: {
        filename: "primers.csv",
        separator: ","
    },
    selectableRows: "none",
    print: false,
    download: false,
    filter: false,
};

export default function PrimerDetails({open, setOpen, selectedPrimerData}) {

    const handleClose = () => {
        setOpen(false);
    };

    let labels = PrimersColumns.getColumnsLabels();
    let data = [];
    const formatSelectedPrimerData = () => {
        for (let i = 0; i < selectedPrimerData.length; i++) {

            data.push({
                "label": labels[i][0],
                "value": selectedPrimerData[i]
            });
        }
    };
    formatSelectedPrimerData();

    const getLocationInLab = () => {
        let freezer = '';
        let drawer = '';
        let box = '';
        for (let i = 0; i < data.length; i++) {

            if (data[i].label === "Freezer") {
                freezer = data[i].value;
            }

            if (data[i].label === "Drawer") {
                drawer = data[i].value;
            }

            if (data[i].label === "Box") {
                box = data[i].value;
            }
        }

        let location = freezer + ', ' + drawer + ', ' + box;
        return location;
    };

    const getSequence = () => {
        let sequence = '';
        for (let i = 0; i < data.length; i++) {

            if (data[i].label === "Sequence") {
                sequence = data[i].value;
                break;
            }
        }
        return sequence;
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperTimesTwo = clsx(classes.paper, classes.fixedHeightTimesTwo);
    const theme = useTheme();

    return (
        <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Primer Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <div>
                            <DataTable title={'Selected Oligonucleotide Primer'} columns={columns} data={data} options={options}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>Sequence</Title>
                                    {getSequence()}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>Location in the Lab</Title>
                                    {getLocationInLab()}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={fixedHeightPaperTimesTwo}>
                                    <Title>Amount Available</Title>
                                    <AreaChart
                                        width={600}
                                        height={300}
                                        data={chartData}
                                        margin={{
                                            top: 20, right: 20, left: 0, bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                                        <YAxis stroke={theme.palette.text.secondary} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="nMol" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <DataTable title={'Related Oligonucleotide Primers'} columns={columnsRelated} data={dataRelated} options={optionsRelated}/>
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
