import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';

const styles = {
  footer: {
    minHeight: 200,
    width: '100%',
    backgroundColor: 'rgb(192,192,192)',
    margin: 0,
  },
};

function Footer(props) {
  const { classes } = props;
  return (
        // <BottomNavigation className={classes.footer}>
        <Card className={classes.footer}>
          <Typography>
            Footer
          </Typography>
        </Card>
        // </BottomNavigation>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);