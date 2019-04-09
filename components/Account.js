import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root:           {
        width:  "80%",
        height: "auto"
        // flexGrow: 1,
    },
});

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    render() {
        return (
            <div>Account page: {this.state.user.fName ? this.state.user.fName : 'no name'}</div>
        )
    }
}

Account.propTypes = {
    user:    PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
