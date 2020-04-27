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

const orientations = ["Forward", "Reverse"];
const organism = ["Escherichia coli TG1", "Escherichia coli WK6", "Homo sapiens", "Mus musculus", "Rattus norvegicus domestica", "Other"];
const humanGenomBuild = ["NCBI Build 34", "NCBI Build 35", "NCBI Build 36.1", "GRCh37", "GRCh38"];
const positionInReference = ["5'-promotor", "5'-untranslated region", "3'-untranslated region", "5'-exon", "3'-exon", "5'-intron", "3'-intron",
                                "5'-enhancer", "5'-up", "3'-dw", "Intergenic", "No data"];
const formulation = ["Lyophilized", "Water", "Resuspended in TRIS", "Resuspended in 1x TE", "Resuspended in 0.1 X TE", "Other"];
const storingT = ["Room temperature", "+4", "-20", "-80", "Other"];
const purificationMethod = ["Cartridge", "Desalted", "HPLC", "HPLC X", "PAGE", "Other"];
const typeOfPrimer = ["GAPDH primer", "M13 primer", "M13/pUC primer", "miRNA primer", "DNA/RNA probe", "TaqProbe", "Random primer",
                        "Oligo dT", "RNA probes", "SP6 probes", "T3 primer", "T7 primer", "Gene Specific primer", "Disease Specific primer",
                        "Region Specific primer", "Gene Fusion primer", "Break Apart primer", "Chromosome Control primer"];
const size = ["XS", "S", "M", "L"];
const application = ["Genotyping", "Cloning", "NGS", "Sanger Sequencing", "Bisulfite converted", "cDNA synthesis", "RT-qPCR-SYBR",
                        "RT-qPCR-TaqMan", "PCR", "ddPCR", "Methylation-specific PCR", "In situ hybridisation", "FISH",
                        "ChIP", "Flow Cytometry", "Other"];
const fiveModification = ["FAM", "HEX", "ROX", "VIC", "T(JOE)", "T(ROX)", "Aldehyde Modifier", "Aleza Fluor 488", "Aleza Fluor 532",
                            "Aleza Fluor 546", "Aleza Fluor 555", "Aleza Fluor 594", "Aleza Fluor 647", "Aleza Fluor 660",
                            "Aleza Fluor 750", "Alkaline Phspates", "Amino C12", "Amino Linker C6", "BHQ-0", "BHQ-1", "BHQ-2",
                            "BHQ-3", "Biotin", "Biotin TEG", "BODIPY 493/503", "BODIPY 530/550", "BODIPY 558/568", "BODIPY 564/570",
                            "BODIPY 576/589", "BODIPY 581/591", "BODIPY 630/650-X", "BODIPY 650/655-X", "BODIPY FL", "BODIPY FL-X",
                            "BODIPY R6G", "BODIPY TMR-x", "BODIPY TR-X", "CAL Fluor Gold 540", "CAL Fluor Orange 560", "CAL Fluor Red 590",
                            "CAL Fluor Red 610", "CAL Fluor Red 635", "CIV-550", "DABCYL", "Fluorescein", "Horseradish Peroxidase",
                            "Marina BlueTM", "Oregon Green 488", "Oregon Green 488-X", "Oregon Green 500", "Oregon Green 514", "Pacific BlureTM",
                            "Phos", "Phosphate", "Quasar 570", "Quasar 670", "Quasar 705", "Rhodamine GreenTM", "Rhodamine Red-X",
                            "Rhodol Green", "Spacer 18", "T(BHQ-1)", "T(BHQ-2)", "T(C6-Amino)", "T(Methylene Blue)", "TAMRA",
                            "TET", "Texas Red-X", "Thiol", "None", "Other"];
const threeModification = ["Amino Linker C7", "BHQ-0", "BHQ-1", "BHQ-2", "BHQ-3", "Biosearch Blue", "Biotin", "Biotin TEG",
                            "C3-Fluorescein", "CAL Fluor Orange 560", "CAL Fluor Red 610", "d-Uridine", "DABCYL", "mdC(ROX)",
                            "mdC(TEG-Amino)", "Methylen Blue", "Phos", "Phosphate", "Pulsar 650", "Quasar 570", "Quasar 670",
                            "Quasar 705", "Spacer 6", "Spacer C3", "T(C6-Amino)", "T(C6-Biotin)", "T(CAL Fluor Gold 540)",
                            "T(CAL Fluor Orange 560)", "T(CAL Fluor Red 590)", "T(CAL Fluor Red 610)", "T(CAL Fluor Red 635)",
                            "T(Methylene Blue)", "TAMRA", "Thiol C6 SS", "None", "Other"];
