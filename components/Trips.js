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
import moment from "moment";
import assign from "lodash/assign";
import TextField from "@material-ui/core/TextField";

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

const defaultStartDate = moment().format("YYYY-MM-DD");
const defaultEndDate = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            newTrip: tripTemplate,
            addNewTrip: true,
            saving: false
        };
    }

    handleTripClose = () => {
        this.setState({ addNewTrip: false });
    };

    handleChange = prop => event => {
        const oldTrip = this.state.newTrip;
        this.setState({
            newTrip: assign({}, oldTrip, { [prop]: event.target.value })
        });
    };

    handleTripSave = () => {
        try {
            this.setState({ saving: true });
            const result = axios.post("/trips/add", {
                newTrip: this.state.newTrip
            });
            this.setState({ saving: false });
        } catch (e) {
            console.log("Error:", e);
        }
    };

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
                        type="date"
                        defaultValue={defaultStartDate}
                        className={classes.textField}
                        onChange={this.handleChange("startDate")}
                        fullWidth
                    />
                    <TextField
                        id="endDate"
                        label="End Date"
                        type="date"
                        defaultValue={defaultEndDate}
                        className={classes.textField}
                        fullWidth
                        onChange={this.handleChange("endDate")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClose={this.handleTripSave}
                        color="primary"
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <CircularProgress size={24} />
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

    render() {
        const { classes } = this.props;
        console.log(this.state.newTrip);
        return (
            <Paper className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
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
