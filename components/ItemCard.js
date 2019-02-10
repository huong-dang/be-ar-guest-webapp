import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';

const styles = {
  card: {
    width: 250,
    height: 250,
    borderRadius: 20
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontWeight: '500',
    lineHeight: 1.2,
    marginTop: 8,
  },
  description: {
    fontSize: 12.5,
    // marginBotton: 10,
    textAlign: 'center',
    lineHeight: 1.4, 
    marginTop: 5,
  },
  favoriteIcon: {
    position: 'absolute',
  }
};

function ItemCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Grid container direction = "row" justify="space-between" alignItems="center">
          <Grid container justify = "center">
            <div>
              <Typography className={classes.title} gutterBottom>
                Plant-Based Loaded Slaw Dog
              </Typography>
            </div>
          </Grid>
          <div>
            <FavoriteIcon className={classes.favoriteIcon} />
          </div>
        </Grid>
        <Typography className={classes.description} color="textSecondary">
          Plant-based sausage topped with pickled slaw, BBQ vegan aioli, & roasted corn relish.
        </Typography>
        <Typography className={classes.description} color="textSecondary">
          <br /> Served with french fries or apple slices.
        </Typography>
        {/* <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">
          <ExpandIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);