import classNames from "classnames";
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {signIn, signOut, getCurrentUser} from '../services/accounts';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import isNil from 'lodash/isNil';
import Loading from '../components/Loading';
import axios from "axios/index";

const styles = theme => ({
    main:   {
        width:                                                    'auto',
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
        marginTop:     theme.spacing.unit * 8,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin:          theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form:   {
        width:     '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class LandManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parks:     [],
            land_name: '',
            park_name: '',
            park_id:   '',
            loading:   true,
            message:   ''
        }
    }

    async componentDidMount() {
        try {

        } catch (e) {

        }
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleAddLand = async () => {
        try {
            // Need park_id and land_name in order to successfully send the request


        } catch (e) {

        }
    };

    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add a new land
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            {/*<TextField*/}
                            {/*label="Park Name"*/}
                            {/*type="text"*/}
                            {/*name="park_name"*/}
                            {/*value={this.state.park_name}*/}
                            {/*onChange={this.handleChange('park_name')}*/}
                            {/*gutter*/}
                            {/*/>*/}
                            <TextField
                                label="Land Name"
                                type="text"
                                name="land_name"
                                value={this.state.land_name}
                                onChange={this.handleChange('land_name')}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleAddLand}>
                            Add Land
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }

}

LandManagement.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandManagement);
