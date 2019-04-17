import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getCurrentUser, resetPassword} from '../services/accounts';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import axios from 'axios';
import FavoriteItem from './FavoriteItem';

const styles = theme => ({
    root:           {
        width:  "80%",
        height: "auto"
        // flexGrow: 1,
    },
    h1: {
        fontFamily: 'Avenir',
        fontSize: 25,
        textAlign: 'left',
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    titleGrid: {
        [theme.breakpoints.between('xs', 'md')]: {
            width: 140,
        },
        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
    emailGrid: {
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: 300,
        },
    },
    accountInfoTitle: {
        fontFamily: 'Avenir',
        fontSize: 18,
        textTransform: 'uppercase',
        marginLeft: 10,
    },
    accountInfo: {
        fontFamily: 'Avenir',
        fontSize: 16,
    },
    emailInfo: {
        fontFamily: 'Avenir',
        fontSize: 16,
        [theme.breakpoints.between('xs', 'sm')]: {
            paddingLeft: 10,
        },
    },
    passwordTitle: {
        fontFamily: 'Avenir',
        fontSize: 18,
        textTransform: 'uppercase',
    },
    changePasswordButton: {
        marginLeft: 10,
        // marginTop: 35,
        marginBottom: 10,
    },
});

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            currentPassword: "",
            newPassword: "",
            newPasswordVerify: "",
            passwordsMatch: true,
            passwordChangeSuccess: false,
            favorites: [],
            passwordChangeSuccess: false,
        }
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/review/getUserFavoritedItems', {userID: this.state.user.userID});
            console.log("Account.js result =>", result.data);
            this.setState({
                              favorites: result.data,
                          });
        } catch (e) {
            console.log('Error', e);
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handlePasswordReset = async () => {
        // if (this.state.newPassword === this.state.newPasswordVerify) {
        //     const result = await resetPassword(this.state.newPassword);
        //     if (result.success) {
        //         this.setState({ passwordChangeSuccess: true });
        //     } else {
        //         // Password was not successfully updated
        //         console.log('Error: Password not updated successfully.');
        //     } 
        //     console.log("Value of state.newPassword =>", this.state.newPassword);
        //     console.log("Value of newPasswordVerify => ", this.state.newPasswordVerify);
            
        // } else{
        //     console.log("Passwords do not match");
        //     this.setState({ passwordsMatch: false });
        // }
        const emailSent = await resetPassword(this.state.user.email);
        console.log('ResetPassword emailSent =>', emailSent);
        // if (emailSent.success) {
        //     this.setState({ passwordChangeSuccess: true });
        // } else {
        //     // Password was not successfully updated
        //     console.log('Error: Reset password email not sent');
        // }
    };

    renderDoNotMatch() {
        return (
            <div>
                <Typography variant="overline">
                    Passwords do not match.
                </Typography>
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        const favoritesInfo = this.state.favorites.map((favoriteItem, index) => {
            return (
                <Grid item xs={12} sm={4} key={favoriteItem.itemID}>
                    <FavoriteItem 
                        item={favoriteItem}
                        user={this.state.user}
                    />
                </Grid>
            );
        });
        return (
            <div style={{ width: '80%',}}>
                {/* Account page: {this.state.user.fName ? this.state.user.fName : 'no name'} */}
                <Card elevation={1}>
                    <Typography className={classes.h1}>
                        My Account
                    </Typography>
                    <Divider variant="middle"/>
                    <Grid container 
                        direction="row" 
                        justify="flex-start" 
                        alignItems="flex-start"
                        style={{
                            paddingTop: 10,
                        }}>
                        <Grid item className={classes.titleGrid}>
                            <Typography className={classes.accountInfoTitle}>
                                First Name
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={classes.accountInfo}>
                            {this.state.user.fName}
                            </Typography>
                        </Grid>
                        {/* <Grid item>
                            <Button>

                            </Button>
                        </Grid> */}
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Grid item className={classes.titleGrid}>
                            <Typography className={classes.accountInfoTitle}>
                                Last Name
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.accountInfo}>
                            {this.state.user.lName}
                            </Typography>
                        </Grid>
                        {/* <Grid item>
                            <Button>

                            </Button>
                        </Grid> */}
                    </Grid>
                    <Grid container 
                        direction="row" 
                        justify="flex-start" 
                        alignItems="flex-start"
                        style={{ paddingBottom: 10,}}>
                        <Grid item className={classes.emailGrid}>
                            <Typography className={classes.accountInfoTitle}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.emailInfo}>
                            {this.state.user.email}
                            </Typography>
                        </Grid>
                        {/* <Grid item>
                            <Button>

                            </Button>
                        </Grid> */}
                    </Grid>
                    <Divider />



                    <Typography className={classes.h1}
                        style={{
                            paddingTop: 10,
                        }}>
                        Change Password
                    </Typography>
                    <Divider variant="middle"/>
                    {/* <Grid container spacing={24}>
                        <Grid item>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{
                                paddingTop: 10,
                                marginLeft: 10,
                            }}
                        >
                            <Grid item className={classes.emailGrid}>
                                <Typography className={classes.passwordTitle}>
                                    New Password*
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form className={classes.passwordTextField}>
                                    <FormControl
                                        style={{
                                            height: 30,
                                        }}
                                    >
                                        <TextField
                                            id="currentPassword"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            autoFocus={false}
                                            value={this.state.newPassword}
                                            onChange={this.handleChange('newPassword')}
                                        />
                                    </FormControl>
                                </form>
                            </Grid>
                        </Grid>
                        </Grid>
                        <Grid item>
                        <Grid container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{
                                paddingTop: 10,
                                marginLeft: 10,
                            }}
                        >
                            <Grid item className={classes.emailGrid}>
                                <Typography className={classes.passwordTitle}>
                                    Confirm New Password*
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form className={classes.passwordTextField}>
                                    <FormControl
                                        style={{
                                            height: 30,
                                        }}
                                    >
                                        <TextField
                                            id="currentPassword"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            autoFocus={false}
                                            value={this.state.newPasswordVerify}
                                            onChange={this.handleChange('newPasswordVerify')}
                                        />
                                    </FormControl>
                                </form>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid> */}
                    {/* {this.state.passwordsMatch ? <div></div> : this.renderDoNotMatch() } */}
                    <Typography variant="overline"
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        Send a reset password email
                    </Typography>
                    <Button 
                        size="medium" 
                        variant="outlined"
                        className={classes.changePasswordButton}
                        onClick={this.handlePasswordReset}
                    >
                        Change Password
                    </Button>
                </Card>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.h1}>
                            Favorites
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={24}>
                            {favoritesInfo}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

Account.propTypes = {
    user:    PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
