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

const styles = prop => ({
    restaurantName: {
        fontSize: 'larger'
    },
    restaurantType: {
        fontSize:   14,
        color:      'grey',
        fontWeight: 400,
        fontStyle:  'italic',
        paddingTop: 8,
    },
    tripButton:     {
        marginTop: -6,
    },
});

class RestaurantPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:          [],
            restaurantID:   props.restaurantID,
            restaurantType: "",
            expandPanel:    false,
            tripClicked:    false
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/restaurant/getAllItemsByRestaurantID', {restaurantID: this.state.restaurantID});
            const type   = await axios.post('/restaurantType/get', {restaurantTypeID: this.props.restaurantTypeID});
            this.setState({
                              items:          result.data,
                              restaurantType: type.data[0].restaurantTypeName,
                          })
        } catch (e) {
            console.log('Error', e);
        }
    }

    handleTrip = (event) => {
        this.setState({tripClicked: !this.state.tripClicked});
        console.log('in handletrip', this.state.tripClicked);
    };

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
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                                <InputWrapper>
                                    <Tooltip title='Add to trip'>
                                        <IconButton className={classes.tripButton}>
                                            <TripIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </InputWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={24}>
                        {itemsInfo}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

RestaurantPanel.propTypes = {
    classes:          PropTypes.object.isRequired,
    restaurantName:   PropTypes.string.isRequired,
    landID:           PropTypes.number.isRequired,
    restaurantID:     PropTypes.number.isRequired,
    restaurantTypeID: PropTypes.number.isRequired,
    user:             PropTypes.object
};

export default withStyles(styles)(RestaurantPanel);
