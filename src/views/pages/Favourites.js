import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomToolbar from "../elements/CustomToolbar";
import PrimersService from "../../services/PrimersService";
import PrimersColumns from "../elements/PrimersColumns";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {Container} from "@material-ui/core";
import UserService from "../../services/UserService";
import FavouritesSelectToolbar from "../elements/FavouritesSelectToolbar";


export default function Favourites() {
    const [data, setData] = useState(null);

    const columns = PrimersColumns;

    let history = useHistory();

    let options = {
        filterType: "checkbox",
        downloadOptions: {
            filename: "primers.csv",
            separator: ",",
        },
        pagination: false,
        onRowClick: (rowData, rowMeta) => {
            let dataJson = {};
            PrimersColumns.forEach((item, index) => dataJson[item.name] = rowData[index]);
            PrimersService.getLinked(rowData[0]).then(pairsData => {

                history.push('/primer-details', {
                    data: dataJson,
                    pairsData: pairsData,
                });
            });
        },
        customToolbar: () => <CustomToolbar reloadData={reloadData}/>,
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) =>
            <FavouritesSelectToolbar
                selectedRows={selectedRows}
                displayData={displayData}
                reload={reloadData}
            />
    };


    const reloadData = () => {
        UserService.getFavourites().then(setData);
    };


    useEffect(() => {
        reloadData();
    }, []);

    if (data != null) {
        return (
            <Container maxWidth={"xl"}>
                <MUIDataTable
                    title={"Favourites"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Container>
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
