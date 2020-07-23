import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://github.com/Bio-Prime/frontend/issues/new/choose">
                Report a bug.
            </Link>
        </Typography>
    );
}
