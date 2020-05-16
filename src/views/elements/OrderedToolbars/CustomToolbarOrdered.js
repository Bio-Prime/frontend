import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import OrderedAddDialog from "./dialogs/OrderedAddDialog";

export default function CustomToolbarOrdered() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <React.Fragment>
            <Tooltip title={"Add"}>
                <IconButton onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <OrderedAddDialog open={open} setOpen={setOpen}/>
        </React.Fragment>
    );
}
