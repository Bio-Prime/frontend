import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';

export default function CustomToolbarAdmin() {

    const history = useHistory();

    const handleClick = () => {
        history.push('/add-user');
    };

    return (
        <React.Fragment>
            <Tooltip title={"Add"}>
                <IconButton onClick={handleClick}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}
