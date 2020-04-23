import React from 'react';
import DataTable from "../../components/DataTable";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../../components/Chart";
import Count from "../../components/Count";
import clsx from "clsx";
import CustomToolbar from '../elements/CustomToolbar'
import CustomToolbarSelect from "../elements/CustomToolbarSelect";
import PrimersService from "../../services/PrimersService"
import PrimersColumns from "../elements/PrimersColumns";

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

    const columns = PrimersColumns.getPrimersColumns();

    const data = [
        {
            "id": 1,
            "generatedName": "generatedname",
            "name": "testname",
            "sequence": "testsequence",
            "orientation": "REVERSE",
            "length": 42,
            "freezer": "freezer2",
            "drawer": "drawer5",
            "box": "box1",
            "positionInReference": "5'-intron",
            "optimalTOfAnnealing": 53.0,
            "purificationMethod": "Cartridge",
            "amountAvailableMikroL": 42.3,
            "amountAvailablePacks": 28,
            "amountAvailablePackSize": "PLATE",
            "date": 1577750400000,
            "lengthOfAmplicone": 4251,
            "storingT": 324.2,
            "organism": "Mus musculus",
            "gen": "gen123",
            "ncbiGenId": "ncbiGenId42",
            "humanGenomBuild": "GRCh37",
            "formulation": "Resuspended in 0,1 X TE",
            "typeOfPrimer": "T7 primer",
            "sondaSequence": "SondaSequence123",
            "assayId": "assayId24",
            "size": "L",
            "primerApplication": "Methylation-specific PCR",
            "applicationComment": "application comment 123",
            "fiveModification": "Biotin TEG",
            "threeModification": "Quasar 705",
            "concentrationOrdered": 76,
            "concentrationOrderedUnit": "NANOM",
            "checkSpecifityInBlast": true,
            "designerName": "ime designerja",
            "designerPublication": "publikacija designerja",
            "designerDatabase": "link do podatkovne baze designerja",
            "project": "project4",
            "orderedBy": "Matija Potokar",
            "supplier": "Omega",
            "manufacturer": "BioSearch",
            "comment": "moj komentar",
            "document": "link do dokumenta",
            "analysis": "analysis 123",
            "orderStatus": "RECEIVED",
            "user": null,
            "pairs": [],
            "tm": 24.0,
            "gcpercent": 32.9
        },
        {
            "id": 2,
            "generatedName": "generatedname",
            "name": "testname",
            "sequence": "testsequence",
            "orientation": "REVERSE",
            "length": 42,
            "freezer": "freezer1",
            "drawer": "drawer5",
            "box": "box1",
            "positionInReference": "5'-intron",
            "optimalTOfAnnealing": 53.0,
            "purificationMethod": "Cartridge",
            "amountAvailableMikroL": 42.3,
            "amountAvailablePacks": 28,
            "amountAvailablePackSize": "PLATE",
            "date": 1577750400000,
            "lengthOfAmplicone": 4251,
            "storingT": 324.2,
            "organism": "Mus musculus",
            "gen": "gen123",
            "ncbiGenId": "ncbiGenId42",
            "humanGenomBuild": "GRCh37",
            "formulation": "Resuspended in 0,1 X TE",
            "typeOfPrimer": "T7 primer",
            "sondaSequence": "SondaSequence123",
            "assayId": "assayId24",
            "size": "L",
            "primerApplication": "Methylation-specific PCR",
            "applicationComment": "application comment 123",
            "fiveModification": "Biotin TEG",
            "threeModification": "Quasar 705",
            "concentrationOrdered": 76,
            "concentrationOrderedUnit": "NANOM",
            "checkSpecifityInBlast": true,
            "designerName": "ime designerja",
            "designerPublication": "publikacija designerja",
            "designerDatabase": "link do podatkovne baze designerja",
            "project": "project4",
            "orderedBy": "Matija Potokar",
            "supplier": "Omega",
            "manufacturer": "BioSearch",
            "comment": "moj komentar",
            "document": "link do dokumenta",
            "analysis": "analysis 123",
            "orderStatus": "RECEIVED",
            "user": null,
            "pairs": [],
            "tm": 24.0,
            "gcpercent": 32.9
        }
    ];

    const options = {
        filterType: 'checkbox',
        downloadOptions: {
            filename: "primers.csv",
            separator: ","
        },
        selectableRows: "single",
        customToolbar: () => {
            return (
                <CustomToolbar />
            );
        },
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
        ),
    };

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [items, error, isLoaded] = PrimersService.getAllPrimers();

    console.log(items);
    console.log(error);
    console.log(isLoaded);

    console.log(data);

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart allData={data} />
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
                <DataTable title={"Oligonucleotide Primers"} columns={columns} data={data} options={options}/>
            </Grid>
        </Grid>
    );

}
