import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
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
    imageOuterContainer: {
        height: 150,
        width: "screen.width",
        [theme.breakpoints.down('sm')]: {
            // overflow: 'scroll',
            // width: screen.width,
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            overflow: 'hidden',
            marginBottom: 30,
        },
    },
    imageInnerContainer:    {
        [theme.breakpoints.down('sm')]: {
            width: "200%",
        },
        [theme.breakpoints.down('md')]: {
            width: "screen.width",
        },
    }
});

function HomeImageList(props) {
    const {classes} = props;

    return (
        <div className={classes.imageOuterContainer}>
            <Grid 
                container direction="row" 
                justify="space-between" 
                alignItems="center" 
                className={classes.imageInnerContainer}
            >
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
        </div>
    );
}

HomeImageList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeImageList);