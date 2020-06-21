import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import {ArrowUpward, Delete} from "@material-ui/icons";
import OrdersColumns from "../OrdersColumns";
import WantedMoveDialog from "./dialogs/WantedMoveDialog";
import PrimerService from "../../../services/PrimersService";

const defaultToolbarSelectStyles = {
    iconButton: {
    },
    iconContainer: {
        marginRight: "24px",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};

const getSelectedPrimersIds = (props) => {
    let selectedRows = [];
    props.selectedRows.data.forEach((item, index) => {
        selectedRows.push(item.index);
    });

    // find id in orders columns
    const columns = OrdersColumns.getOrdersColumns();

    // primers that was selected
    let selectedPrimersArray = [];
    for (let i = 0; i < selectedRows.length; i++) {
        // the data of the row that was selected
        let dataArray = props.displayData[selectedRows[i]].data;

        // data json
        let dataJson = {};
        columns.forEach((item, index) => {
            dataJson[item.name] = dataArray[index];
        });

        selectedPrimersArray.push(dataJson);
    }

    return selectedPrimersArray;
};

function CustomToolbarSelectWanted(props) {

    let selectedPrimersArray = getSelectedPrimersIds(props);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDelete = () => {

        selectedPrimersArray.forEach(item => {
            console.log(item.id);
            PrimerService.delete(item.id).then((data) => {
                if(data){
                    props.afterDelete();
                } else {
                    alert("Error deleting primer!");
                }
            });
        });
    };

    const { classes } = props;

    return (
        <div className={classes.iconContainer}>
            <Tooltip title={"Move to ordered primers"}>
                <IconButton className={classes.iconButton} onClick={handleClickOpen}>
                    <ArrowUpward className={classes.icon} />
                </IconButton>
            </Tooltip>
            <WantedMoveDialog open={open} setOpen={setOpen} primersToMove={selectedPrimersArray} />
            <Tooltip title={"Delete"}>
                <IconButton className={classes.iconButton} onClick={handleClickDelete}>
                    <Delete className={classes.icon} />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelectWanted" })(CustomToolbarSelectWanted);
