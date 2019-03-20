import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import ItemCard from '../components/ItemCard';
import HomeImageList from '../components/HomeImageList';

import { Typography } from '@material-ui/core';
// import PeopleIcon from '../@material-ui/icons/PeopleSharp';
import Card from '@material-ui/core/Card';

import HomePage from '../components/HomePage';
import HomePageLayout from '../components/HomePageLayout';
import RestaurantWrapper from  '../components/RestaurantWrapper';

import FAQDrawer from '../components/FAQDrawer';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    navigationBar:  {
        [theme.breakpoints.down('sm')]: {
            marginBottom: -33,
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: 10,
        },
    },
    homeGridRowLayout: {
        marginLeft: "10%",
        marginRight: "10%",
        width: "99%",
        [theme.breakpoints.down('sm')]: {
            marginTop: 15,
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 35,
        },
    },
    homeHeaderText:   {
        fontFamily: "Avenir",
        overflowWrap: "break-word",
    },
    homeBodyText:   {
        fontFamily: "Avenir",
        overflowWrap: "break-word",
        [theme.breakpoints.down('sm')]: {
            width: 265,
            fontSize: 14,
            textAlign: 'justify',
        },
        [theme.breakpoints.up('md')]: {
            height: 225,
            width: 425,
        },
    },
    homeCardComponents: {
        borderRadius: 20,
        [theme.breakpoints.down('sm')]: {
            width: 250,
            height: 200,
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            height: 200,
            width: 425,
        },
    },
    faqHeaderCard: {
        backgroundColor: 'rgb(68,68,68)',
        borderRadius: 10,
        width: "100%",
        height: 'auto',

        [theme.breakpoints.down('sm')]: {
            height: 48,
        },
        [theme.breakpoints.up('md')]: {
            height: 69,
        },
    },
    faqHeader: {
        marginBottom: 20,
        color: 'rgb(255,255,255)',
        textAlign: "center",
        overflowWrap: "break-word",
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 25,
        },
    },
});

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: "HOME"}
    }

    handleNavigationChange = prop => event => {
        this.setState({tab: prop});
    };

    renderNavigationBar() {
        const {classes} = this.props;
        return (
            <div className={classes.navigationBar}>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("HOME")}>
                Home
            </Button>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("RESTAURANTS")}>
                Restaurants
            </Button>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("MENUS")}>
                Menus
            </Button>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("FAQ")}>
                FAQ
            </Button>
            </div>
        );
    }

    renderBodyContent () {
        switch (this.state.tab) {
            case "HOME":
                return this.renderHome();
            case "MENUS":
                return this.renderMenus();
            case "RESTAURANTS":
                return this.renderRestaurants();
            case "FAQ":
                return this.renderFAQ();
            default:
                return this.renderHome();
        }
    }

    renderRestaurants() {
        return (
            <RestaurantWrapper />
        )
    }

    renderHome() {
        const {classes} = this.props;
        return (
            <div>
            <HomeImageList />
            <Grid container direction="column" justify="flex-start" alignItems="center">
                {/* First Row of Info Grid */}
                {/* What We Do Grid Component*/}
                <Grid container spacing={40} className={classes.homeGridRowLayout}>
                    <Grid item>
                        <Typography variant="h5" className={classes.homeHeaderText}>
                            What We Do
                        </Typography>
                        <Typography variant="body1" className={classes.homeBodyText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Typography>
                    </Grid>
                    {/* What We Do Grid Component*/}
                    {/* Download Our App Component */}
                    <Grid item>
                        <Card className={classes.homeCardComponents}>
                            <Typography style={{
                                fontFamily: "Avenir",
                                textAlign: "center",
                            }}>
                            Download Our App
                            </Typography>
                        </Card>
                    </Grid>
                    </Grid>
                    {/* Download Our App Component */}
                {/* </Grid> */}
                {/* First Row of Info Grid */}
                
                {/* Second Row of Info Grid */}
                <Grid container spacing={40} className={classes.homeGridRowLayout}>
                    {/* View Menus Component */}
                    <Grid item style={{marginRight: '10%'}}>
                    <Card className={classes.homeCardComponents}>
                        <Typography className={classes.homeHeaderText}>
                        View Our Menus & Data
                        </Typography>
                    </Card>
                    </Grid>
                    {/* View Menus Component */}
                    {/* Our Motivation Grid Component*/}
                    <Grid item
                    style={{
                        marginRight: "10%",
                    }}>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                            <Typography variant="h5"
                            style={{
                                fontFamily: "Avenir",
                                overflowWrap: "break-word",
                            }}>
                                Our Motivation
                            </Typography>
                            <Typography variant="body1" className={classes.homeBodyText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* Our Motivation Component*/}
                </Grid>
                </Grid>
            </div>
        )
    }

    renderMenus() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container direction="column" justify="space-between" alignItems="center">
                        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            <RestaurantCard />
                                <div style={{
                                    // width: "auto",
                                    position: "relative",
                                    marginLeft: "28%",
                                    marginTop: -250,
                                    marginRight: "5%",
                                    marginBottom: 30,
                                }}>
                            <Grid container spacing={32}>
                                <Grid item>
                                    <ItemCard />
                                    {/* <ItemCard />
                                    <ItemCard />
                                    <ItemCard />
                                    <ItemCard /> */}
                                </Grid>
                                <Grid item>
                                    <ItemCard />
                                </Grid>
                                <Grid item>
                                    <ItemCard />
                                </Grid>
                                <Grid item>
                                    <ItemCard />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderFAQ() {
        const {classes} = this.props;
        return (
            <div
            style={{
                width: "80%",
                height: 'auto',
                marginBottom: 30,
            }}>
                <Grid container direction="column" justify="flex-start" alignItems="center">
                <Card className={classes.faqHeaderCard}>
                    <Typography variant="overline" className={classes.faqHeader}>
                        Frequently Asked Questions
                    </Typography>
                </Card>
                    <Typography variant="overline"
                    style={{
                        marginTop: 15,
                        marginBottom: 20,
                        fontSize: 15,
                    }}>
                        We're here to help.
                    </Typography>
                    <FAQDrawer />
                </Grid>
            </div>
        )
    }

    render() {
        return (

            /** 
             *  HUONG'S SIGN IN
             */
            // <div>
            //     <Link href={'/signUp'}>
            //         <Button color={'primary'} variant={'outlined'}>
            //             Sign Up
            //         </Button>
            //     </Link>
            //     <Link href={'/signIn'}>
            //         <Button color={'secondary'} variant={'outlined'}>
            //             Sign In
            //         </Button>
            //     </Link>
            // </div>

            /**
             *  RESTAURANTS PAGE
             */
            // <div>
            //     <Grid container direction="column" justify="space-between" alignItems="center">
            //         <Header />
            //         <Menu />
            //         <Grid container direction="row" justify="flex-start" alignItems="flex-start">
            //             <RestaurantCard />
            //             {/* <GridList style={{
            //                 flexWrap: 'wrap',
            //                 position: 'relative',
            //                 // cols: 3,
            //                 // spacing: 5
            //             }} cols={2.5} padding={5}> */}
            //             <div style={{
            //                 // width: "auto",
            //                 position: "relative",
            //                 marginLeft: "28%",
            //                 marginTop: -250,
            //                 marginRight: "5%",
            //                 marginBottom: 30,
            //             }}>
            //                 <Grid container spacing={32}>
            //                     <Grid item>
            //                         <ItemCard />
            //                         {/* <ItemCard />
            //                         <ItemCard />
            //                         <ItemCard />
            //                         <ItemCard /> */}
            //                     </Grid>
            //                     <Grid item>
            //                         <ItemCard />
            //                     </Grid>
            //                     <Grid item>
            //                         <ItemCard />
            //                     </Grid>
            //                     <Grid item>
            //                         <ItemCard />
            //                     </Grid>
            //                 </Grid>
            //             </div>
            //             {/* </GridList> */}
            //         </Grid>
            //         <Footer marginTop="50"/>
            //     </Grid>
            // </div>

            // /**
            //  *  HOME PAGE
            //  */
            <div>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Header />
                    {this.renderNavigationBar()}
                    {this.renderBodyContent()}
                    <Footer />
                </Grid>
            </div>

        )
    }
}

export default withStyles(styles)(Index);
