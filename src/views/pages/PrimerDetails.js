import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import DataTable from "../../components/DataTable";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../../components/Title";
import PrimersColumns from "../elements/PrimersColumns";
import TextField from "@material-ui/core/TextField/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomToolbarEdit from "../elements/CustomToolbarEdit";

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
        height: 250,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    bgColor: {
        backgroundColor: theme.palette.bgDialog
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
        customToolbar: () => <CustomToolbarEdit data={data}/>,
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = React.useState({
        amountAvailable: data.amountAvailable,
    });

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

        console.log(data);
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperTimesTwo = clsx(classes.paper, classes.fixedHeightTimesTwo);

    return (
        <Dialog fullWidth={true} maxWidth={"xl"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent className={classes.bgColor}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <DataTable title={'Selected Oligonucleotide Primer'} columns={columns} data={tableData} options={options}/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>Sequence</Title>
                                    {getSequence()}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
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
            <DialogActions className={classes.bgColor}>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
