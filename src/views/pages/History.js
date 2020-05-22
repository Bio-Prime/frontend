import React, {useEffect, useState} from 'react';
import Title from "../../components/Title";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import HistoryService from "../../services/HistoryService";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    paperCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    fixedHeight: {
        height: 150,
    },
    fixedHeightTwo: {
        height: 480,
    },
    fixedHeightThree: {
        height: 305,
    }
}));

export default function Orders() {

    const [data, setData] = useState(null);

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        HistoryService.getAll().then((data) => {
            setData(data);
            console.log(data);
        });
    }, []);

    if (data != null) {
        return (
            <div className={classes.paperCenter}>
                <Grid container alignItems={"center"} style={{width: '75%'}} spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        { data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Paper className={fixedHeightPaper}>
                                        <Title>{item.primer}</Title>
                                        <Typography>User {item.user} performed an action {item.action}.</Typography>
                                        <br/>
                                        <Typography color="textSecondary" className={classes.depositContext}>
                                            on {new Date(item.timestamp).toDateString()}
                                        </Typography>
                                    </Paper>
                                </div>
                            )})
                        }
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: "90vh"}}
            >
                <CircularProgress/>
            </Grid>
        );
    }
}
