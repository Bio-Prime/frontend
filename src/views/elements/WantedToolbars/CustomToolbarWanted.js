import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import WantedAddDialog from "./dialogs/WantedAddDialog";

export default function CustomToolbarWanted() {

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
            <WantedAddDialog open={open} setOpen={setOpen}/>
        </React.Fragment>
    );
}