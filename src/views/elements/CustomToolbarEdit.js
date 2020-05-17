import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Edit} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

export default function CustomToolbarEdit(props) {

    const history = useHistory();

    const handleClickOpen = () => {
        history.push('/edit', {
            data: props.data
        });
    };

    return (
        <React.Fragment>
            <Tooltip title={"Edit"}>
                <IconButton onClick={handleClickOpen}>
                    <Edit />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}
