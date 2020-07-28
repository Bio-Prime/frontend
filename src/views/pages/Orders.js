import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Title from "../../components/Title";
import Typography from "@material-ui/core/Typography";
import CustomToolbarOrdered from "../elements/OrderedToolbars/CustomToolbarOrdered";
import CustomToolbarSelectOrdered from "../elements/OrderedToolbars/CustomToolbarSelectOrdered";
import CustomToolbarWanted from "../elements/WantedToolbars/CustomToolbarWanted";
import CustomToolbarSelectWanted from "../elements/WantedToolbars/CustomToolbarSelectWanted";
import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";
import PrimersService from "../../services/PrimersService";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import AuthService from "../../services/AuthService";
import MUIDataTable from "mui-datatables";
import OrdersColumns from "../elements/OrdersColumns";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 150,
    },
    fixedHeightTwo: {
        height: 480,
    },
    fixedHeightThree: {
        height: 305,
    }
}));

const formatChartData = (allData, attribute) => {

    let names = [];
    let values = [];

    let data = [];

    for (let i = 0; i < allData.length; i++) {
        let name = allData[i][attribute];

        let idx = names.indexOf(name);

        if (idx === -1) {
            names.push(name);
            values.push(1);
        } else {
            values[idx] += 1;
        }
    }

    for (let i = 0; i < names.length; i++) {
        let element = {};

        element.name = names[i];
        element.value = values[i];

        data.push(element);
    }

    return data;
};

export default function Orders() {

    const [dataOrdered, setDataOrdered] = React.useState(null);
    const [dataWanted, setDataWanted] = React.useState(null);

    useEffect(() => {
        PrimersService.getAllOrdered().then(setDataOrdered);
        PrimersService.getAllWanted().then(setDataWanted);
    }, []);

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperTwo = clsx(classes.paper, classes.fixedHeightTwo);
    const fixedHeightPaperThree = clsx(classes.paper, classes.fixedHeightThree);

    const theme = useTheme();

    // success alert
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const reloadData = () => {
        PrimersService.getAllOrdered().then(setDataOrdered);
        PrimersService.getAllWanted().then(setDataWanted).then(() => {
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
                    Error refreshing!
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

    if (dataOrdered !== null && dataWanted !== null) {

        const dataOrderedBy = formatChartData(dataOrdered, "user");
        const dataSupplier = formatChartData(dataOrdered, "supplier");


        let optionsOrdered = {};
        let optionsWanted = {};

        if (AuthService.getUserRole() !== 'GUEST' && AuthService.getUserRole() !== 'STUDENT') {
            optionsOrdered = {
                filterType: 'checkbox',
                download: false,
                print: false,
                selectableRows: "single",
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 15],
                customToolbar: () => <CustomToolbarOrdered reloadData={reloadData}/>,
                customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                    <CustomToolbarSelectOrdered
                        selectedRows={selectedRows}
                        displayData={displayData}
                        setSelectedRows={setSelectedRows}
                        allData={dataOrdered}
                        afterDelete={reloadData}
                    />
                )
            };
        } else {
            optionsOrdered = {
                filterType: 'checkbox',
                download: false,
                print: false,
                selectableRows: "none",
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 15],
                customToolbar: () => <CustomToolbarOrdered reloadData={reloadData}/>,
            };
        }

        if (AuthService.getUserRole() !== 'GUEST' && AuthService.getUserRole() !== 'STUDENT') {
            optionsWanted = {
                filterType: 'checkbox',
                download: false,
                print: false,
                selectableRows: "multiple",
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 15],
                customToolbar: () => <CustomToolbarWanted reloadData={reloadData}/>,
                customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                    <CustomToolbarSelectWanted
                        selectedRows={selectedRows}
                        displayData={displayData}
                        setSelectedRows={setSelectedRows}
                        reloadData={reloadData}
                    />
                )
            }
        } else {
            optionsWanted = {
                filterType: 'checkbox',
                download: false,
                print: false,
                selectableRows: "none",
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 15],
                customToolbar: () => <CustomToolbarWanted reloadData={reloadData}/>,
            }
        }

        return (
            <div>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    {showAlert()}
                </Snackbar>
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaperTwo}>
                            <Title>Ordered by</Title>
                            <ResponsiveContainer width="100%">
                                <PieChart>
                                    <Pie data={dataOrderedBy} nameKey="name" dataKey="value"
                                         label={({index, value}) => {
                                             return dataOrderedBy[index].name + " (" + value + ")"
                                         }}
                                         cx="50%" cy="50%" outerRadius={'80%'} fill="#8884d8"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>Number of ordered primers</Title>
                                    <Typography component="p" variant="h4">
                                        {dataOrdered.length}
                                    </Typography>
                                    <Typography color="textSecondary" className={classes.depositContext}>
                                        on {new Date().toDateString()}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={fixedHeightPaperThree}>
                                    <Title>Suppliers</Title>
                                    <br/>
                                    <ResponsiveContainer width="90%">
                                        <BarChart data={dataSupplier}>
                                            <XAxis dataKey="name" stroke={theme.palette.text.secondary}/>
                                            <YAxis stroke={theme.palette.text.secondary}/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Bar dataKey="value" fill="#8884d8"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={"Ordered"}
                            data={dataOrdered}
                            columns={OrdersColumns}
                            options={optionsOrdered}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={"Wanted"}
                            data={dataWanted}
                            columns={OrdersColumns}
                            options={optionsWanted}
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
