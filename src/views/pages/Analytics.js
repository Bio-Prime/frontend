import React from 'react';
import Title from "../../components/Title";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../../components/Chart";
import Count from "../../components/Count";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend, Line,
} from 'recharts';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fixedHeightOne: {
        height: 150,
    },
    fixedHeightTwo: {
        height: 480,
    },
    fixedHeightThree: {
        height: 305,
    }
}));

export default function Orders() {

    const chartData = [
        {
            subject: 'Šimen Ravnik', A: 120, B: 110, fullMark: 150,
        },
        {
            subject: 'Janez Novak', A: 98, B: 130, fullMark: 150,
        },
        {
            subject: 'Metka Novak', A: 86, B: 130, fullMark: 150,
        },
        {
            subject: 'Franci na Balanci', A: 99, B: 100, fullMark: 150,
        },
        {
            subject: 'Janez Kranjski', A: 85, B: 90, fullMark: 150,
        },
        {
            subject: 'Rudolf Maister', A: 65, B: 85, fullMark: 150,
        },
    ];

    const dataChartTwo = [
        {
            name: '1. 1. 2020', num: 10,
        },
        {
            name: '11. 2. 2020', num: 25,
        },
        {
            name: '15. 2. 2020', num: 3,
        },
        {
            name: '20. 3. 2020', num: 12,
        },
        {
            name: '28. 3. 2020', num: 18,
        },
        {
            name: '30. 3. 2020', num: 10,
        },
        {
            name: '15. 4. 2020', num: 22,
        },
    ];

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperOne = clsx(classes.paper, classes.fixedHeightOne);
    const fixedHeightPaperTwo = clsx(classes.paper, classes.fixedHeightTwo);
    const fixedHeightPaperThree = clsx(classes.paper, classes.fixedHeightThree);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
                </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Count dataCount={17}/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaperTwo}>
                    <Title>Ordered by</Title>
                    <RadarChart cx={260} cy={200} outerRadius={150} width={500} height={400} data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper className={fixedHeightPaperOne}>
                            <Title>Number of ordered primers</Title>
                            <Typography component="p" variant="h4">
                                {6}
                            </Typography>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                on {new Date().toDateString()}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper className={fixedHeightPaperThree}>
                            <Title>Orders through time</Title>
                            <LineChart
                                width={520}
                                height={200}
                                data={dataChartTwo}
                                margin={{
                                    top: 20, right: 30, left: 0, bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="num" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
