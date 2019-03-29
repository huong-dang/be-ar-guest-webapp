import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Loading from '../components/Loading';
import axios from "axios/index";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    main:   {
        width:                                                    1000,
        display:                                                  'block', // Fix IE 11 issue.
        marginLeft:                                               theme.spacing.unit * 2,
        marginRight:                                              theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width:       400,
            marginLeft:  'auto',
            marginRight: 'auto',
        },
    },
    paper:  {
        // marginTop:     theme.spacing.unit * 8,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    // avatar: {
    //     margin:          theme.spacing.unit,
    //     backgroundColor: theme.palette.secondary.main,
    // },
    // form:   {
    //     width:     '100%', // Fix IE 11 issue.
    //     marginTop: theme.spacing.unit,
    // },
    // submit: {
    //     marginTop: theme.spacing.unit * 3,
    // },
});

class MenuItemManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add a new land
                    </Typography>
                </Paper>
            </main>
        );
    }
}

MenuItemManagement.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuItemManagement);
