import React from 'react';
import DataTable from "../../components/DataTable";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../../components/Chart";
import Count from "../../components/Count";
import clsx from "clsx";
import CustomToolbar from '../elements/CustomToolbar'

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
}));

export default function Dashboard() {

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
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer2", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer3", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "Projekt1", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer3", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer3", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer3", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Reverse", "553", "Freezer4", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer4", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer4", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Simen Ravnik", "Tole sem sedaj narocil", "nekineki"],
        ["ATCGNU", "TCTAAAAAGCATGTAAAAGAAA", "Forward", "553", "Freezer4", "5'-promotor", "52", "30", "Desalted", "10 nmol", "20. 3. 2020", "10",
            "0", "95", "Homo Sapiens", "gen-3", "nekinevem", "Aldehyde Modifier", "Amino Linker C7", "nek manufacturer", "LipBled", "DNA/RNA probe", "NCBI Build 34",
            "NCBIgenI", "yes", "Lyophilized", "cDNA synthesis", "new Project", "nek string", "Matic Ravnik", "Tole sem sedaj narocil", "nekineki"],

    ];

    const options = {
        filterType: 'checkbox',
        downloadOptions: {
            filename: "primers.csv",
            separator: ","
        },
        customToolbar: () => {
            return (
                <CustomToolbar />
            );
        },
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Count dataCount={data.length} />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <DataTable columns={columns} data={data} options={options}/>
            </Grid>
        </Grid>
    );

}
