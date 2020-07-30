import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import UserService from "../../services/UserService";

export default function FavouritesSelectToolbar(props) {

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


    function unfavourite() {
        let ids = getIdsFromSelectedRows();
        UserService.removeFavouritesByIds(ids).then(props.reload())
    }

    return (
        <div>
            <Tooltip title={"Unfavourite"}>
                <IconButton onClick={unfavourite}>
                    <FavoriteBorderIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

