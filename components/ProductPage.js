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
  gridLayout: {
    paddingLeft: '5%',
    paddingTop: '3%',
  },
  headerBackground: {
    backgroundColor: 'rgb(220,220,220)',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    [theme.breakpoints.between('xs','sm')]: {
      width: 360,
    },
    [theme.breakpoints.up('sm')]: {
      width: 900,
    },
  },
  productHeader: {
    fontFamily: 'Avenir',
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'start',
    [theme.breakpoints.between('xs','sm')]: {
      marginLeft: 5,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 150,
    },
  },
  mobileImage: {
    width: 230,
  },
  mobileCaption: {
    width: 230,
    textAlign: 'center',
  },
});

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const maxSteps = mobileImages.length;

    return (
      <div style={{width: '100%', height: 'auto',}}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Card elevation={0} className={classes.headerBackground}>
            <Typography className={classes.productHeader}>
              the be AR guest mobile app
            </Typography>
          </Card>
        </Grid>
        <div style={{marginLeft: 'auto', marginRight: 'auto',}}>
        <Grid container spacing={0} className={classes.gridLayout}>
          <Grid item sm={3}>
            {/* <Card elevation={0} className={classes.mobileImageCard} style={{ backgroundImage: "url('../static/images/MobileImages/MobileHome.png')" }} /> */}
            <img src="../static/images/MobileImages/MobileHome.png" alt="Mobile Home" className={classes.mobileImage} />
            <Typography variant="overline" className={classes.mobileCaption}>
              Home
            </Typography>
          </Grid>
          <Grid item sm={3}>
            {/* <Card elevation={0} className={classes.mobileImageCard} style={{ backgroundImage: "url('../static/images/MobileImages/MobileHome.png')" }} /> */}
            <img src="../static/images/MobileImages/MobileMenu.png" alt="Mobile Menu" className={classes.mobileImage} />
            <Typography variant="overline" className={classes.mobileCaption}>
              Browsing Parks
            </Typography>
          </Grid>
          <Grid item sm={3}>
            {/* <Card elevation={0} className={classes.mobileImageCard} style={{ backgroundImage: "url('../static/images/MobileImages/MobileHome.png')" }} /> */}
            <img src="../static/images/MobileImages/MobileScanner.png" alt="Mobile Scanner" className={classes.mobileImage} />
            <Typography variant="overline" className={classes.mobileCaption}>
              Menu Scanner
            </Typography>
          </Grid>
          <Grid item>
            {/* <Card elevation={0} className={classes.mobileImageCard} style={{ backgroundImage: "url('../static/images/MobileImages/MobileHome.png')" }} /> */}
            <img src="../static/images/MobileImages/MobileTrip.png" alt="Mobile Trip Planner" className={classes.mobileImage} />
            <Typography variant="overline" className={classes.mobileCaption}>
              Trip Planner
            </Typography>
          </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProductPage);