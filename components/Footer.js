import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  footer: {
    width: '100%',
    marginRight: 0,
    backgroundColor: 'rgb(220,220,220)',
    // margin: 0,
    [theme.breakpoints.between('xs','sm')]: {
      height: 225,
      marginTop: 30,
      visibility: 'hidden',
    },
    [theme.breakpoints.between('sm','md')]: {
      height: 225,
      marginTop: 155,
    },
    [theme.breakpoints.up('md')]: {
      height: 225,
      marginTop: 155,
    },
  },
  footerGridLayout: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 30,
      marginTop: 50,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 200,
      marginTop: 20,
    },
  },
  descriptionText:  {
    marginLeft: 200,
    marginTop: 10,
    fontFamily: "Avenir",
    fontSize: 16,
    color: 'rgb(57,57,57)',
    lineHeight: 1.2,
    width: 350,
    height: 150,
    position: 'relative',
    overflowWrap: "break-word",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoImage:  { 
    height: "4%",
    [theme.breakpoints.down('sm')]: {
      width: "25%",
    },
    [theme.breakpoints.up('md')]: {
      width: "9%",
    },
  },
  logoText: {
    fontFamily: "Avenir",
    fontSize: 30,
    color: 'rgb(57,57,57)',
    lineHeight: 1,
  },
  footerLinksLayout: {
    marginLeft: "20%",
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: -29,
    },
  },
  buttonText: {
    fontFamily: 'Avenir',
  }
});

function Footer(props) {
  const { classes } = props;
  return (
        <Card className={classes.footer}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.footerGridLayout}>
            <img src="../static/images/logo.png" alt="Logo" className={classes.logoImage}/>
            <Typography className={classes.logoText}>
              be <br />
              AR <br />
              guest <br />
            </Typography>
          </Grid>
          <Typography className={classes.descriptionText}>
            An augmented reality mobile application powered by computer vision that helps vegans find suitable food and drink at Walt Disney World.
            </Typography>
            {/* <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.footerLinksLayout}>
              <Typography style={{
                fontFamily: "Avenir",
                fontSize: 25,
                color: 'rgb(57,57,57)',
                
              }}>
                Links
              </Typography>
              <Button size="small" className={classes.buttonText}>
                Home
              </Button>
              <Button size="small" className={classes.buttonText}>
                Product
              </Button>
              <Button size="small" className={classes.buttonText}>
                Menus
              </Button>
              <Button size="small" className={classes.buttonText}>
                FAQ
              </Button>
            </Grid> */}
          </Grid>
        </Card>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);