const concentrationOrderedUnit = ["nmol", "µM", "nM"];
const amountAvailablePack = ["Tube", "Plate"];
const amountAvailableVolume = ["µl", "number of wells"];
const checkSpecificityBlast = ["Yes", "No"];
// list of designerNames must be acquired from database
// const designerName = [];
// list of project names must be acquired from database
// const projects = [];
const supplier = ["Kemomed", "MikroPolo", "Omega", "Other"];
const manufacturer = ["Biocompare", "BioSearch", "CustomArray", "Genewiz", "Integrated DNA Technologies", "Sigma-Aldrich",
                        "ThermoFisher Scientific", "Other"];
// list of freezers, drawers, boxes must be acquired from database
// const freezer = [];
// const drawer = [];
// const box = [];


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
                                {orientations.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
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
                                select
                                id="positionInReference"
                                label="Position in the reference"
                                value={data.positionInReference}
                                onChange={handleChange}
                            >
                                {positionInReference.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                id="purificationMethod"
                                label="Purification method"
                                value={data.purificationMethod}
                                onChange={handleChange}
                            >
                                {purificationMethod.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="amountAvailableMikroL"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="amountAvailableMikroL"
                                label="Amount available (µL)"
                                value={data.amountAvailableMikroL}
                                onChange={handleChange}
                            >
                                {amountAvailableVolume.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="amountAvailablePackSize"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="amountAvailablePackSize"
                                label="Amount available (Pack size)"
                                value={data.amountAvailablePackSize}
                                onChange={handleChange}
                            >
                                {amountAvailablePack.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                id="storingT"
                                label="Storing T (°C)"
                                value={data.storingT}
                                onChange={handleChange}
                            >
                                {storingT.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="organism"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="organism"
                                label="Organism"
                                value={data.organism}
                                onChange={handleChange}
                            >
                                {organism.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                id="humanGenomBuild"
                                label="Human genom build"
                                value={data.humanGenomBuild}
                                onChange={handleChange}
                            >
                                {humanGenomBuild.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="formulation"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="formulation"
                                label="Formulation"
                                value={data.formulation}
                                onChange={handleChange}
                            >
                                {formulation.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="typeOfPrimer"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="typeOfPrimer"
                                label="Type of primer"
                                value={data.typeOfPrimer}
                                onChange={handleChange}
                            >
                                {typeOfPrimer.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                fullWidth
                                id="size"
                                label="Size"
                                value={data.size}
                                onChange={handleChange}
                            >
                                {size.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="primerApplication"
                                variant="outlined"
                                required
                                select
                                fullWidth
                                id="primerApplication"
                                label="Primer application"
                                value={data.primerApplication}
                                onChange={handleChange}
                            >
                                {application.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                id="fiveModification"
                                label="5' Modification"
                                value={data.fiveModification}
                                onChange={handleChange}
                            >
                                {fiveModification.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="threeModification"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="threeModification"
                                label="3' Modification"
                                value={data.threeModification}
                                onChange={handleChange}
                            >
                                {threeModification.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="concentrationOrdered"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="concentrationOrdered"
                                label="Concentration ordered"
                                value={data.concentrationOrdered}
                                onChange={handleChange}
                            >
                                {concentrationOrderedUnit.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                id="checkSpecifityInBlast"
                                label="Check specifity in blast"
                                value={data.checkSpecifityInBlast}
                                onChange={handleChange}
                            >
                                {checkSpecificityBlast.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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
                                select
                                id="supplier"
                                label="Supplier"
                                value={data.supplier}
                                onChange={handleChange}
                            >
                                {supplier.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="manufacturer"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                id="manufacturer"
                                label="Manufacturer"
                                value={data.manufacturer}
                                onChange={handleChange}
                            >
                                {manufacturer.map(value => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                />
                            </TextField>
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

