import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Count({dataCount}) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Total Number of Primers</Title>
            <Typography component="p" variant="h4">
                {dataCount}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {new Date().toDateString()}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    More Analytics
                </Link>
            </div>
        </React.Fragment>
    );
}
