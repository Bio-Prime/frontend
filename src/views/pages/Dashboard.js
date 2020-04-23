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
            name: "generatedName",
            label: "Generated name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                display: false,
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
                display: false,
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
            name: "freezer",
            label: "Freezer",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "drawer",
            label: "Drawer",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "box",
            label: "Box",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "positionInReference",
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
            name: "optimalTOfAnnealing",
            label: "Optimal T of annealing (°C)",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "purificationMethod",
            label: "Purification method",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "amountAvailableMikroL",
            label: "Amount available (µL)",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "amountAvailablePackSize",
            label: "Amount available (Pack size)",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "date",
            label: "Date",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "lengthOfAmplicone",
            label: "Length of amplicone",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "storingT",
            label: "Storing T (°C)",
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
            name: "ncbiGenId",
            label: "NCBI gen ID",
            options: {
                display: false,
                filter: false,
                sort: true,
            }
        },
        {
            name: "humanGenomBuild",
            label: "Human genom build",
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
            name: "typeOfPrimer",
            label: "Type of primer",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "sondaSequence",
            label: "Sonda sequence",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "assayId",
            label: "Assay ID",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "size",
            label: "Size",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "primerApplication",
            label: "Primer application",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "applicationComment",
            label: "Application comment",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "fiveModification",
            label: "5' Modification",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "threeModification",
            label: "3' Modification",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "concentrationOrdered",
            label: "Concentration ordered",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "concentrationOrderedUnit",
            label: "Concentration ordered unit",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "checkSpecifityInBlast",
            label: "Check specifity in blast",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "designerName",
            label: "Designer name",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "designerPublication",
            label: "Designer publication",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "designerDatabase",
            label: "Designer database",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "project",
            label: "Project",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "orderedBy",
            label: "Ordered by",
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
            name: "manufacturer",
            label: "Manufacturer",
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
                filter: true,
                sort: true,
            }
        },
        {
            name: "document",
            label: "Document",
            options: {
                display: false,
                filter: true,
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
        {
            name: "orderStatus",
            label: "Order status",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "user",
            label: "User",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "pairs",
            label: "Pairs",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "tm",
            label: "Tm",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
        {
            name: "gcpercent",
            label: "Gcpercent",
            options: {
                display: false,
                filter: true,
                sort: true,
            }
        },
    ];

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
