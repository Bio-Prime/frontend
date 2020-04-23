import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
    },
    paperCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

const orientations = [
    {
        value: "forward",
        label: "Forward"
    },
    {
        value: "reverse",
        label: "Reverse"
    }
];

export default function AddOne() {

    const [data, setData] = React.useState({
        name: '',
        sequence: '',
        orientation: '',
        length: '',
        freezer: '',
        drawer: '',
        box: '',
        positionInReference: '',
        optimalTOfAnnealing: '',
        purificationMethod: '',
        amountAvailableMikroL: '',
        amountAvailablePackSize: '',
        date: new Date('2014-08-18T21:11:54'),
        lengthOfAmplicone: '',
        storingT: '',
        organism: '',
        gen: '',
        ncbiGenId: '',
        humanGenomBuild: '',
        formulation: '',
        typeOfPrimer: '',
        sondaSequence: '',
        assayId: '',
        size: '',
        primerApplication: '',
        applicationComment: '',
        fiveModification: '',
        threeModification: '',
        concentrationOrdered: '',
        concentrationOrderedUnit: '',
        checkSpecifityInBlast: '',
        designerName: '',
        designerPublication: '',
        designerDatabase: '',
        project: '',
        orderedBy: '',
        supplier: '',
        manufacturer: '',
        comment: '',
        document: '',
        analysis: '',
        orderStatus: '',
        user: '',
        pairs: '',
        tm: '',
        gcpercent: '',
    });

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const classes = useStyles();

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <div className={classes.paperCenter}>
                <Typography variant="h6" gutterBottom>
                    Add one oligonucleotide primer
                </Typography>
                <DialogContentText>
                    Please enter the fields below
                </DialogContentText>

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                value={data.name}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="sequence"
                                variant="outlined"
                                required
                                fullWidth
                                id="sequence"
                                label="Sequence"
                                value={data.sequence}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="orientation"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="orientation"
                                label="Orientation"
                                value={data.orientation}
                                onChange={handleChange}
                                helperText="Enter primer's orientation"
                            >
                                {orientations.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="length"
                                variant="outlined"
                                required
                                fullWidth
                                id="length"
                                label="Length"
                                value={data.length}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="freezer"
                                variant="outlined"
                                required
                                fullWidth
                                id="freezer"
                                label="Freezer"
                                value={data.freezer}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="drawer"
                                variant="outlined"
                                required
                                fullWidth
                                id="drawer"
                                label="Drawer"
                                value={data.drawer}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="box"
                                variant="outlined"
                                required
                                fullWidth
                                id="box"
                                label="Box"
                                value={data.box}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="positionInReference"
                                variant="outlined"
                                required
                                fullWidth
                                id="positionInReference"
                                label="Position in the reference"
                                value={data.positionInReference}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="tm"
                                variant="outlined"
                                required
                                fullWidth
                                id="tm"
                                label="Tm (°C)"
                                value={data.tm}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="optimalTOfAnnealing"
                                variant="outlined"
                                required
                                fullWidth
                                id="optimalTOfAnnealing"
                                label="Optimal T of annealing (°C)"
                                value={data.optimalTOfAnnealing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="purificationMethod"
                                variant="outlined"
                                required
                                fullWidth
                                id="purificationMethod"
                                label="Purification method"
                                value={data.purificationMethod}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="amountAvailableMikroL"
                                variant="outlined"
                                required
                                fullWidth
                                id="amountAvailableMikroL"
                                label="Amount available (µL)"
                                value={data.amountAvailableMikroL}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="amountAvailablePackSize"
                                variant="outlined"
                                required
                                fullWidth
                                id="amountAvailablePackSize"
                                label="Amount available (Pack size)"
                                value={data.amountAvailablePackSize}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="lengthOfAmplicone"
                                variant="outlined"
                                required
                                fullWidth
                                id="lengthOfAmplicone"
                                label="Length of amplicone"
                                value={data.lengthOfAmplicone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="storingT"
                                variant="outlined"
                                required
                                fullWidth
                                id="storingT"
                                label="Storing T (°C)"
                                value={data.storingT}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="organism"
                                variant="outlined"
                                required
                                fullWidth
                                id="organism"
                                label="Organism"
                                value={data.organism}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="gen"
                                variant="outlined"
                                required
                                fullWidth
                                id="gen"
                                label="Gen"
                                value={data.gen}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="ncbiGenId"
                                variant="outlined"
                                required
                                fullWidth
                                id="ncbiGenId"
                                label="NCBI gen ID"
                                value={data.ncbiGenId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="humanGenomBuild"
                                variant="outlined"
                                required
                                fullWidth
                                id="humanGenomBuild"
                                label="Human genom build"
                                value={data.humanGenomBuild}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="formulation"
                                variant="outlined"
                                required
                                fullWidth
                                id="formulation"
                                label="Formulation"
                                value={data.formulation}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="typeOfPrimer"
                                variant="outlined"
                                required
                                fullWidth
                                id="typeOfPrimer"
                                label="Type of primer"
                                value={data.typeOfPrimer}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="sondaSequence"
                                variant="outlined"
                                required
                                fullWidth
                                id="sondaSequence"
                                label="Sonda sequence"
                                value={data.sondaSequence}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="assayId"
                                variant="outlined"
                                required
                                fullWidth
                                id="assayId"
                                label="Assay ID"
                                value={data.assayId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="size"
                                variant="outlined"
                                required
                                fullWidth
                                id="size"
                                label="Size"
                                value={data.size}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="primerApplication"
                                variant="outlined"
                                required
                                fullWidth
                                id="primerApplication"
                                label="Primer application"
                                value={data.primerApplication}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="applicationComment"
                                variant="outlined"
                                required
                                fullWidth
                                id="applicationComment"
                                label="Application comment"
                                value={data.applicationComment}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="fiveModification"
                                variant="outlined"
                                required
                                fullWidth
                                id="fiveModification"
                                label="5' Modification"
                                value={data.fiveModification}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="threeModification"
                                variant="outlined"
                                required
                                fullWidth
                                id="threeModification"
                                label="3' Modification"
                                value={data.threeModification}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="concentrationOrdered"
                                variant="outlined"
                                required
                                fullWidth
                                id="concentrationOrdered"
                                label="Concentration ordered"
                                value={data.concentrationOrdered}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="concentrationOrderedUnit"
                                variant="outlined"
                                required
                                fullWidth
                                id="concentrationOrderedUnit"
                                label="Concentration ordered unit"
                                value={data.concentrationOrderedUnit}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="checkSpecifityInBlast"
                                variant="outlined"
                                required
                                fullWidth
                                id="checkSpecifityInBlast"
                                label="Check specifity in blast"
                                value={data.checkSpecifityInBlast}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="designerName"
                                variant="outlined"
                                required
                                fullWidth
                                id="designerName"
                                label="Designer name"
                                value={data.designerName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="designerPublication"
                                variant="outlined"
                                required
                                fullWidth
                                id="designerPublication"
                                label="Designer publication"
                                value={data.designerPublication}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="designerDatabase"
                                variant="outlined"
                                required
                                fullWidth
                                id="designerDatabase"
                                label="Designer database"
                                value={data.designerDatabase}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="project"
                                variant="outlined"
                                required
                                fullWidth
                                id="project"
                                label="Project"
                                value={data.project}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="orderedBy"
                                variant="outlined"
                                required
                                fullWidth
                                id="orderedBy"
                                label="Ordered by"
                                value={data.orderedBy}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="supplier"
                                variant="outlined"
                                required
                                fullWidth
                                id="supplier"
                                label="Supplier"
                                value={data.supplier}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="manufacturer"
                                variant="outlined"
                                required
                                fullWidth
                                id="manufacturer"
                                label="Manufacturer"
                                value={data.manufacturer}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="comment"
                                variant="outlined"
                                required
                                fullWidth
                                id="comment"
                                label="Comment"
                                value={data.comment}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="document"
                                variant="outlined"
                                required
                                fullWidth
                                id="document"
                                label="Document"
                                value={data.document}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="analysis"
                                variant="outlined"
                                required
                                fullWidth
                                id="analysis"
                                label="Analysis"
                                value={data.analysis}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="orderStatus"
                                variant="outlined"
                                required
                                fullWidth
                                id="orderStatus"
                                label="Order status"
                                value={data.orderStatus}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="user"
                                variant="outlined"
                                required
                                fullWidth
                                id="user"
                                label="User"
                                value={data.user}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="pairs"
                                variant="outlined"
                                required
                                fullWidth
                                id="pairs"
                                label="Pairs"
                                value={data.pairs}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="tm"
                                variant="outlined"
                                required
                                fullWidth
                                id="tm"
                                label="Tm"
                                value={data.tm}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="gcpercent"
                                variant="outlined"
                                required
                                fullWidth
                                id="gcpercent"
                                label="Gcpercent"
                                value={data.gcpercent}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </form>
                </div>
            </Paper>
        </React.Fragment>
    );
}

