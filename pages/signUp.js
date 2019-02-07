import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {signUp, deleteUser, getCurrentUser} from '../services/accounts';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';

const styles = theme => ({
    main:   {
        width:                                                    'auto',
        display:                                                  'block', // Fix IE 11 issue.
        marginLeft:                                               theme.spacing.unit * 3,
        marginRight:                                              theme.spacing.unit * 3,
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

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:        '',
            password:     '',
            error:        '',
            showPassword: false,
            firstName:    '',
            lastName:     '',
        }
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleSubmit = async () => {
        try {
            const uid    = await signUp(this.state.email, this.state.password);
            const result = await axios.post('/profile/create', {
                firstName:    this.state.firstName,
                lastName:     this.state.lastName,
                userEmail:    this.state.email,
                uid:          uid,
                userImageURL: '#'
            });

            if (result.data.success) {
                Router.push('/signIn');
            } else {
                // Delete user from Firebase auth when user was not successfully
                // added to mysql database
                await deleteUser((res) => console.log('User successfully deleted!'));
                this.setState({error: 'Could not add user to the database.'});
            }
        } catch (err) {
            // Delete user from Firebase auth when user was not successfully
            // added to mysql database
            const user = await getCurrentUser();
            if (user) {
                await deleteUser((res) => console.log('User successfully deleted!'));
            }
            this.setState({error: err.message})
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {
        const {classes} = this.props;
        if (this.state.error.length > 0) {
            console.log('Error:', this.state.error);
        }
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <RestaurantIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                label="First Name"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                label="Last Name"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                type={this.state.showPassword ? 'text' : 'password'}
                                label="Password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                InputProps={{
                                    endAdornment: (
                                                      <InputAdornment position="end">
                                                          <IconButton
                                                              aria-label="Toggle password visibility"
                                                              onClick={this.handleClickShowPassword}
                                                          >
                                                              {this.state.showPassword ? (
                                                                  <VisibilityOff/>
                                                              ) : (
                                                                  <Visibility/>
                                                              )}
                                                          </IconButton>
                                                      </InputAdornment>
                                                  ),
                                }}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}>
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
