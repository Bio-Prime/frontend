import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import DataTable from "../../components/DataTable";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../../components/Title";
import PrimersColumns from "./PrimersColumns";
import TextField from "@material-ui/core/TextField/TextField";
import Constants from "../pages/constants";
import MenuItem from "@material-ui/core/MenuItem";

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
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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

    const [formData, setFormData] = React.useState({
        amountAvailable: data.amountAvailable,
        amountAvailablePackType: lowerCaseAllWordsExceptFirstLetters(data.amountAvailablePackType),
        amountAvailablePacks: data.amountAvailablePacks
    });


    function lowerCaseAllWordsExceptFirstLetters(string) {
        return string.replace(/\w\S*/g, function (word) {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

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

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleNumbers = (event) => {
        if (!isNaN(event.target.value))
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
    };

    const submit = (e) => {
        e.preventDefault();
        data.amountAvailable = formData.amountAvailable;
        data.amountAvailablePackType = formData.amountAvailablePackType;
        data.amountAvailablePacks = formData.amountAvailablePacks;

        console.log(data);
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperTimesTwo = clsx(classes.paper, classes.fixedHeightTimesTwo);

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
                                    <div>
                                    <Title>Amount Available</Title>
                                    <br></br>
                                    <form
                                        name="amountForm"
                                        className={classes.form}
                                        noValidate
                                    >

                                        <Grid container spacing={3}>
                                            <Grid item xs={9} sm={9}>
                                                <TextField
                                                    name="amountAvailable"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Amount Available"
                                                    value={formData.amountAvailable}
                                                    onChange={handleNumbers}
                                                />
                                            </Grid>
                                            <Grid item xs={3} sm={3}>
                                                <TextField
                                                    disabled
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Unit"
                                                    value={
                                                        formData.amountAvailablePackType === "Plate" ? "wells" : "µl"
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    name="amountAvailablePackType"
                                                    variant="outlined"
                                                    fullWidth
                                                    select
                                                    label="Pack type"
                                                    value={formData.amountAvailablePackType}
                                                    onChange={handleChange}
                                                >
                                                    {Constants.amountAvailablePackType.map((value) => (
                                                        <MenuItem key={value} value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    name="amountAvailablePacks"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Number of packs"
                                                    value={formData.amountAvailablePacks}
                                                    onChange={handleNumbers}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                    onClick={submit}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                    </div>
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
