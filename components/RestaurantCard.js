import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import classNames from 'classnames';

const RESTAURANT_IMAGE = {
    1: "url('../static/images/RestaurantImages/caseys-corner.jpg')",
    2: "url('../static/images/RestaurantImages/pecos-bill.jpg')",
    3: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
    4: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
    5: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
    6: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
    7: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
    8: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
    9: "url('../static/images/RestaurantImages/default-restaurant.jpg')",
}
const styles = prop => ({
    baseCard:         {
        width:        250,
        height:       250,
        borderRadius: 20,
        backgroundSize: 'cover',
        position: 'relative',
        marginLeft: "5%",
    },
    titleCard:      {
        backgroundColor: 'rgb(255,255,255)',
        opacity: 0.95,
        borderRadius: 10,
        position: 'relative',
        marginTop: '40%',
    },
    restaurantName:        {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '500',
        lineHeight: 1.2,
        marginTop:  8,
    },
    landName:   {
        fontSize:   13,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '450',
        lineHeight: 1.2,
        color: 'rgb(112, 128, 144)',
    },
    description:  {
        fontSize:   12.5,
        textAlign:  'center',
        lineHeight: 1.4,
        marginTop:  5,
    },
    BookmarkIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    RestaurantImage: {
        overflow:'hidden',
        backgroundSize: 'cover',
    },
});

function RestaurantCard(props) {
    const {classes} = props;
//, {backgroundImage: `url(${RESTAURANT_IMAGE[props.key]} )`}
    console.log(props);
//className={classes(RESTAURANT_IMAGE[props.key]).baseCard}
    return (
        <Card 
        style={{backgroundImage: RESTAURANT_IMAGE[props.restaurantID],...classes.baseCard}}>
            <CardContent>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs>
                            <Card className={classes.titleCard} >
                                <Typography className={classes.restaurantName} gutterBottom>
                                    {props.restaurantName}
                                </Typography>
                                <Typography className={classes.landName} gutterBottom>
                                    {props.restaurantLand}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item>
                            <BookmarkIcon className={classes.BookmarkIcon}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

RestaurantCard.propTypes = {
    classes: PropTypes.object.isRequired,
    restaurantName: PropTypes.string.isRequired,
    restaurantLand: PropTypes.string.isRequired,
    restaurantID: PropTypes.number.isRequired,
};

export default withStyles(styles)(RestaurantCard);