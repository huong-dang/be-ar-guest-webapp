import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ItemCard from './ItemCard';
import IconButton from '@material-ui/core/IconButton';
import TripIcon from '@material-ui/icons/DateRangeOutlined';
import Tooltip from "@material-ui/core/Tooltip";
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import isNil from 'lodash/isNil';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import errorHandler from '../misc/errors-handler';

const styles = theme => ({
    restaurantName:  {
        fontSize: 'larger'
    },
    restaurantType:  {
        fontSize:   14,
        color:      'grey',
        fontWeight: 400,
        fontStyle:  'italic',
        paddingTop: 8,
    },
    tripButton:      {
        marginTop: -6,
    },
    dialogContainer: {
        [theme.breakpoints.up('xs')]:   {
            padding: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('xs')]: {
            padding: 0
        }
    },
    title:           {
        [theme.breakpoints.down('xs')]:   {
            fontSize: 14
        },
    }
});

const restaurantTemplate = {
    tripID:       null,
    restaurantID: null,
    day:          null,
    mealName:     null
};

const defaultSelectValue  = -123456789;
const defaultSelectedTrip = <MenuItem key={defaultSelectValue} value={defaultSelectValue}>Make a selection</MenuItem>;
const defaultSelectedDay = <MenuItem key={defaultSelectValue} value={defaultSelectValue}>Select a trip first</MenuItem>

class RestaurantPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:          [],
            restaurantName: props.restaurantName,
            restaurantID:   props.restaurantID,
            restaurantType: "",
            addToTrip:      false,
            restaurant:     restaurantTemplate,
            user:           this.props.user,
            myTrips:        [],
            selectedTripID: defaultSelectValue,
            mealName:       null,
            selectedDay:    defaultSelectValue,
            dayOptions:     [],
            saving:         false,
            errorMessage:   '',
            successMessage: ''
        }
    }

    getDayOptions(trips) {
        return trips.map((trip) => {
            const {startDate, endDate} = trip;
            const daysBetween          = moment(endDate).diff(moment(startDate), 'days');
            console.log(daysBetween);
            let options = [];
            for (let i = 0; i <= daysBetween; i++) {
                options.push(moment(startDate).add(i, 'day').format('YYYY-MM-DD'));
            }

            console.log('options', options);

            return options;
        });
    }

    getDayOptionsForTrip(tripID) {
        const index = this.state.myTrips.findIndex((t) => t.tripID === tripID);
        if (index < 0) return defaultSelectedDay;

        const options = this.state.dayOptions[index].map((day) => {
            return (
                <MenuItem key={day} value={day}>
                    {moment(day).format('MM-DD-YYYY')}
                </MenuItem>
            )
        });

        return options;
    }

    async componentDidMount() {
        try {
            const result     = await axios.post('/restaurant/getAllItemsByRestaurantID', {restaurantID: this.state.restaurantID});
            const type       = await axios.post('/restaurantType/get', {restaurantTypeID: this.props.restaurantTypeID});
            const myTrips    = isNil(this.state.user.userID) ? null : await axios.post('/trip/getByUserID', {userID: this.state.user.userID});
            const dayOptions = isNil(myTrips) ? [] : this.getDayOptions(myTrips.data);

            this.setState({
                              items:          result.data,
                              restaurantType: type.data[0].restaurantTypeName,
                              myTrips:        isNil(myTrips) ? [] : myTrips.data,
                              dayOptions:     dayOptions
                          });
        } catch (e) {
            console.log('Error', e);
        }
    }

    handleChange = (prop) => (event) => {
        this.setState({[prop]: event.target.value});
    };

    handleTrip = (event) => {
        this.setState({addToTrip: true});
    };

    handleRestaurantClose = () => {
        this.setState({addToTrip: false, restaurant: restaurantTemplate, errorMessage: '', successMessage: ''});
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

    handleAddRestaurant = async () => {
        try {
            this.setState({saving: true, errorMessage: '', successMessage: ''});

            const result = await
                axios.post('/trip/addRestaurantToTrip', {
                    restaurantID: this.state.restaurantID,
                    tripID:       this.state.selectedTripID,
                    day:          this.state.selectedDay,
                    mealName:     this.state.mealName
                });

            if (result.data.success) {
                this.setState({
                                  saving:         false,
                                  successMessage: 'Successfully added ' + this.state.restaurantName + ' to trip!'
                              });
            } else {
                throw result.data.error;
            }

        } catch (e) {
            this.setState({saving: false, errorMessage: errorHandler.getErrorMessage(e)})
        }
    };

    renderAddRestaurantToTrip() {
        const {myTrips, addToTrip} = this.state;
        if (!addToTrip) {
            return null;
        }

        let tripOptions = myTrips.map((trip) =>
                                          <MenuItem value={trip.tripID} key={trip.tripID}>
                                              {trip.tripName}
                                          </MenuItem>);
        tripOptions.unshift(defaultSelectedTrip);
        const dayOptions = this.getDayOptionsForTrip(this.state.selectedTripID);

        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.addToTrip}
                onClose={this.handleRestaurantClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleRestaurantClose}
                    className={classes.title}
                >
                    Add {this.state.restaurantName} to Trip
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="flex-start" spacing={8}
                          className={classes.dialogContainer}>
                        <Grid item>
                            <InputLabel htmlFor="tripName">Trip Name</InputLabel>
                            <Select
                                value={this.state.selectedTripID}
                                onChange={this.handleChange("selectedTripID")}
                                inputProps={{
                                    name: "tripName",
                                    id:   "tripName",
                                }}
                                fullWidth
                            >
                                {tripOptions}
                            </Select>
                        </Grid>
                        <Grid item>
                            <InputLabel htmlFor="tripDay">Trip Day</InputLabel>
                            <Select
                                value={this.state.selectedDay}
                                onChange={this.handleChange("selectedDay")}
                                inputProps={{
                                    name: "tripDay",
                                    id:   "tripDay",
                                }}
                                fullWidth
                                disabled={this.state.selectedTripID === defaultSelectValue || isNil(this.state.selectedTripID)}
                            >
                                {this.state.selectedTripID === defaultSelectValue || isNil(this.state.selectedTripID) ?
                                    null : dayOptions}
                            </Select>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="mealName"
                                type="text"
                                label="Meal Name"
                                placeholder="Enter meal name"
                                onChange={this.handleChange("mealName")}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            {this.renderErrorMessage()}
                            {this.renderSuccessMessage()}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions disableActionSpacing>
                    <Button
                        onClick={this.handleAddRestaurant}
                        color="primary"
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <CircularProgress size={16}/>
                        ) : (
                            "Save"
                        )}
                    </Button>
                    <Button
                        onClick={this.handleRestaurantClose}
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
        const {classes, user} = this.props;
        const itemsInfo       = this.state.items.map((menuItem, index) => {
                                                         return (
                                                             <Grid item xs={12} sm={4} key={menuItem.itemID}>
                                                                 <ItemCard item={menuItem}
                                                                           user={user}/>
                                                             </Grid>
                                                         );
                                                     }
        );

        const stopPropagation = (e) => e.stopPropagation();
        const InputWrapper    = ({children}) =>
            <div onClick={stopPropagation}>
                {children}
            </div>;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h4" className={classes.restaurantName}>
                                {this.props.restaurantName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                <Typography className={classes.restaurantType}>
                                    {this.state.restaurantType}
                                </Typography>
                                {
                                    isNil(user) ? null :
                                        <InputWrapper>
                                            <Tooltip title='Add to trip'>
                                                <IconButton className={classes.tripButton} onClick={this.handleTrip}>
                                                    <TripIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </InputWrapper>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={24}>
                        {itemsInfo}
                    </Grid>
                </ExpansionPanelDetails>
                {this.renderAddRestaurantToTrip()}
            </ExpansionPanel>
        );
    }
}

const DialogTitle = withStyles(theme => ({
    root:        {
        margin:  0,
        padding: theme.spacing.unit * 2
    },
    closeButton: {
        position: "absolute",
        right:    theme.spacing.unit,
        top:      theme.spacing.unit,
        color:    theme.palette.grey[500]
    }
}))(props => {
    const {children, classes, onClose} = props;
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
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

RestaurantPanel.propTypes = {
    classes:          PropTypes.object.isRequired,
    restaurantName:   PropTypes.string.isRequired,
    landID:           PropTypes.number.isRequired,
    restaurantID:     PropTypes.number.isRequired,
    restaurantTypeID: PropTypes.number.isRequired,
    user:             PropTypes.object
};

export default withStyles(styles)(RestaurantPanel);
