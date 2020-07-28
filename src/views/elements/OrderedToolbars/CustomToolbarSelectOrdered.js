import React, {useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {withStyles} from "@material-ui/core/styles";
import {ArrowUpward, Delete} from "@material-ui/icons";
import OrderedMoveDialog from "./dialogs/OrderedMoveDialog";
import PrimerService from "../../../services/PrimersService";
import PrimersService from "../../../services/PrimersService";

const defaultToolbarSelectStyles = {
    iconButton: {},
    iconContainer: {
        marginRight: "24px",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};

function CustomToolbarSelectOrdered(props) {


    const [primerData, setPrimerData] = React.useState(null);

    let dataIndexes = props.selectedRows.data.map(el => el.dataIndex)
    let id = 0
    for (let row in props.displayData) {
        for (let index in dataIndexes) {
            // eslint-disable-next-line
            if (props.displayData[row].dataIndex == dataIndexes[index]) {
                id = props.displayData[row].data[0];
            }
        }
    }

    useEffect(() => {
        PrimersService.getOne(id).then(setPrimerData);
        // eslint-disable-next-line
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDelete = () => {
        PrimerService.delete([id]).then(props.afterDelete());
    };

    const {classes} = props;

    return (
        <div className={classes.iconContainer}>
            <Tooltip title={"Move to received primers"}>
                <IconButton className={classes.iconButton} onClick={handleClickOpen}>
                    <ArrowUpward className={classes.icon}/>
                </IconButton>
            </Tooltip>
            <OrderedMoveDialog open={open} setOpen={setOpen} data={primerData}/>
            <Tooltip title={"Delete"}>
                <IconButton className={classes.iconButton} onClick={handleClickDelete}>
                    <Delete className={classes.icon}/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelectOrdered"})(CustomToolbarSelectOrdered);
