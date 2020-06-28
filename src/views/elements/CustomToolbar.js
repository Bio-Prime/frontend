import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import PrimersAddDialog from "./PrimersAddDialog";
import RefreshIcon from '@material-ui/icons/Refresh';
import AuthService from "../../services/AuthService";

export default function CustomToolbar(props) {

    const [open, setOpen] = React.useState(false);

    const handleAdd = () => {
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
            {AuthService.getUserRole() === 'ADMIN' || AuthService.getUserRole() === 'RESEARCHER'
                ? <Tooltip title={"Add"}>
                    <IconButton onClick={handleAdd}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                : <div></div>
                }
            <PrimersAddDialog open={open} setOpen={setOpen}/>
        </React.Fragment>
    );
}
