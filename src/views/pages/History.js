import React, {useEffect, useState} from 'react';
import Title from "../../components/Title";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import HistoryService from "../../services/HistoryService";
import Pagination from "@material-ui/lab/Pagination";
import AuthService from "../../services/AuthService";
import {Redirect} from "react-router-dom";

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
    const [paginationData, setPaginationData] = useState(null);

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        HistoryService.getAll().then((data) => {
            setData(data);
            setPaginationData(data.slice(0, Math.min(5, data.length)));
        });
    }, []);

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setPaginationData(data.slice((value - 1) * 5, value * 5));
    };

    if (AuthService.getUserRole() === 'GUEST') {
        return (
            <Redirect to='/dashboard'/>
        )
    } else if (paginationData != null) {
        return (
            <div className={classes.paperCenter}>
                <Grid container alignItems={"center"} style={{width: '75%'}} spacing={3}>
                    {paginationData.map((item, index) => {
                        return (
                            <Grid item xs={12} md={12} lg={12} key={index}>
                                <Paper className={fixedHeightPaper}>
                                    <Title>{item.primer}</Title>
                                    <Typography>{"User"} <b> {item.user} </b>{"performed action "}<b>{item.action}</b></Typography>
                                    <br/>
                                    <Typography color="textSecondary" className={classes.depositContext}>
                                        on {new Date(item.timestamp).toDateString()}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>
                <Pagination count={Math.ceil(data.length / 5)} page={page} onChange={handleChange}
                            style={{marginTop: '20px'}}/>
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
