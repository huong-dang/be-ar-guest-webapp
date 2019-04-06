import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantPanel from '../components/RestaurantPanel';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ItemCard from './ItemCard';
import axios from 'axios';

const styles = prop => ({
    restaurantName: {
        fontSize: 'larger'
    },
});

class LandListItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        restaurants: [],
        // restaurantID: props.restaurantID,
      }
    }
    
    handleContentChange = prop => event => {
        this.setState({tab: prop});
    };

    renderDividerContent() {
        switch (this.state.tab) {
            case "LANDS":
                return this.renderLands();
            case "RESTAURANTS":
                return this.renderRestaurants();
            default:
                return this.renderLands();
        }
    }

    async componentDidMount() {
      try {
          const result = await axios.post('/land/getRestaurantsByLand', { landID: this.props.landID });
          this.setState({
              restaurants: result.data
          })
      } catch (e) {
          console.log('Error', e);
      }
    }

    renderLands() {
      const {classes} = this.props;
      return (
        <ListItem button onClick={this.handleContentChange("RESTAURANTS")}>
            <ListItemText primary={this.props.landName} />
        </ListItem>
      );
    }

    renderRestaurants() {
        const {classes} = this.props;
        // console.log(restaurantsInfo);
        const restaurantsInfo = this.state.restaurants.map((restaurant, index) =>
        {
            return (
                <div key={restaurant.restaurantID}>
                    <RestaurantPanel restaurantID={restaurant.restaurantID}
                                     restaurantName={restaurant.restaurantName}
                                     restaurantLand={restaurant.landName} />
                </div>
            )
        })
        return (
            <div>
                {restaurantsInfo}
            </div>
        );
    }

    render () {
    const { classes } = this.props;

    return (
        // <ListItem button onClick={this.handleContentChange("RESTAURANTS")}>
        <div>
            {this.renderDividerContent()}
        </div>
    );
    }
}

LandListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    landName: PropTypes.string.isRequired,
    parkID: PropTypes.number.isRequired,
    landID: PropTypes.number.isRequired,
}

export default withStyles(styles)(LandListItem);