import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIconEmpty from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIconFilled from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const styles = theme => ({
    h1:                  {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '500',
        lineHeight: 1.2,
        marginTop:  10,
        marginLeft: 8,
        marginRight: 8,
    },
    h2: {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '400',
        lineHeight: 1.2,
        marginTop:  5,
    },
    favoriteButton: {
        [theme.breakpoints.between('xs', 'sm')]: {
            marginLeft: 102,
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 125,
        },
    },
});

class FavoriteItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:       props.user,
            item:       props.item,
            isFavorite: true,
        }
    }

    unFavorite = async () => {
        try {
            const {user, item} = this.state;
            this.setState({ isFavorite: false });

            console.log("Value of item =>", item.itemName);
            console.log("Value of this.state.isFavorite =>", this.state.isFavorite);
            // Update database
            const favorited = await axios.post('/review/favorite', {
                itemID:   item.itemID,
                userID:   user.userID,
                favorite: false,
            });
        } catch (e) {
            console.log('Error:', e);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card>
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <Typography className={classes.h1}>
                            {this.state.item.itemName}
                        </Typography>
                        <Typography className={classes.h2}>
                            {this.state.item.restaurantName}
                        </Typography>
                    </Grid>
                    <IconButton className={classes.favoriteButton} onClick={this.unFavorite}>
                        {this.state.isFavorite ? <FavoriteIconFilled style={{color: "#C9BEDE"}}/> : <FavoriteIconEmpty/>}
                    </IconButton>
                </Card>
            </div>
        );
    }
}

FavoriteItem.propTypes = {
    classes: PropTypes.object.isRequired,
    user:    PropTypes.object,
    item:    PropTypes.object.isRequired,
};

export default withStyles(styles)(FavoriteItem);