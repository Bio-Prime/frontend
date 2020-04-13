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
    filter: false,
    sort: false,
    viewColumns: false,
};

const columnsRelated = [
    {
        name: "name",
        label: "Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "sequence",
        label: "Sequence",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "orientation",
        label: "Orientation",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "length",
        label: "Length",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "location",
        label: "Location in Lab",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "position",
        label: "Position in the reference",
        options: {
            display: false,
            filter: true,
            sort: true,
        }
    },
    {
        name: "tm",
        label: "Tm (°C)",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "temperatureAnnealing",
        label: "Optimal T of annealing (°C)",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "purification",
        label: "Purification method",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "amount",
        label: "Amount available",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "date",
        label: "Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ampliconeLength",
        label: "Length of amplicone",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "storingTemperature",
        label: "Storing T (°C)",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "gc",
        label: "GC%",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "organism",
        label: "Organism",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "gen",
        label: "Gen",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "designer",
        label: "Designer (name and surname)",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "5modification",
        label: "5' modification",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "3modification",
        label: "3' modification",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "manufacturer",
        label: "Manufacturer",
        options: {
            display: false,
            filter: true,
            sort: true,
        }
    },
    {
        name: "supplier",
        label: "Supplier",
        options: {
            display: false,
            filter: true,
            sort: true,
        }
    },
    {
        name: "type",
        label: "Type of primer",
        options: {
            display: false,
            filter: true,
            sort: true,
        }
    },
    {
        name: "humanBuild",
        label: "Human genom build",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "ncbi",
        label: "NCBI gen ID",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "checkBlast",
        label: "Checked specificity in blast?",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "formulation",
        label: "Formulation",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "application",
        label: "Application",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "project",
        label: "Project",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "sondaSequence",
        label: "If TaqMan: sonda sequence",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "orderedBy",
        label: "Ordered By",
        options: {
            display: false,
            filter: true,
            sort: true,
        }
    },
    {
        name: "comment",
        label: "Comment",
        options: {
            display: false,
            filter: false,
            sort: true,
        }
    },
    {
        name: "analysis",
        label: "Analysis",
        options: {
            display: false,
            filter: true,
            sort: true,
        }
    },
];

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

export default function PrimersAddForm({open, setOpen}) {

    const handleClose = () => {
        setOpen(false);
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
                        <DataTable title={'Selected Oligonucleotide Primer'} columns={columns} data={data} options={options}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>Sequence</Title>
                                    TCTAAAAAGCATGTAAAAGAAA
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>Location in the Lab</Title>
                                        Freezer 1, Drawer 23, Box 5
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
