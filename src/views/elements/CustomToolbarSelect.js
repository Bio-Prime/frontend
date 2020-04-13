import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { withStyles } from "@material-ui/core/styles";

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

class CustomToolbarSelect extends React.Component {

    handleClickEditSelected = () => {
        console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.iconContainer}>
                <Tooltip title={"Open selected"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickEditSelected}>
                        <OpenInNewIcon className={classes.icon} />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
