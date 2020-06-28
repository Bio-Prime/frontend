import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {Edit} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import AuthService from "../../services/AuthService";

export default function CustomToolbarEdit(props) {

    const history = useHistory();

    const handleClickOpen = () => {
        history.push('/edit', {
            data: props.data
        });
    };

    return (
        <React.Fragment>
            <div></div>
            {AuthService.getUserRole() !== 'GUEST'
                ? <Tooltip title={"Edit"}>
                    <IconButton onClick={handleClickOpen}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                : <div></div>
            }
        </React.Fragment>
    );
}
