import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { withStyles } from "@material-ui/core/styles";
import PrimersColumns from "./PrimersColumns";
import {Delete} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import PrimerService from "./../../services/PrimersService";
import AuthService from "../../services/AuthService";
import LinkIcon from '@material-ui/icons/Link';

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
    const history = useHistory();

    // the row that was selected
    let selectedRow = props.selectedRows.data[0].index;

    // the data of the row that was selected
    let dataArray = props.displayData[selectedRow].data;

    // data json
    let dataJson = {};
    const columns = PrimersColumns;
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

    const handleClickOpen = () => {
        history.push('/primer-details', {
            data: dataJson,
            pairsData: pairsData
        });
    };

    const handleClickDelete = () => {
        PrimerService.delete(dataJson.id).then((data) => {
            if(data){
                props.afterDelete();
            } else {
                alert("Error deleting primer!");
            }
        });
        console.log("Delete primer with id: ", + dataJson.id);
    };

    const { classes } = props;

    function handleLink() {
        let dataIndexes =  props.selectedRows.data.map(el => el.dataIndex);
        let data = props.displayData;
        debugger;
    }

    return (
        <div className={classes.iconContainer}>
            <Tooltip title={"Link"}>
                <IconButton className={classes.iconButton} onClick={handleLink}>
                    <LinkIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Open selected"}>
                <IconButton className={classes.iconButton} onClick={handleClickOpen}>
                    <OpenInNewIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
            {AuthService.getUserRole() !== 'GUEST' && AuthService.getUserRole() !== 'STUDENT'
                ? <Tooltip title={"Delete"}>
                    <IconButton className={classes.iconButton} onClick={handleClickDelete}>
                        <Delete className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                : <div></div>
            }
        </div>
    );
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
