import React from 'react';
import DataTable from "../../components/DataTable";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Title from "../../components/Title";
import Typography from "@material-ui/core/Typography";
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

export default function Orders() {

    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "sequence",
            label: "Sequence",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "orientation",
            label: "Orientation",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "length",
            label: "Length",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "location",
            label: "Location in Lab",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "position",
            label: "Position in the reference",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "tm",
            label: "Tm (°C)",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "temperatureAnnealing",
            label: "Optimal T of annealing (°C)",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "purification",
            label: "Purification method",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "amount",
            label: "Amount available",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "date",
            label: "Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ampliconeLength",
            label: "Length of amplicone",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "storingTemperature",
            label: "Storing T (°C)",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "gc",
            label: "GC%",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "organism",
            label: "Organism",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "gen",
            label: "Gen",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "designer",
            label: "Designer (name and surname)",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "5modification",
            label: "5' modification",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "3modification",
            label: "3' modification",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "manufacturer",
            label: "Manufacturer",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "supplier",
            label: "Supplier",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "type",
            label: "Type of primer",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "humanBuild",
            label: "Human genom build",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "ncbi",
            label: "NCBI gen ID",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "checkBlast",
            label: "Checked specificity in blast?",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "formulation",
            label: "Formulation",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "application",
            label: "Application",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "project",
            label: "Project",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "sondaSequence",
            label: "If TaqMan: sonda sequence",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "orderedBy",
            label: "Ordered By",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "comment",
            label: "Comment",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "analysis",
            label: "Analysis",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
    ];

    const data = [
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Reverse", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer2", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer2", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "Projekt2", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer2", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer2", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],

    ];

    const dataWanted = [
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer1", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
    ];

    const options = {
        filterType: 'checkbox',
        download: false,
        print: false,
        selectableRows: "multiple",
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
    };


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
    const fixedHeightPaperTwo = clsx(classes.paper, classes.fixedHeightTwo);
    const fixedHeightPaperThree = clsx(classes.paper, classes.fixedHeightThree);

    return (
        <Grid container spacing={3}>
            {/* Recent Orders */}
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
                        <Paper className={fixedHeightPaper}>
                            <Title>Number of ordered primers</Title>
                            <Typography component="p" variant="h4">
                                {data.length}
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
            <Grid item xs={12}>
                <DataTable title={"Ordered Oligonucleotide Primers"} columns={columns} data={data} options={options}/>
            </Grid>
            <Grid item xs={12}>
                <DataTable title={"Wanted Oligonucleotide Primers"} columns={columns} data={dataWanted} options={options}/>
            </Grid>
        </Grid>
    );
}
