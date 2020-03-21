import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Text from "recharts/lib/component/Text";
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
        <Title><Text style={{color: theme.palette.text.primary}}>History page is yet to be implemented!</Text></Title>
    );
}
