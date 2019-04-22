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
    [theme.breakpoints.between('xs','sm')]: {
      paddingLeft: '19%',
      paddingTop: '5%',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '5%',
      paddingTop: '3%',
    },
  },
  headerBackground: {
    backgroundColor: 'rgb(220,220,220)',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    [theme.breakpoints.between('xs','sm')]: {
      width: 360,
    },
    [theme.breakpoints.up('sm')]: {
      width: 1175,
    },
  },
  productHeader: {
    fontFamily: 'Avenir',
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'start',
    [theme.breakpoints.between('xs','sm')]: {
      marginLeft: 5,
      fontSize: 26,
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
  middleBackground: {
    backgroundColor: 'rgb(220,220,220)',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: '2%',
    [theme.breakpoints.between('xs','sm')]: {
      width: 360,
    },
    [theme.breakpoints.up('sm')]: {
      width: 1175,
    },
  },
  text: {
    fontFamily: "Avenir",
    overflowWrap: "break-word",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1%',
    [theme.breakpoints.down('sm')]: {
        width: 265,
        fontSize: 16,
        textAlign: 'justify',
    },
    [theme.breakpoints.up('sm')]: {
        height: 'auto',
        width: '89%',
    },
  },
  keyFeaturesLayout: {
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.between('xs','sm')]: {
      paddingLeft: '16%',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '17%',
  },
  },
  keyFeatureCard: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },
  keyFeatureTitle: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 500,
  },
  keyFeatureText: {
    fontFamily: "Avenir",
    overflowWrap: "break-word",
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 1.5,
    marginLeft: '6%',
    marginRight: '6%',
  },
});

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { classes } = this.props;

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
          <Grid item sm={3} >
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
              Menu Item
            </Typography>
          </Grid>
          <Grid item sm={3}>
            {/* <Card elevation={0} className={classes.mobileImageCard} style={{ backgroundImage: "url('../static/images/MobileImages/MobileHome.png')" }} /> */}
            <img src="../static/images/MobileImages/MobileScanner.png" alt="Mobile Scanner" className={classes.mobileImage} />
            <Typography variant="overline" className={classes.mobileCaption}>
              Review Item
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
        <Grid container direction="row" justify="flex-end" alignItems="flex-start">
          <Card elevation={0} className={classes.middleBackground}>
            <Typography className={classes.productHeader}>
                Key Features
            </Typography>
          </Card>
        </Grid>
        <Grid container spacing={40} className={classes.keyFeaturesLayout}>
          <Grid item>
            <Card className={classes.keyFeatureCard}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Typography className={classes.keyFeatureTitle}>
                  Menu Scanner
                </Typography>
                <Typography className={classes.keyFeatureText}>
                  Have a seamless dining experience by scanning a physical menu with your phone's camera and view real-time augmented reality overlays that will indicate which dishes are vegan and which dishes have substitutions that will make them vegan.
                </Typography>
              </Grid>
            </Card>
          </Grid>

          <Grid item>
            <Card className={classes.keyFeatureCard}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Typography className={classes.keyFeatureTitle}>
                  Review Items
                </Typography>
                <Typography className={classes.keyFeatureText}>
                  View Disney World's restaurants and their vegan items online. <br/> Create a free account and rate and review items and view other users' comments. Favorite items to save and see for later and submit feedback to administrators.
                </Typography>
              </Grid>
            </Card>
          </Grid>

          <Grid item>
            <Card className={classes.keyFeatureCard}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Typography className={classes.keyFeatureTitle}>
                  Trip Planner
                </Typography>
                <Typography className={classes.keyFeatureText}>
                  Have a meal planner for your stay at Disney World. Users who have an account can plan trips by assigning different restaurants to different days and meals. 
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {/* <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Card elevation={0} className={classes.headerBackground}>
            <Typography className={classes.productHeader}>
              How It Works
            </Typography>
          </Card>
        </Grid>
        <Typography className={classes.text}>
        Vitae et leo duis ut diam quam nulla porttitor. Viverra justo nec ultrices dui sapien eget mi proin. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Arcu bibendum at varius vel pharetra vel. Mattis nunc sed blandit libero volutpat. Volutpat diam ut venenatis tellus in metus vulputate. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Turpis in eu mi bibendum neque egestas. Duis convallis convallis tellus id interdum velit laoreet id donec. Lectus urna duis convallis convallis. Vel fringilla est ullamcorper eget nulla facilisi. Nec tincidunt praesent semper feugiat. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Et netus et malesuada fames ac turpis egestas. Ut tellus elementum sagittis vitae et leo duis ut.
        </Typography> */}
      </div>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProductPage);