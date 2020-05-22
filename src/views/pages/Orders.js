import React, {useEffect} from 'react';
import DataTable from "../../components/DataTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Title from "../../components/Title";
import Typography from "@material-ui/core/Typography";
import OrdersColumns from "../elements/OrdersColumns";
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

    if (dataOrdered !== null && dataWanted !== null) {

        const dataOrderedBy = formatChartData(dataOrdered, "user");
        const dataSupplier = formatChartData(dataOrdered, "supplier");

        const columns = OrdersColumns.getOrdersColumns();

        const optionsOrdered = {
            filterType: 'checkbox',
            download: false,
            print: false,
            selectableRows: "single",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15],
            customToolbar: () => <CustomToolbarOrdered />,
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolbarSelectOrdered
                    selectedRows={selectedRows}
                    displayData={displayData}
                    setSelectedRows={setSelectedRows}
                    allData={dataOrdered}
                />
            )
        };

        const optionsWanted = {
            filterType: 'checkbox',
            download: false,
            print: false,
            selectableRows: "multiple",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15],
            customToolbar: () => <CustomToolbarWanted />,
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolbarSelectWanted
                    selectedRows={selectedRows}
                    displayData={displayData}
                    setSelectedRows={setSelectedRows}
                />
            )
        };

        return (
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
                    <DataTable title={"Ordered Oligonucleotide Primers"} columns={columns} data={dataOrdered}
                               options={optionsOrdered}/>
                </Grid>
                <Grid item xs={12}>
                    <DataTable title={"Wanted Oligonucleotide Primers"} columns={columns} data={dataWanted}
                               options={optionsWanted}/>
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
