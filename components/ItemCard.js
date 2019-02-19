import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';

const styles = {
    card:         {
        width:        250,
        height:       250,
        borderRadius: 20,
        position: 'relative'
    },
    title:        {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '500',
        lineHeight: 1.2,
        marginTop:  8,
    },
    description:  {
        fontSize:   12.5,
        // marginBotton: 10,
        textAlign:  'center',
        lineHeight: 1.4,
        marginTop:  5,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    }
};

function ItemCard(props) {
    const {classes} = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs>
                            <Typography className={classes.title} gutterBottom>
                                Slaw Dog
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FavoriteIcon className={classes.favoriteIcon}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography className={classes.description} color="textSecondary">
                    Plant-based sausage topped with pickled slaw, BBQ vegan aioli, & roasted corn relish.
                </Typography>
                <Typography className={classes.description} color="textSecondary">
                    Served with french fries or apple slices.
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
