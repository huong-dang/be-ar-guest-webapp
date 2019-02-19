import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const styles = {
    cardOne:         {
        width:        300,
        height:       150,
        borderRadius: 0,
        backgroundImage: "url('../static/images/HomePageImages/coconut-milk-panna-cotta.jpg')",
        backgroundSize: 'cover',
        position: 'relative',
    },
    cardTwo:          {
        width:        300,
        height:       150,
        backgroundImage: "url('../static/images/HomePageImages/maize-crusted-tofu.jpg')",
        backgroundSize: 'cover',
        position: 'relative',
    },
    cardThree:          {
        width:        300,
        height:       150,
        backgroundImage: "url('../static/images/HomePageImages/vegan-bread.jpg')",
        backgroundSize: 'cover',
        position: 'relative',
    },
    cardFour:          {
        width:        300,
        height:       150,
        backgroundImage: "url('../static/images/HomePageImages/seared-tofu.jpg')",
        backgroundSize: 'cover',
        position: 'relative',
    },
    cardFive:          {
        width:        300,
        height:       150,
        backgroundImage: "url('../static/images/HomePageImages/grilled-seitan.jpg')",
        backgroundSize: 'cover',
        position: 'relative',
    },
};

function HomeImageList(props) {
    const {classes} = props;

    return (
        <Grid container direction="row" justify="space-between" alignItems="center" style={{overflow: 'hidden'}}>
            <Card
                className={classes.cardOne}
            />
            <Card 
                className={classes.cardTwo}
            />
            <Card 
                className={classes.cardThree}
            />
            <Card 
                className={classes.cardFour}
            />
            {/* <Card 
                className={classes.cardFive}
            /> */}
        </Grid>
    );
}

HomeImageList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeImageList);