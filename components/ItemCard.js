import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FavoriteIconEmpty from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIconFilled from '@material-ui/icons/Favorite';
import axios from 'axios';
import isNil from 'lodash/isNil';
import Router from 'next/router';
import TripIcon from '@material-ui/icons/DateRangeOutlined';
import FlagIcon from '@material-ui/icons/OutlinedFlag';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ItemReview from './ItemReview';

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
        fontFamily: 'Avenir',
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
    // Dialog Styles
    dialogItemTitle:        {
        fontSize:                                16,
        fontWeight:                              '400',
        lineHeight:                              1.2,
        textAlign:                               'left',
        fontFamily:                              'Avenir',
        textTransform:                           'uppercase',
        [theme.breakpoints.between('xs', 'md')]: {
            paddingTop: 20,
        },
    },
    dialogFavoriteButton:   {
        position: 'absolute',
        right:    15,
        marginTop: -32,
    },
    addToTripButton:        {
        position: 'absolute',
        // top: 15,
        right:    45,
    },
    flagButton:             {
        position: 'absolute',
        // top: 15,
        right:    50,
    },
    dialogDescription:      {
        fontSize:   12.5,
        fontFamily: 'Avenir',
        textAlign:  'center',
        lineHeight: 1.4,
    },
    commentsSection:        {
        outlineStyle: 'solid',
        outlineWidth: 'thin',
        borderRadius: 20,
    },
});

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:       props.user,
            item:       props.item,
            isFavorite: false,
            open:       false,
            reviews: [],
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

    async getItemReviews() {
        try {
            const result = await axios.post('/review/getAllByItemID', {itemID: this.props.item.itemID});
            console.log(result.data);
            this.setState({reviews: result.data});
        } catch (e) {
            console.log('Error', e);
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

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes}                                 = this.props;
        const {itemName, itemDescription, substitution} = this.props.item;
        return (
            <div>
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
                        <Button 
                            variant="outlined" 
                            className={classes.expandButton} 
                            onClick={() => {
                                this.handleOpen();
                                this.getItemReviews();
                            }}
                        >
                            <Typography className={classes.expandButtonText}>View More</Typography>
                        </Button>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle className={classes.dialogItemTitle}>
                        {itemName}
                        {/* <IconButton className={classes.dialogFavoriteButton}>
                            <FavoriteIconEmpty/>
                        </IconButton> */}
                        <div className={classes.dialogFavoriteButton}>
                        {this.renderFavoriteButton()}
                        </div>
                        <IconButton className={classes.flagButton}>
                            <FlagIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={24}>
                            <Grid item xs={12} md={6}>
                                <DialogContent className={classes.dialogDescription}>
                                    <Typography variant="overline">Description: <br/></Typography>
                                    {itemDescription}
                                    <br/>
                                    <Typography variant="overline"
                                                style={{paddingTop: 5,}}>Alterations: <br/></Typography>
                                    {substitution}
                                </DialogContent>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DialogContent style={{overflowY: 'auto'}}>
                                    {this.state.reviews.map((review, index) => {
                                        return (
                                            <ItemReview
                                                key={index}
                                                userID={review.userID}
                                                itemID={review.itemID}
                                                comment={review.comment}
                                                rating={review.rating}
                                            />
                                        )
                                    })}
                                </DialogContent>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

ItemCard.propTypes = {
    classes: PropTypes.object.isRequired,
    user:    PropTypes.object,
    item:    PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
