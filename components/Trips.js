import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import assign from "lodash/assign";
import TextField from "@material-ui/core/TextField";
import moment from 'moment';
import axios from 'axios';
import errorHandler from '../misc/errors-handler';
import Loading from './Loading';
import MyTrips from './MyTrips';
import RefreshIcon from '@material-ui/icons/RefreshRounded'


const styles = theme => ({
    root: {
        width: "80%",
        height: "auto",
        padding: theme.spacing.unit * 3
    },
    header: {
        fontSize: 25,
        fontFamily: "Avenir",
        fontWeight: 400,
        textAlign: "center",
        marginTop: "2%"
    },
    textField: {
        marginBottom: theme.spacing.unit
    }
});

const tripTemplate = {
    userID: null,
    startDate: null,
    endDate: null,
    tripName: null
};

const defaultStartDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm");
const defaultEndDate   = moment().endOf('day').format("YYYY-MM-DDTHH:mm");

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:         props.user,
            newTrip:      this.initializeNewTrip(props),
            addNewTrip:   false,
            saving:       false,
            errorMessage: '',
            myTrips:      [],
            loading:      true
        };
    }

    async componentDidMount() {
        try {
            const myTrips = await axios.post('/trip/getByUserID', {userID: this.state.user.userID});
            this.setState({myTrips: myTrips.data, loading: false});
        } catch (e) {
            console.log(e);
            this.setState({loading: false});
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refresh && this.state.refresh !== prevState.refresh) {
            try {
                this.setState({loading: true});
                const myTrips = await axios.post('/trip/getByUserID', {userID: this.state.user.userID});
                this.setState({myTrips: myTrips.data, loading: false, refresh: false});
            } catch (e) {
                console.log(e);
                this.setState({loading: false});
            }
        }
    }

    initializeNewTrip(props) {
        return assign({},
                      tripTemplate,
                      {
                          userID:    props.user.userID,
                          startDate: defaultStartDate,
                          endDate:   defaultEndDate
                      });
    }

    handleTripClose = () => {
        this.setState({ addNewTrip: false, errorMessage: '', successMessage: ''});
    };

    handleChange = prop => event => {
        const oldTrip = this.state.newTrip;
        this.setState({
            newTrip: assign({}, oldTrip, { [prop]: event.target.value })
        });
    };

    datesAreValid(startDate, endDate) {
        return moment(startDate).isBefore(moment(endDate));
    }

    handleTripSave = async () => {
        try {
            this.setState({saving: true, errorMessage: '', successMessage: ''});
            if (!this.datesAreValid(this.state.newTrip.startDate, this.state.newTrip.endDate)) {
                throw new Error('Start date must come before end date.');
            }
            const result = await axios.post("/trip/add", {
                ...this.state.newTrip
            });

            if (result.data.success) {
                this.setState({saving: false, successMessage: 'Trip successfully created!'});
            } else {
                throw result.data.error;
            }
        } catch (e) {
            this.setState({saving: false, errorMessage: errorHandler.getErrorMessage(e)});
        }
    };

    renderErrorMessage() {
        if (this.state.errorMessage && this.state.errorMessage.length > 0) {
            return (
                <Typography style={{color: 'red'}}>
                    {this.state.errorMessage}
                </Typography>
            )
        } else {
            return null;
        }
    }

    renderSuccessMessage() {
        if (this.state.successMessage && this.state.successMessage.length > 0) {
            return (
                <Typography style={{color: 'green'}}>
                    {this.state.successMessage}
                </Typography>
            )
        } else {
            return null;
        }
    }

    renderAddNewTrip() {
        if (!this.state.addNewTrip) {
            return null;
        }

        const { classes } = this.props;
        return (
            <Dialog
                open={this.state.addNewTrip}
                onClose={this.handleTripClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleTripClose}
                >
                    Add New Trip
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="tripName"
                        type="text"
                        label="Name"
                        placeholder="Enter trip name"
                        onChange={this.handleChange("tripName")}
                        className={classes.textField}
                        fullWidth
                    />
                    <TextField
                        id="startDate"
                        label="Start Date"
                        type="datetime-local"
                        defaultValue={defaultStartDate}
                        className={classes.textField}
                        onChange={this.handleChange("startDate")}
                        fullWidth
                    />
                    <TextField
                        id="endDate"
                        label="End Date"
                        type="datetime-local"
                        defaultValue={defaultEndDate}
                        className={classes.textField}
                        fullWidth
                        onChange={this.handleChange("endDate")}
                    />
                    <div style={{height: '20px', marginTop: '10px'}}>
                        {this.renderErrorMessage()}
                        {this.renderSuccessMessage()}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleTripSave}
                        color="primary"
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <CircularProgress size={16} />
                        ) : (
                            "Save"
                        )}
                    </Button>
                    <Button
                        onClick={this.handleTripClose}
                        color="secondary"
                        disabled={this.state.saving}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderMyTrips() {
        return (
            <MyTrips user={this.state.user} trips={this.state.myTrips} />
        )
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return <Loading/>
        }

        return (
            <Paper className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={16}
                >
                    <Grid item>
                        <Tooltip title={"Refresh trips"}>
                            <IconButton
                                onClick={() =>
                                    this.setState({refresh: true})
                                }
                            >
                                <RefreshIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title={"New trip"}>
                            <IconButton
                                style={{
                                    backgroundColor: "#C9BEDE",
                                    color: "#fff"
                                }}
                                onClick={() =>
                                    this.setState({ addNewTrip: true })
                                }
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography className={classes.header} gutterBottom>
                            My Trips
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle" />
                <div style={{height: '20px'}}/>
                {this.renderMyTrips()}
                {this.renderAddNewTrip()}
            </Paper>
        );
    }
}

const DialogTitle = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500]
    }
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" align="center">
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="Close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

Trips.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Trips);
