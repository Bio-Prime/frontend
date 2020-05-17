import DataTable from "../../components/DataTable";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Count from "../../components/Count";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import UsersColumns from "../elements/UsersColumns";
import CustomToolbarAdmin from "../elements/CustomToolbarAdmin";
import CustomToolbarSelectAdmin from "../elements/CustomToolbarSelectAdmin";
import UserService from "../../services/UserService";
import UsersChart from "../../components/UsersChart";

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

    const options = {
        filterType: "checkbox",
        downloadOptions: {
            filename: "primers.csv",
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

    if (data != null) {
        return (
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
                    <DataTable
                        title={"All users"}
                        columns={columns}
                        data={data}
                        options={options}
                    />
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
                style={{minHeight: "90vh"}}
            >
                <CircularProgress/>
            </Grid>
        );
    }
}
