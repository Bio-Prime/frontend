import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Count({dataCount, title}) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Typography component="p" variant="h4">
                {dataCount}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {new Date().toDateString()}
            </Typography>
        </React.Fragment>
    );
}
