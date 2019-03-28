import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const styles = theme => ({
    main:     {
        width:          '100%',
        display:        'flex', // Fix IE 11 issue.
        flexDirection:  'column',
        justifyContent: 'center',
        alignItems:     'center',
        minHeight:      300
    },
    progress: {
        size:      50,
        thickness: 5
    }
});

function Loading(props) {
    const {classes} = props;
    return (
        <main className={classes.main}>
            <CircularProgress size={50} thickness={5}/>
        </main>
    )
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
