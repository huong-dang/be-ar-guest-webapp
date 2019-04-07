import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = prop => ({
    restaurantName: {
        fontSize: 'larger'
    },
});

class LandListItem extends React.Component {
    constructor(props) {
      super(props);
    }
    

    render () {
    const { classes, landID, landName, parkID, onClick } = this.props;

    return (
        <ListItem button onClick={ onClick }>
            <ListItemText primary={this.props.landName} />
        </ListItem>
    );
    }
}

LandListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    landName: PropTypes.string.isRequired,
    parkID: PropTypes.number.isRequired,
    landID: PropTypes.number.isRequired,
}

export default withStyles(styles)(LandListItem);