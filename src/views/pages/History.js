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
                        <Paper className={fixedHeightPaper}>
                            <Title>Šimen Ravnik ordered 16 primers</Title>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                on {new Date().toDateString()}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper className={fixedHeightPaper}>
                            <Title>Šimen Ravnik updated primer with sequence TCTAAAAAGCATGTAAAAGAAA</Title>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                on {new Date().toDateString()}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper className={fixedHeightPaper}>
                            <Title>Šimen Ravnik removed 4 primers from the database</Title>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                on {new Date().toDateString()}
                            </Typography>
                        </Paper>
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
