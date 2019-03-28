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

function RestaurantPanel(props) {
    const {classes} = props;
    return (
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4" className={classes.restaurantName}>
            {props.restaurantName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
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
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
}

RestaurantPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    restaurantName: PropTypes.string.isRequired,
    restaurantLand: PropTypes.string.isRequired,
    restaurantID: PropTypes.number.isRequired,
}

export default withStyles(styles)(RestaurantPanel);