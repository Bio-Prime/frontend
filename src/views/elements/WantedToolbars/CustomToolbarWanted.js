import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import WantedAddDialog from "./dialogs/WantedAddDialog";
import AuthService from "../../../services/AuthService";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function CustomToolbarWanted(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleRefresh = () => {
        props.reloadData();
    };

    return (
        <React.Fragment>
            <Tooltip title={"Refresh"}>
                <IconButton onClick={handleRefresh}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
            {AuthService.getUserRole() !== 'GUEST'
                ? <Tooltip title={"Add"}>
                    <IconButton onClick={handleClickOpen}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
                : <div></div>
            }
            <WantedAddDialog open={open} setOpen={setOpen}/>
        </React.Fragment>
    );
}
