import DataTable from "../../components/DataTable";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chart from "../../components/Chart";
import Count from "../../components/Count";
import clsx from "clsx";
import CustomToolbar from "../elements/CustomToolbar";
import CustomToolbarSelect from "../elements/CustomToolbarSelect";
import PrimersService from "../../services/PrimersService";
import PrimersColumns from "../elements/PrimersColumns";
import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

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

  const columns = PrimersColumns.getPrimersColumns();

  const options = {
    filterType: "checkbox",
    downloadOptions: {
      filename: "primers.csv",
      separator: ",",
    },
    selectableRows: "single",
    customToolbar: () => <CustomToolbar reloadData={reloadData} />,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect
        selectedRows={selectedRows}
        displayData={displayData}
        setSelectedRows={setSelectedRows}
        allData={data}
        afterDelete={reloadData}
      />
    ),
  };

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // success alert
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const reloadData = () => {
    PrimersService.getAllReceived().then(setData);

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
            <Chart allData={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Count dataCount={data.length} title={'Total Number of Primers'}/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            title={"Oligonucleotide Primers"}
            columns={columns}
            data={data}
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
        style={{ minHeight: "90vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }
}
