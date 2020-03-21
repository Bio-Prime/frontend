import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Text from "recharts/lib/component/Text";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Count() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <React.Fragment>
            <Title><Text style={{color: theme.palette.text.primary}}>Total Number of Primers</Text></Title>
            <Typography component="p" variant="h4">
                161
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
