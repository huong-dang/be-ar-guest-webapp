import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
  footer: {
    width: '100%',
    backgroundColor: 'rgb(220,220,220)',
    // margin: 0,
    height: 275,
  },
  buttonText: {
    fontFamily: 'Avenir',
  }
};

function Footer(props) {
  const { classes } = props;
  return (
        <Card className={classes.footer}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid container direction="row" justify="flex-start" alignItems="center"
            style={{
              marginLeft: 200, 
              marginTop: 40,
            }}>
            <img src="../static/images/logo.png" alt="Logo"
              style={{
                width: "9%", 
                height: "4%",
              }}/>
            <Typography
            style={{
              // marginLeft: 200,
              // marginTop: 40,
              fontFamily: "Avenir",
              fontSize: 30,
              color: 'rgb(57,57,57)',
              lineHeight: 1,
            }}>
              be <br />
              AR <br />
              guest <br />
            </Typography>
            </Grid>
            <Typography
            style={{
              marginLeft: 200,
              marginTop: 10,
              fontFamily: "Avenir",
              fontSize: 16,
              color: 'rgb(57,57,57)',
              lineHeight: 1.2,
              width: 350,
              height: 150,
              overflowWrap: "break-word",
            }}>
            An augmented reality mobile application powered by computer vision that helps vegans find suitable food and drink at Walt Disney World.
            </Typography>
            <Grid container direction="column" justify="flex-start" alignItems="center"
            style={{
              position: "absolute",
              marginTop: -29,
              marginLeft: "20%",
            }}>
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
            </Grid>
          </Grid>
        </Card>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);