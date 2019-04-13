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
import FlagIcon from '@material-ui/icons/OutlinedFlag';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ItemReview from './ItemReview';
import StarRatingComponent from 'react-star-rating-component';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
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
    starRating: {
        right: 100,
        marginTop: -40,
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
    writeReviewButton: {
        top: 12,
        height: 30,
    },
    reviewTextField: {
        top: 5,
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
            canWriteReview: false,
            showReviewTextField: false,
            reviewRating: 0,
            newReview: '',
            averageReview: 0,
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

                // For writing reviews in dialog
                // const [userReview] = result.data;
                // console.log('result is =>', result);
                // console.log('userReview', userReview);
                if(review.length === 0) {
                    this.setState({ canWriteReview: true });
                } else {
                    this.setState({ canWriteReview: false });
                }
            } 
        } catch (e) {
            console.log('Error:', e);
        }
    }

    async getItemReviews() {
        try {
            const result = await axios.post('/review/getAllByItemID', {itemID: this.props.item.itemID});
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
                    itemID:   item.itemID,
                    userID:   user.userID,
                    favorite: !this.state.isFavorite
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

    // For Dialog rendering
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    calculateAverageRating() {
        var average = 0;
        for (var i = 0; i < this.state.reviews.length; i++) {
            average = average + this.state.reviews[i].rating;
        }
        average = average / this.state.reviews.length;
        this.setState({ averageReview: average });
        console.log('Average Rating for item => ', this.state.averageReview);
    }

    setReviewTextField(value) {
        this.setState({ showReviewTextField: value });
    }
    
    onStarClick(nextValue,prevValue, name) {
        console.log('onStarClick called');
        this.setState({ reviewRating: nextValue });
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
    };

    handleSubmit = async () => {
        try {
            const {user, item, newReview, reviewRating} = this.state;
            if (reviewRating === 0) {
                console.log('Must rate item.');
            } else {
                const reviewSubmitted = await axios.post('/review/add', {
                    userID: user.userID,
                    itemID: item.itemID,
                    comment: newReview,
                    rating: reviewRating,
                });
                this.setState({ canWriteReview: false });
                console.log('New Review =>', newReview);
                console.log('Review Rating =>', reviewRating);
            }   
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    renderWriteReviewArea() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container direction="column" justify="flex-start" alignItems="center">
                    <Typography variant="overline">
                        Write a Review
                    </Typography>
                    <StarRatingComponent 
                        name="ratingInput"
                        starCount={5}
                        editing={true}
                        value={this.state.reviewRating}
                        starColor={'#C9BEDE'}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                    <form>
                        <FormControl required>
                            <TextField
                                id="newReview"
                                variant="outlined"
                                required
                                multiline
                                className={classes.reviewTextField}
                                autoFocus={false}
                                value={this.state.newReview}
                                onChange={this.handleChange('newReview')}
                            />
                        </FormControl>
                    </form>
                    <Button 
                        variant="outlined" 
                        className={classes.writeReviewButton} 
                        onClick={this.handleSubmit}
                    >
                        <Typography 
                            variant="overline" 
                            style={{
                                textAlign: 'center', 
                                marginTop: -5,
                            }}
                        >
                            Enter
                        </Typography>
                    </Button>  
                </Grid>
            </div>
        );
    }

    render() {
        const {classes}                                 = this.props;
        const {itemName, itemDescription, substitution} = this.props.item;
        // this.calculateAverageRating().bind(this);
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
                    <StarRatingComponent
                        name="itemAverageReview"
                        editing={false}
                        starCount={5}
                        value={this.state.averageReview}
                        starColor={'#C9BEDE'}
                        className={classes.starRating}
                    />
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
                                    {this.state.canWriteReview ? this.renderWriteReviewArea() : <div></div> }
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
