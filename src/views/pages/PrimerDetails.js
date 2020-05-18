import React, {useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import DataTable from "../../components/DataTable";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../../components/Title";
import PrimersColumns from "../elements/PrimersColumns";
import TextField from "@material-ui/core/TextField/TextField";
import CustomToolbarEdit from "../elements/CustomToolbarEdit";
import {Redirect} from "react-router-dom";
import PrimersService from "../../services/PrimersService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import UserService from "../../services/UserService";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

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

export default function PrimerDetails(props) {

    const formRef = useRef();

    let dataJson = typeof props.location.state !== 'undefined' ? props.location.state.data : {};
    let pairsData = typeof props.location.state !== 'undefined' ? props.location.state.pairsData : {};

    const [data, setData] = React.useState(null);
    const [formData, setFormData] = React.useState({
        amountAvailable: 0
    });

    useEffect(() => {
        PrimersService.getOne(dataJson.id).then((data) => {
            setData(data);
        });
    }, []);

    // success alert
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const submit = (e) => {
        e.preventDefault();
        let formdata = new FormData(formRef.current);
        var object = {};
        formdata.forEach((value, key) => {
            object[key] = value;
        });

        data.amountAvailable = object.amountAvailable;

        PrimersService.update(data).then(returnData => {
            if (returnData != null) {
                setFormData({
                    ...formData,
                    [formData.amountAvailable]: returnData.amountAvailable
                });
                setSuccess(true);
            } else {
                setSuccess(false);
            }
            setOpen(true);
        });
    };

    const showAlert = () => {
        if (success) {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    Primer successfully updated!
                </Alert>
            )
        } else {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    There was an error updating primer. Primer was not updated!
                </Alert>
            )
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperTimesTwo = clsx(classes.paper, classes.fixedHeightTimesTwo);

    if (typeof props.location.state === 'undefined') {
        return <Redirect to='/' />
    } else if (data !== null) {

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

        let primerColumns = PrimersColumns.getPrimersColumns();
        const formatSelectedPrimerData = () => {

            let tableData = [];

            primerColumns.forEach((item, index) => {
                if (item.name !== 'id') {
                    tableData.push({
                        "label": item.label,
                        "value": data[item.name]
                    });
                }
            });

            return tableData;
        };
        let tableData = formatSelectedPrimerData();

        const getLocationInLab = () => {
            let freezer = data.freezer;
            let drawer = data.drawer;
            let box = data.box;

            return freezer + ', ' + drawer + ', ' + box;
        };

        const getSequence = () => {
            return data.sequence;
        };

        return (
            <Grid container spacing={3}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    {showAlert()}
                </Snackbar>
                <Grid item xs={12} md={6} lg={6}>
                    <DataTable title={data.generatedName} columns={columns} data={tableData}
                               options={options}/>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Name</Title>
                                {data.name}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
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
                                        ref={formRef}
                                        name="amountForm"
                                        className={classes.form}
                                        noValidate
                                    >

                                        <Grid container spacing={3}>
                                            <Grid item xs={9} sm={9}>
                                                <TextField
                                                    type={"number"}
                                                    name="amountAvailable"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Amount Available"
                                                    defaultValue={formData.amountAvailable}
                                                    // onChange={handleNumbers}
                                                />
                                            </Grid>
                                            <Grid item xs={3} sm={3}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Unit"
                                                    value={
                                                        data.amountAvailablePackType === "Plate" ? "wells" : "µl"
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
                    <DataTable title={'Related Oligonucleotide Primers'} columns={columnsRelated} data={pairsData}
                               options={optionsRelated}/>
                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "90vh" }}
            >
                <CircularProgress />
            </Grid>
        );
    }
}
