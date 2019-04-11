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
import axios from 'axios';

const styles = prop => ({
    restaurantName: {
        fontSize: 'larger'
    },
    tripButton: {
        marginTop: -16,
    },
});

class RestaurantPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:        [],
            restaurantID: props.restaurantID,
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/restaurant/getAllItemsByRestaurantID', {restaurantID: this.state.restaurantID});
            this.setState({
                              items: result.data
                          })
        } catch (e) {
            console.log('Error', e);
        }
    }

    render() {
        const {classes, user} = this.props;
        const itemsInfo = this.state.items.map((menuItem, index) => {
                return (
                    <Grid item xs={12} sm={4} key={menuItem.itemID}>
                        <ItemCard item={menuItem}
                                    user={user}/>
                    </Grid>
                );
            }
        );

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography variant="h4" className={classes.restaurantName}>
                        {this.props.restaurantName}
                    </Typography>
                    <IconButton className={classes.tripButton}>
                            <TripIcon/>
                    </IconButton>
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
    classes:        PropTypes.object.isRequired,
    restaurantName: PropTypes.string.isRequired,
    landID:         PropTypes.number.isRequired,
    restaurantID:   PropTypes.number.isRequired,
    user:           PropTypes.object
};

export default withStyles(styles)(RestaurantPanel);
