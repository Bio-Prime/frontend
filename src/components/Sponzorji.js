import Typography from "@material-ui/core/Typography";
import React from "react";
import sponzorji_logos from "../res/PKP_sponzorji.png"
import {Container} from "@material-ui/core";


export default function Sponzorji() {
    return (
        <Container>
            <img style={{width:"50%", display:"block", margin: "0 auto"}} src={sponzorji_logos} alt={"Sponzorji projekta"}/>
            <Typography style={{width:"100%"}} variant="body2" color="textSecondary" align="center">
                Projekt sofinancirata Republika Slovenija in Evropska unija iz Evropskega socialnega sklada
            </Typography>
        </Container>
    );
}
