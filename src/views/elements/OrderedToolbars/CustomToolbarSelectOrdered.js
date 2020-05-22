import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import {ArrowUpward, Delete} from "@material-ui/icons";
import OrdersColumns from "../OrdersColumns";
import OrderedMoveDialog from "./dialogs/OrderedMoveDialog";

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

function CustomToolbarSelectOrdered(props) {

    // the row that was selected
    let selectedRow = props.selectedRows.data[0].index;

    // the data of the row that was selected
    let dataArray = props.displayData[selectedRow].data;

    // data json
    let dataJson = {};
    const columns = OrdersColumns.getOrdersColumns();
    columns.forEach((item, index) => {
        dataJson[item.name] = dataArray[index];
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDelete = () => {
        console.log("Delete primer with id: ", + dataJson.id);
    };

    const { classes } = props;

    return (
        <div className={classes.iconContainer}>
            <Tooltip title={"Move to ordered primers"}>
                <IconButton className={classes.iconButton} onClick={handleClickOpen}>
                    <ArrowUpward className={classes.icon} />
                </IconButton>
            </Tooltip>
            <OrderedMoveDialog open={open} setOpen={setOpen} data={dataJson} />
            <Tooltip title={"Delete"}>
                <IconButton className={classes.iconButton} onClick={handleClickDelete}>
                    <Delete className={classes.icon} />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelectOrdered" })(CustomToolbarSelectOrdered);
