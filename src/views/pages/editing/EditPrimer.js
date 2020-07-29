import React, {useEffect, useRef} from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Constants from "../constants";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import {Redirect, useHistory} from "react-router-dom";
import PrimersService from "../../../services/PrimersService";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthService from "../../../services/AuthService";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
    width: "85%",
  },
  paperCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function EditPrimer(props) {
  const [state, setState] = React.useState(Constants.defaultPrimerData);
  const [date, setDate] = React.useState(Date.now());
  const [foreignTables, setForeignTables] = React.useState({isLoaded: false});

  const formRef = useRef();

  let primerData = props.location.state.data;

let history = useHistory();

  //set state values to that of provided data




  useEffect(() => {
    PrimersService.getAllForeignTables().then((tables) => {
      return {...Constants.foreignTables, ...tables, isLoaded: true};
    }).then(setForeignTables);

    for (let key in primerData) {
      if (primerData[key] === null || primerData[key] === undefined) {
        primerData[key] = "";
      }
    }

    let newState = {};
    for (let key in state) {
      newState[key] = primerData[key];
    }
    setState(newState);
    setDate(primerData.date);
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleNumbers = (event) => {
    if (!isNaN(event.target.value))
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
  };

  const handleLetters = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value.replace(/([^a-zA-Z])/g, "").toUpperCase(),
    });
  };

  const classes = useStyles();
  // const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    let formdata = new FormData(formRef.current);

      formdata.forEach((value, key) => {
        primerData[key] = value;
      });
    primerData["date"] = date;
      PrimersService.update(primerData)
          .then(history.push("/overview"))
          .catch((err) => alert("Error adding primer:", err));
  };

  const xsWidth = 12;
  const smWidth = 4;

  if (AuthService.getUserRole() !== 'ADMIN' && AuthService.getUserRole() !== 'RESEARCHER') {
    return <Redirect to='/dashboard'/>
  } else if (!foreignTables.isLoaded) {
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
  } else {
    return (
        <div className={classes.paperCenter}>
          <Paper className={classes.paper}>
            <div className={classes.paperCenter}>
              <Typography variant="h5" gutterBottom>
                Edit primer/probe
              </Typography>
              <DialogContentText>
                Enter decimal numbers with "." and not ",".
              </DialogContentText>

              <form
                  ref={formRef}
                  name="primerForm"
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography gutterBottom variant="h6">
                      Properties of primer/probe
                    </Typography>
                  </Grid>

                  <Divider variant="middle"/>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <TextField
                        name="name"
                        variant="outlined"
                        fullWidth
                        label="Name of primer/probe"
                        autoFocus
                        defaultValue={primerData.name}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 2}>
                    <TextField
                        name="sequence"
                        variant="outlined"
                        fullWidth
                        label="Sequence"
                        value={state.sequence}
                        onChange={handleLetters}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Length"
                        value={state.sequence ? state.sequence.length : 0}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="tm"
                        variant="outlined"
                        fullWidth
                        label="Tm (°C)"
                        value={state.tm}
                        onChange={handleNumbers}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="gcpercent"
                        variant="outlined"
                        fullWidth
                        label="GC (%)"
                        value={state.gcpercent}
                        onChange={handleNumbers}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="optimalTOfAnnealing"
                        variant="outlined"
                        fullWidth
                        label="Optimal T of annealing (°C)"
                        value={state.optimalTOfAnnealing}
                        onChange={handleNumbers}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.organism}
                        defaultValue={primerData.organism}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="organism"
                                variant="outlined"
                                fullWidth
                                label="Organism"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="gen"
                        variant="outlined"
                        fullWidth
                        label="Gen"
                        defaultValue={primerData.gen}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="ncbiGenId"
                        variant="outlined"
                        fullWidth
                        label="NCBI gen ID"
                        defaultValue={primerData.ncbiGenId}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        options={foreignTables.humanGenomBuild}
                        defaultValue={primerData.humanGenomBuild}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="humanGenomBuild"
                                variant="outlined"
                                fullWidth
                                label="Human genom build"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.positionInReference}
                        defaultValue={primerData.positionInReference}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="positionInReference"
                                variant="outlined"
                                fullWidth
                                label="Position in the reference"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="lengthOfAmplicone"
                        variant="outlined"
                        fullWidth
                        label="Length of amplicone"
                        value={state.lengthOfAmplicone}
                        onChange={handleNumbers}
                        defaultValue={primerData.lengthOfAmplicone}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        options={foreignTables.typeOfPrimer}
                        defaultValue={primerData.typeOfPrimer}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="typeOfPrimer"
                                variant="outlined"
                                fullWidth
                                label="Type of primer/probe"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.fiveModification}
                        defaultValue={primerData.fiveModification}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="fiveModification"
                                variant="outlined"
                                fullWidth
                                label="5' Modification"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.threeModification}
                        defaultValue={primerData.threeModification}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="threeModification"
                                variant="outlined"
                                fullWidth
                                label="3' Modification"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        options={["Forward","Reverse"]}
                        defaultValue={primerData.orientation}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="orientation"
                                variant="outlined"
                                fullWidth
                                label="Orientation"
                            />
                        )}
                    />
                  </Grid>


                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        options={["Wanted","Ordered","Received"]}
                        defaultValue={primerData.orderStatus}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="orderStatus"
                                variant="outlined"
                                fullWidth
                                label="Order status"
                            />
                        )}
                    />
                  </Grid>
                  <Grid item xs={xsWidth} sm={smWidth}>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        dispaly="block"
                        style={useStyles.verticalCenter}
                    >
                      Did you check specificity in Blast?
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <FormControl component="fieldset">
                      <RadioGroup
                          row
                          aria-label="checkSpecifityInBlast"
                          name="checkSpecifityInBlast"
                          defaultValue={primerData.checkSpecifityInBlast}
                      >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary"/>}
                            label="Yes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="primary"/>}
                            label="No"
                            labelPlacement="top"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}></Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography variant="h6" gutterBottom>
                      Form of ordered primer/probe
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.formulation}
                        defaultValue={primerData.formulation}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="formulation"
                                variant="outlined"
                                fullWidth
                                label="Formulation"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.storingT}
                        defaultValue={primerData.storingT}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="storingT"
                                variant="outlined"
                                fullWidth
                                label="Storing T (°C)"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.purificationMethod}
                        defaultValue={primerData.purificationMethod}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="purificationMethod"
                                variant="outlined"
                                fullWidth
                                label="Purification method"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={8} sm={2}>
                    <TextField
                        name="amountAvailablePackType"
                        variant="outlined"
                        fullWidth
                        select
                        label="Pack type"
                        value={state.amountAvailablePackType}
                        onChange={handleChange}
                    >
                      {Constants.amountAvailablePackType.map((options) => (
                          <MenuItem key={options.value} value={options.value}>
                            {options.value}
                          </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <TextField
                        name="amountAvailablePacks"
                        variant="outlined"
                        fullWidth
                        label="Num"
                        value={state.amountAvailablePacks}
                        onChange={handleNumbers}
                    />
                  </Grid>

                  <Grid item xs={1} sm={1}/>

                  <Grid item xs={8} sm={2}>
                    <TextField
                        name="amountAvailable"
                        variant="outlined"
                        fullWidth
                        label="Amount available"
                        value={state.amountAvailable}
                        onChange={handleNumbers}
                    />
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Unit"
                        value={
                          state.amountAvailablePackType === "PLATE" ? "wells" : "µl"
                        }
                    />
                  </Grid>

                  <Grid item xs={1} sm={1}/>

                  <Grid item xs={8} sm={2}>
                    <TextField
                        name="concentrationOrdered"
                        variant="outlined"
                        fullWidth
                        label="Concentration"
                        value={state.concentrationOrdered}
                        onChange={handleNumbers}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <TextField
                        name="concentrationOrderedUnit"
                        variant="outlined"
                        fullWidth
                        select
                        label="Unit"
                        value={state.concentrationOrderedUnit}
                        onChange={handleChange}
                    >
                      {Constants.concentrationOrderedUnit.map((options) => (
                          <MenuItem key={options.value} value={options.value}>
                            {options.label}
                          </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography variant="h6" gutterBottom>
                      Location of the primer/probe in laboratory
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.freezer}
                        defaultValue={primerData.freezer}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                name="freezer"
                                fullWidth
                                label="Freezer"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.drawer}
                        defaultValue={primerData.drawer}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                name="drawer"
                                fullWidth
                                label="Drawer"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.box}
                        defaultValue={primerData.box}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                name="box"
                                label="Box"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography variant="h6" gutterBottom>
                      Project information
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.project}
                        defaultValue={primerData.project}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                name="project"
                                label="Project"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.primerApplication}
                        defaultValue={primerData.primerApplication}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                name="primerApplication"
                                fullWidth
                                label="Application"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    {/* user is added automatically in backend so no reason to have the field,
                      leaving it for now, if we'll have to add it later */}
                    {/* <TextField
                    variant="outlined"
                    value={foreignTables.currentUser}
                    fullWidth
                    label="User"
                  /> */}
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <TextField
                        name="applicationComment"
                        label="Application comment"
                        multiline
                        fullWidth
                        rows={2}
                        variant="outlined"
                        defaultValue={primerData.applicationComment}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography variant="h6" gutterBottom>
                      Designer information
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="designerName"
                        variant="outlined"
                        fullWidth
                        label="Name & surname"
                        defaultValue={primerData.designerName}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="designerPublication"
                        variant="outlined"
                        fullWidth
                        label="Publication"
                        defaultValue={primerData.designerPublication}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <TextField
                        name="designerPublication"
                        variant="outlined"
                        fullWidth
                        label="Link to database"
                        defaultValue={primerData.designerPublication}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography variant="h6" gutterBottom>
                      Supplier information
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.supplier}
                        defaultValue={primerData.supplier}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="supplier"
                                variant="outlined"
                                fullWidth
                                label="Supplier"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <Autocomplete
                        freeSolo
                        options={foreignTables.manufacturer}
                        defaultValue={primerData.manufacturer}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="manufacturer"
                                variant="outlined"
                                fullWidth
                                label="Manufacturer"
                            />
                        )}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                          name="date"
                          variant="inline"
                          format="dd/MM/yyyy"
                          label="Date of receipt"
                          onChange={setDate}
                          value={date}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <Typography variant="h6" gutterBottom>
                      Additional information
                    </Typography>
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <TextField
                        name="document"
                        label="Documentation"
                        multiline
                        fullWidth
                        rows={2}
                        variant="outlined"
                        defaultValue={primerData.document}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <TextField
                        name="comment"
                        label="Comment"
                        multiline
                        fullWidth
                        rows={2}
                        variant="outlined"
                        defaultValue={primerData.comment}
                    />
                  </Grid>

                  <Grid item xs={xsWidth} sm={smWidth * 3}>
                    <TextField
                        name="analysis"
                        label="Analysis"
                        multiline
                        fullWidth
                        rows={2}
                        variant="outlined"
                        defaultValue={primerData.analysis}
                    />
                  </Grid>
                </Grid>
                <Button
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
        </div>
    );
  }
}
