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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Items from './Items';


const styles = theme => ({
    main:  {
        width:                                                    'auto',
        display:                                                  'block', // Fix IE 11 issue.
        marginLeft:                                               theme.spacing.unit * 2,
        marginRight:                                              theme.spacing.unit * 2,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width:       '100%',
            marginLeft:  'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        overflowX:     'auto'
    },
    navigationBar:  {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0,
        },
        [theme.breakpoints.between('sm','md')]: {
            marginBottom: 10,
        },
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

const tab_options = {
    0: 'View',
    1: 'Add'
}
class MenuItemManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        }
    }

    handleTabSelection = (event, value) => {
        this.setState({tab: value});
    };

    renderContent = () => {
        switch (tab_options[this.state.tab]) {
            case 'View':
                return <Items/>;
                break;
            case 'Add':
                return <div>tab_options[this.state.tab]</div>;
                break;
            default:
                return <div>Something</div>
        }
    };

    renderTabOptions = () => {
        const {classes} = this.props;
        return (
            <div className={classes.navigationBar}>
                <Button size="small" className={classes.button} onClick={this.handleTabSelection('View')}>
                    View
                </Button>
                <Button size="small" className={classes.button} onClick={this.handleTabSelection("Add")}>
                    Add
                </Button>
            </div>
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Menu Items
                    </Typography>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabSelection}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label={tab_options[0]} />
                        <Tab label={tab_options[1]} />
                    </Tabs>
                    {this.renderContent()}
                </Paper>
            </main>
        );
    }
}

MenuItemManagement.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuItemManagement);
