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
        marginTop: 35,
        marginBottom: 10,
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
        const { classes } = this.props;
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
                    <Grid container spacing={24}>
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
                                    Current Password*
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
                                            autoFocus={false}
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
                                            
                                        />
                                    </FormControl>
                                </form>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Button 
                        size="medium" 
                        variant="outlined"
                        className={classes.changePasswordButton}
                    >
                        Change Password
                    </Button>
                </Card>
            </div>
        )
    }
}

Account.propTypes = {
    user:    PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
