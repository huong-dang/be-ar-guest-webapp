import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FavoriteIconEmpty from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIconFilled from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import isNil from 'lodash/isNil';
import Router from 'next/router';

const styles = theme => ({
    card:                   {
        width:        250,
        height:       250,
        borderRadius: 20,
        position:     'relative'
    },
    title:                  {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '500',
        lineHeight: 1.2,
        marginTop:  8,
    },
    description:            {
        fontSize:   12.5,
        textAlign:  'center',
        lineHeight: 1.4,
        marginTop:  5,
    },
    alterations:            {
        fontSize:   12.5,
        textAlign:  'left',
        lineHeight: 1.4,
        marginTop:  5,
        marginLeft: 13,
        fontWeight: 500,
    },
    alterationsDescription: {
        fontSize:   12.5,
        lineHeight: 1.4,
        marginTop:  5,
        marginLeft: 3,
    },
    favoriteIcon:           {
        position: 'absolute',
        top:      15,
        right:    15
    },
    expandButton:           {
        borderRadius: 10,
        position:     'absolute',
        marginTop:    25,
        marginLeft:   55,
    },
    expandButtonText:       {
        fontFamily: 'Avenir',
        fontSize:   12.5,
    },
    margin:                 {
        margin: 0
    },
});

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:       props.user,
            item:       props.item,
            isFavorite: false
        }
    }

    async componentDidMount() {
        try {
            const {user, item} = this.state;
            // Load the user's favorite icons for this item if the user is logged in
            if (!isNil(user)) {
                const result = await axios.post('/review/get', {
                    itemID: item.itemID,
                    userID: user.userID,
                });

                const review = result.data;
                this.setState({isFavorite: review && review.length === 1 && review[0].isFavorite});
            }
        } catch (e) {
            console.log('Error:', e);
        }
    }

    handleFavorite = async () => {
        try {
            const {user, item} = this.state;
            // Load the user's favorite icons for this item if the user is logged in
            if (!isNil(user)) {
                const favorited = await axios.post('/review/favorite', {
                    itemID: item.itemID,
                    userID: user.userID,
                });

                if (favorited.data.success) {
                    // Update the favorite button
                    const newReview = await axios.post('/review/get', {
                        itemID: item.itemID,
                        userID: user.userID,
                    });

                    const review = newReview.data;
                    this.setState({isFavorite: review && review.length === 1 && review[0].isFavorite});
                } else {
                    throw Error('Unable to favorite item' + favorited.data.error);
                }
            } else {
                Router.push('/signIn');
            }
        } catch (e) {
            console.log('Error:', e);
        }
    };

    renderFavoriteButton() {
        const {classes} = this.props;
        return (
            <IconButton aria-label="Favorite" className={classes.margin} onClick={this.handleFavorite}>
                {this.state.isFavorite ? <FavoriteIconFilled style={{color: "#C9BEDE"}}/> : <FavoriteIconEmpty/>}
            </IconButton>
        );
    }

    render() {
        const {classes}                                 = this.props;
        const {itemName, itemDescription, substitution} = this.props.item;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs>
                                <Typography className={classes.title}>
                                    {itemName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {this.renderFavoriteButton()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography className={classes.description} color="textSecondary">
                        {itemDescription}
                    </Typography>
                    <Divider variant="middle" style={{marginTop: 8}}/>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Typography className={classes.alterations} color="textSecondary">
                            Alterations:
                        </Typography>
                        <Typography className={classes.alterationsDescription} color="textSecondary">
                            {substitution}
                        </Typography>
                    </Grid>
                    <Button variant="outlined" className={classes.expandButton}>
                        <Typography className={classes.expandButtonText}>View More</Typography>
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

ItemCard.propTypes = {
    classes: PropTypes.object.isRequired,
    user:    PropTypes.object,
    item:    PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
