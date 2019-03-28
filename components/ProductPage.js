import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RestaurantPanel from '../components/RestaurantPanel';

const mobileImages = [
    {
        label: 'Home Page',
        imgPath: "url('../static/images/MobileImages/MobileHome.png')",
    },
    {
        label: 'Menu Item',
        imgPath: "url('../static/images/MobileImages/MobileMenu.png')",
    },
    {
        label: 'AR Scanner',
        imgPath: "url('../static/images/MobileImages/MobileScanner.png')",
    },
    {
        label: 'Trip Planner',
        imgPath: "url('../static/images/MobileImages/MobileTrip.png')",
    },
];

const styles = theme => ({
  productHeader: {
    fontFamily: 'Avenir',
    fontSize: '30',
    fontWeight: '300',
  },
});

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Card>
          <Typography className={classes.productHeader}>
            the be AR guest mobile app
          </Typography>
        </Card>
      </div>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProductPage);