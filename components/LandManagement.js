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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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

// TODO: Add client-side validation to make sure that the user is not adding a duplicate land name
class LandManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parks:     [],
            land_name: '',
            park_id:   '',
            loading:   true,
            message:   '',
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/park/getAll');
            this.setState({loading: false, parks: result.data});
        } catch (e) {
            this.setState({loading: false, message: 'Could not get parks'});
        }
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleAddLand = async () => {
        try {
            this.setState({loading: true})
            // Need park_id and land_name in order to successfully send the request
            // TODO: validation function here
            const result = await axios.post('/land/add', {
                park_id:   this.state.park_id,
                land_name: this.state.land_name
            });
            this.setState({loading: false, message: 'Successfully added land!'});
        } catch (e) {
            console.log('Error occurred while adding a new land', e);
            this.setState({loading: false, message: e.message});
        }
    };

    renderAddLand() {
        if (this.state.loading) {
            return <Loading/>
        }
        else {
            const {classes}     = this.props;
            const parkMenuItems = this.state.parks.map(function (park) {
                return <MenuItem key={park.parkID} value={park.parkID}>{park.parkName}</MenuItem>
            });
            console.log(this.state);
            return (
                <main className={classes.main}>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Add a new land
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Park Name</InputLabel>
                                <Select
                                    value={this.state.park_id}
                                    onChange={this.handleChange('park_id')}
                                >
                                    {parkMenuItems}
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
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
                            {this.state.message}
                        </form>
                    </Paper>
                </main>
            );
        }
    }

    render() {
        return this.renderAddLand();
    }
}

LandManagement.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandManagement);
