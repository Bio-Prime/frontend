import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import jsk from "../res/jss.png";
import ess from "../res/ess.png";
import mizs from "../res/mizs.png";
import uni from "../res/uni.png";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
    imageBox: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "nowrap",
        height: "8vh",
    },
    img: {
        display: "block",
        height: "100%",
        width: "auto",
    }
});

export default function Sponzorji(props) {
    const classes = useStyles(props);

    return (
        <Container>
            <Box className={classes.imageBox}>
                <img className={classes.img} src={ess} alt={"Sponzorji projekta"}/>
                <img className={classes.img} src={mizs} alt={"Sponzorji projekta"}/>
                <img className={classes.img} src={jsk} alt={"Sponzorji projekta"}/>
                <img className={classes.img} src={uni} alt={"Sponzorji projekta"}/>
            </Box>
            <Typography style={{width: "100%"}} variant="body2" color="textSecondary" align="center">
                Projekt sofinancirata Republika Slovenija in Evropska unija iz Evropskega socialnega sklada
            </Typography>
        </Container>
    );
}
