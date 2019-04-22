import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Landscape from "@material-ui/icons/Landscape";
import LandManagement from "./LandManagement";
import SignOutMenuButton from "./SignOutMenuButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Food from "@material-ui/icons/Fastfood";
import Restaurant from "@material-ui/icons/Restaurant";
import Link from 'next/link';
import MenuItemManagement from "./MenuItemManagement";
import RestaurantManagement from "./RestaurantManagement";
import UserManagement from "./UserManagement";
import Group from "@material-ui/icons/Group";

const drawerWidth = 240;

const styles = theme => ({
    root:             {
        display: "flex"
    },
    toolbar:          {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon:      {
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-evenly",
        ...theme.mixins.toolbar
    },
    appBar:           {
        zIndex:          theme.zIndex.drawer + 1,
        transition:      theme.transitions.create(["width", "margin"], {
            easing:   theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        backgroundColor: "#9993B2"
    },
    appBarShift:      {
        marginLeft: drawerWidth,
        width:      `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing:   theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton:       {
        marginLeft:  12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title:            {
        flexGrow: 1
    },
    drawerPaper:      {
        position:   "relative",
        whiteSpace: "nowrap",
        width:      drawerWidth,
        transition: theme.transitions.create("width", {
            easing:   theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX:                    "hidden",
        transition:                   theme.transitions.create("width", {
            easing:   theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width:                        theme.spacing.unit, // When the screen is small, don't show the menu icons
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer:     theme.mixins.toolbar,
    content:          {
        flexGrow: 1,
        padding:  theme.spacing.unit * 3,
        height:   "100vh",
        overflow: "auto"
    },
    chartContainer:   {
        marginLeft: -22
    },
    tableContainer:   {
        height: 320
    },
    h5:               {
        marginBottom: theme.spacing.unit * 2
    }
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:             false,
            selectedMenuItem: "Item"
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleListItemSelection = prop => event => {
        this.setState({selectedMenuItem: prop});
    };

    renderContent = () => {
        switch (this.state.selectedMenuItem) {
            case "Land":
                return <LandManagement/>;
                break;
            case "Item":
                return <MenuItemManagement/>;
                break;
            case "Restaurant":
                return <RestaurantManagement/>;
                break;
            case "User":
                return <UserManagement/>;
                break;
            default:
                return <MenuItemManagement/>;
        }
    };

    renderDashboardBody = () => {
        const {classes} = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <div>{this.renderContent()}</div>
            </main>
        );
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    className={classNames(
                        classes.appBar,
                        this.state.open && classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.open}
                        className={classes.toolbar}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Admin Portal
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.state.open && classes.drawerPaperClose
                        )
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <Link href='/'>
                            <a style={{textDecoration: 'none'}}>
                                <img
                                    src={"../static/images/logo.png"}
                                    alt="Logo"
                                    width={52}
                                />
                            </a>
                        </Link>
                        <Link href='/'>
                            <a style={{textDecoration: 'none', color: '#000'}}>
                                <Typography
                                    component="h3"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    className={classes.title}
                                >
                                    be AR guest
                                </Typography>
                            </a>
                        </Link>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <List>
                        <ListItem
                            button
                            onClick={this.handleListItemSelection("Land")}
                        >
                            <ListItemIcon>
                                <Landscape/>
                            </ListItemIcon>
                            <ListItemText primary="Lands"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={this.handleListItemSelection("Item")}
                        >
                            <ListItemIcon>
                                <Food/>
                            </ListItemIcon>
                            <ListItemText primary="Menu Items"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={this.handleListItemSelection("Restaurant")}
                        >
                            <ListItemIcon>
                                <Restaurant/>
                            </ListItemIcon>
                            <ListItemText primary="Restaurants"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={this.handleListItemSelection("User")}
                        >
                            <ListItemIcon>
                                <Group/>
                            </ListItemIcon>
                            <ListItemText primary="User Accounts"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <SignOutMenuButton/>
                    </List>
                </Drawer>
                {this.renderDashboardBody()}
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
