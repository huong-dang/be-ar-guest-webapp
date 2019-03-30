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
import axios from 'axios';

const styles = prop => ({
    restaurantName: {
        fontSize: 'larger'
    },
});

class RestaurantPanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        restaurantID: props.restaurantID,
      }
    }

    async componentDidMount() {
      try {
          const result = await axios.post('/restaurant/getAllItemsByRestaurantID', { restaurantID: this.state.restaurantID });
          this.setState({
              items: result.data
          })
      } catch (e) {
          console.log('Error', e);
      }
  }

  render () {
    const { classes } = this.props;
    const itemsInfo = this.state.items.map((item, index) =>
      {
        return <Grid item xs={12} sm={4} key={item.itemID}>
                  <ItemCard itemName={item.itemName}
                            itemDescription={item.itemDescription}
                            substitution={item.substitution} />
                </Grid>;
      }
    )

    return (
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4" className={classes.restaurantName}>
            {this.props.restaurantName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            {/* <Grid item xs={12} sm={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ItemCard />
            </Grid> */}
            {itemsInfo}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
    }
}

RestaurantPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    restaurantName: PropTypes.string.isRequired,
    restaurantLand: PropTypes.string.isRequired,
    restaurantID: PropTypes.number.isRequired,
}

export default withStyles(styles)(RestaurantPanel);