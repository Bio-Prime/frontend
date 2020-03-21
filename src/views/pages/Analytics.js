import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Title from "../../components/Title";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Orders() {
    const classes = useStyles();

    const theme = useTheme();

    return (
        <Title>Analytics page is yet to be implemented!</Title>
    );
}
