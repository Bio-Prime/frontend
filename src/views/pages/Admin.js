import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Count from "../../components/Count";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import UsersColumns from "../elements/UsersColumns";
import CustomToolbarAdmin from "../elements/CustomToolbarAdmin";
import CustomToolbarSelectAdmin from "../elements/CustomToolbarSelectAdmin";
import UserService from "../../services/UserService";
import UsersChart from "../../components/UsersChart";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import AuthService from "../../services/AuthService";
import {Redirect} from "react-router-dom";
import MUIDataTable from "mui-datatables";

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

export default function Admin() {
    const [data, setData] = useState(null);

    const columns = UsersColumns.getUsersColumns();

    // success alert
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const reloadDataAfterDelete = () => {
        UserService.getAll().then((data) => {
            setData(data);
        });

        setSuccess(true);
        setOpen(true);
    };

    const showAlert = () => {
        if (success) {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    Successfully deleted!
                </Alert>
            )
        } else {
            return (
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">
                    There was an error deleting primer. Primer was not deleted!
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

    const options = {
        filterType: "checkbox",
        downloadOptions: {
            filename: "users.csv",
            separator: ",",
        },
        selectableRows: "single",
        customToolbar: () => <CustomToolbarAdmin/>,
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <CustomToolbarSelectAdmin
                selectedRows={selectedRows}
                displayData={displayData}
                setSelectedRows={setSelectedRows}
                allData={data}
                afterDelete={reloadDataAfterDelete}
            />
        ),
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        UserService.getAll().then((data) => {
            setData(data);
        });
    }, []);

    if (AuthService.getUserRole() !== 'ADMIN') {
        return (
            <Redirect to="/overview"/>
        )
    } else if (data != null) {
        return (
            <div>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    {showAlert()}
                </Snackbar>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <UsersChart allData={data}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Count dataCount={data.length} title={'Total Number of Users'}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={"All users"}
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
