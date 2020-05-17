import React from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function DropzoneAreaCSV(props) {

    const [state, setState] = React.useState({files: []});

    const handleChange = (files) => {
        setState({
            files: files
        });
    };

    const handleClickSave = () => {
        console.log(state);
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
                        acceptedFiles={['text/csv']}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button variant="outlined" onClick={handleClickSave} color="primary">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
