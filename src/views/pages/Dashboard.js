import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chart from "../../components/Chart";
import Count from "../../components/Count";
import clsx from "clsx";
import CustomToolbar from "../elements/CustomToolbar";
import PrimersService from "../../services/PrimersService";
import PrimersColumns from "../elements/PrimersColumns";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import AuthService from "../../services/AuthService";
import MUIDataTable from "mui-datatables";
import DashboardSelectToolbar from "../elements/DashboardSelectToolbar";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const [data, setData] = useState(null);

    const columns = PrimersColumns;

    let history = useHistory();

    let options = {};

    if (AuthService.getUserRole() !== 'GUEST' && AuthService.getUserRole() !== 'STUDENT') {
        options = {
            filterType: "checkbox",
            downloadOptions: {
                filename: "primers.csv",
                separator: ",",
            },
            pagination: false,
            onRowClick: (rowData, rowMeta) => {
                let dataJson = {};
                PrimersColumns.forEach((item, index) => dataJson[item.name] = rowData[index]);
                PrimersService.getLinked(rowData[0]).then(pairsData => {

                    history.push('/primer-details', {
                        data: dataJson,
                        pairsData: pairsData,
                    });
                });
            },
            customToolbar: () => <CustomToolbar reloadData={reloadData}/>,
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) =>
                <DashboardSelectToolbar
                    selectedRows={selectedRows}
                    displayData={displayData}
                    reload={reloadData}
                />
        };
    } else {
        options = {
            filterType: "checkbox",
            downloadOptions: {
                filename: "primers.csv",
                separator: ",",
            },
            pagination: false,
            onRowClick: (rowData, rowMeta) => {
                let dataJson = {};
                PrimersColumns.forEach((item, index) => dataJson[item.name] = rowData[index]);
                PrimersService.getLinked(rowData[0]).then(pairsData => {

                    history.push('/primer-details', {
                        data: dataJson,
                        pairsData: pairsData,
                    });
                });
            },
            selectableRows: "none",
            customToolbar: () => <CustomToolbar reloadData={reloadData}/>,
        };
    }

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // success alert
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const reloadData = () => {
        PrimersService.getAllReceived().then(setData).then(() => {
            setSuccess(true);
            setOpen(true);
        });
    };

    const showAlert = () => {
        if (success) {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    Successfully refreshed!
                </Alert>
            )
        } else {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    There was an error refreshing primers.
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


    useEffect(() => {
        PrimersService.getAllReceived().then(setData);
    }, []);

    if (data != null) {
        return (
            <div>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    {showAlert()}
                </Snackbar>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Chart allData={data}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Count dataCount={data.length} title={'Total number of primers/probes'}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={"Primers/Probes"}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: "90vh"}}
            >
                <CircularProgress/>
            </Grid>
        );
    }
}
