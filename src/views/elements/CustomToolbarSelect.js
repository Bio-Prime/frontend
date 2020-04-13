import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { withStyles } from "@material-ui/core/styles";
import PrimersDetails from "./PrimerDetails";

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

function CustomToolbarSelect(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const { classes } = props;

    return (
        <div className={classes.iconContainer}>
            <Tooltip title={"Open selected"}>
                <IconButton className={classes.iconButton} onClick={handleClickOpen}>
                    <OpenInNewIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
            <PrimersDetails open={open} setOpen={setOpen}/>
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
