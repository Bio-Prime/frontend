import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { withStyles } from "@material-ui/core/styles";
import PrimersDetails from "./PrimerDetails";
import PrimersColumns from "./PrimersColumns";

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

    // the row that was selected
    let selectedRow = props.selectedRows.data[0].index;

    // the data of the row that was selected
    let dataArray = props.displayData[selectedRow].data;

    // data json
    let dataJson = {};
    const columns = PrimersColumns.getPrimersColumns();
    columns.forEach((item, index) => {
        dataJson[item.name] = dataArray[index];
    });


    let pairsData = [];
    const getPrimersPairs = () => {

        let pairs = dataJson.pairs;
        for (let i = 0; i < props.displayData.length; i++) {
            for (let j = 0; j < pairs.length; j++) {
                if (props.displayData[i].data[0] === pairs[j]) {
                    pairsData.push(props.displayData[i].data);
                }
            }
        }
    };
    getPrimersPairs();

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
            <PrimersDetails open={open} setOpen={setOpen} data={dataJson} pairsData={pairsData} />
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
