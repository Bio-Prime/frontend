import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Delete, ShoppingCart} from "@material-ui/icons";
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import PrimersService from "../../services/PrimersService";

function DashboardSelectToolbar(props) {

    function getIdsFromSelectedRows() {


        let dataIndexes = props.selectedRows.data.map(el => el.dataIndex)

        let ids = [];
        for (let row in props.displayData) {
            for (let index in dataIndexes) {
                // eslint-disable-next-line
                if (props.displayData[row].dataIndex == dataIndexes[index]) {
                    ids.push(props.displayData[row].data[0])
                }
            }
        }
        return ids;
    }

    function deletePrimers() {
        let ids = getIdsFromSelectedRows();
        PrimersService.delete(ids).then(props.reload())
    }

    function moveToOrdered() {
        let ids = getIdsFromSelectedRows();
        PrimersService.moveToWanted(ids).then(props.reload())
    }

    function linkPrimers() {
        let ids = getIdsFromSelectedRows();
        PrimersService.linkPrimersByIds(ids).then(props.reload())
    }
    function unLinkPrimers() {
        let ids = getIdsFromSelectedRows();
        PrimersService.unLinkPrimersByIds(ids).then(props.reload())
    }

    return (
        <div>
            <Tooltip title={"Unlink"}>
                <IconButton onClick={unLinkPrimers}>
                    <LinkOffIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Link"}>
                <IconButton onClick={linkPrimers}>
                    <LinkIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Move to ordered"}>
                <IconButton onClick={moveToOrdered}>
                    <ShoppingCart/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Delete"}>
                <IconButton onClick={deletePrimers}>
                    <Delete/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default DashboardSelectToolbar;
