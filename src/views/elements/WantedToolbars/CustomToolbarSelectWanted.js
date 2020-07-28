import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {withStyles} from "@material-ui/core/styles";
import {ArrowUpward, Delete} from "@material-ui/icons";
import WantedMoveDialog from "./dialogs/WantedMoveDialog";
import PrimerService from "../../../services/PrimersService";

const defaultToolbarSelectStyles = {
    iconButton: {},
    iconContainer: {
        marginRight: "24px",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};


function CustomToolbarSelectWanted(props) {


    let dataIndexes = props.selectedRows.data.map(el => el.dataIndex)

    let ids = [];
    for (let row in props.displayData) {
        for (let index in dataIndexes) {
            // eslint-disable-next-line
            if (props.displayData[row].dataIndex == dataIndexes[index]) {
                ids.push(props.displayData[row].data[0])
            }
        }
    }

    const [open, setOpen] = React.useState(false);

    const {classes} = props;

    const handleClickMove = () => {
        setOpen(true);
    };

    const handleClickDelete = () => {
        PrimerService.delete(ids).then(props.reloadData());
    };

    return (
        <div className={classes.iconContainer}>
            <Tooltip title={"Move to ordered primers"}>
                <IconButton className={classes.iconButton} onClick={handleClickMove}>
                    <ArrowUpward className={classes.icon}/>
                </IconButton>
            </Tooltip>
            <WantedMoveDialog open={open} setOpen={setOpen} primersToMove={ids} reloadData={props.reloadData}/>
            <Tooltip title={"Delete"}>
                <IconButton className={classes.iconButton}
                            onClick={handleClickDelete}>
                    <Delete className={classes.icon}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelectWanted"})(CustomToolbarSelectWanted);
