import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import PrimersAddDialog from "./PrimersAddDialog";

export default function CustomToolbarAdmin() {

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
            <PrimersAddDialog open={open} setOpen={setOpen}/>
        </React.Fragment>
    );
}
