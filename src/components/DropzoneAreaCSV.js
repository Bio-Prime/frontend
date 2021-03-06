import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FileService from "../services/FileService";
import Typography from "@material-ui/core/Typography";

export default function DropzoneAreaCSV(props) {

    const [state, setState] = React.useState({files: []});

    const handleChange = (files) => {
        setState({
            files: files
        });
    };

    const handleClickSave = () => {
        FileService.uploadCsv(state.files[0])
            .catch(error => alert("Error uploading CSV: " + error))
            .finally(props.handleClose());
    };

    return (
        <div>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <DropzoneArea
                        onChange={handleChange.bind(this)}
                        showFileNames
                        filesLimit={1}
                        acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Button variant="outlined" onClick={handleClickSave} color="primary">
                        Save
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Typography>
                        <a href={process.env.PUBLIC_URL + "/sample.csv"} download>
                            Get sample.csv
                        </a>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
