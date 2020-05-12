import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis,} from 'recharts';
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

export default function PrimerDetails({open, setOpen, data, pairsData}) {

    const handleClose = () => {
        setOpen(false);
    };

    let primerColumns = PrimersColumns.getPrimersColumns();
    let tableData = [];
    const formatSelectedPrimerData = () => {

        primerColumns.forEach((item, index) => {
            if (item.name !== 'id') {
                tableData.push({
                    "label": item.label,
                    "value": data[item.name]
                });
            }
        });
    };
    formatSelectedPrimerData();

    const getLocationInLab = () => {
        let freezer = data.freezer;
        let drawer = data.drawer;
        let box = data.box;

        return freezer + ', ' + drawer + ', ' + box;
    };

    const getSequence = () => {
        return data.sequence;
    };


    const getAmountAvailable = () => {
        return data.amountAvailable;
    };

    const getDate = () => {
        let date = new Date();
        return date.getDay() + ". " + date.getMonth() + ". " + date.getFullYear();
    };


    const chartData = [
        {
            name: getDate(), nMol: getAmountAvailable(),
        },
    ];


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
                        <DataTable title={'Selected Oligonucleotide Primer'} columns={columns} data={tableData} options={options}/>
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
                        <DataTable title={'Related Oligonucleotide Primers'} columns={columnsRelated} data={pairsData} options={optionsRelated}/>
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
