import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

const styles = theme => ({
    comment: {
        fontSize:   12.5,
        fontFamily: 'Avenir',
        textAlign:  'center',
        lineHeight: 1.4,
    },
});

class ItemComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            rating: '0',
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/profile/getProfileById', {uid: this.props.userID});
            const [profile] = result.data;
            this.setState({ firstName: profile.fName })
        } catch (e) {
            console.log('Error', e);
        }
    }

    render() {
        const { classes, itemID, userID, comment, rating} = this.props;

        return (
            <Card elevation={0}>
                <Grid container direction="column" justify="flex-start">
                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Typography variant="overline">
                            {this.state.firstName}
                        </Typography>
                        <StarRatingComponent 
                            name="userRating"
                            starCount={5}
                            value={rating}
                            starColor={'#C9BEDE'}
                            editing={false}
                        />
                    </Grid>
                    <Typography className={classes.comment}>
                        {comment}
                    </Typography>
                </Grid>
            </Card>
        );
    }
}

ItemComment.propTypes = {
    classes: PropTypes.object.isRequired,
    itemID: PropTypes.number.isRequired,
    userID: PropTypes.string.isRequired,
}

export default withStyles(styles)(ItemComment);