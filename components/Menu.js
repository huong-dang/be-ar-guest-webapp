import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
  
  function Menu(props) {
    const { classes } = props;
    return (
      <div>
        <Button size="small" className={classes.button}>
          Home
        </Button>
        <Button size="small" className={classes.button}>
          Product
        </Button>
        <Button size="small" className={classes.button}>
          Menus
        </Button>
        <Button size="small" className={classes.button}>
          FAQ
        </Button>
      </div>
    );
  }
  
  Menu.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Menu);
  