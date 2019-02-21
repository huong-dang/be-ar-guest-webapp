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
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
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
            <div style={{marginBottom: 10}}>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("HOME")}>
                Home
            </Button>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("RESTAURANTS")}>
                Restaurants
            </Button>
            <Button size="small" className={classes.button} onClick={this.handleNavigationChange("MENUS")}>
                Menus
            </Button>
            <Button size="small" className={classes.button}>
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
                {/* First Row of Info Grid */}
                <Grid container direction="row" justify="center" alignItems="flex-start"
                style={{
                    flexWrap: "nowrap",
                }}>
                {/* What We Do Grid Component*/}
                {/* <Grid container direction="column" justify="flex-start" alignItems="flex-start"> */}
                <Grid container spacing={40}>
                    <Grid item
                    style={{
                        marginLeft: "10%",
                        marginRight: "5%",
                    }}>
                        <Typography variant="h5"
                        style={{
                            marginTop: 35,
                            fontFamily: "Avenir",
                            overflowWrap: "break-word",
                        }}>
                            What We Do
                        </Typography>
                        <Typography variant="body1"
                        style={{
                            height: 250,
                            width: 450,
                            marginTop: 5,
                            fontFamily: "Avenir",
                            overflowWrap: "break-word",
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Typography>
                    </Grid>
                    {/* What We Do Grid Component*/}
                    {/* Download Our App Component */}
                    <Grid item>
                        <Card style={{
                            height: 200,
                            width: 400,
                            marginRight: 100,
                            marginTop: 35,
                            borderRadius: 20,
                        }}>
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
                </Grid>
                {/* First Row of Info Grid */}

                
                {/* Second Row of Info Grid */}
                {/* <Grid container direction="row" justify="center" alignItems="flex-start"
                style={{
                    flexWrap: "nowrap",
                }}> */}
                <Grid container spacing={40}
                style={{

                }}>
                    {/* View Menus Component */}
                    <Grid item>
                    <Card style={{
                        height: 200,
                        width: 400,
                        marginLeft: 100,
                        marginRight:"10%",
                        marginTop: 30,
                        borderRadius: 20,
                    }}>
                        <Typography style={{
                            fontFamily: "Avenir",
                            textAlign: "center",
                        }}>
                        View Our Menus & Data
                        </Typography>
                    </Card>
                    </Grid>
                    {/* View Menus Component */}
                    {/* Our Motivation Grid Component*/}
                    <Grid item
                    style={{
                        marginRight: "5%",
                    }}>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                            <Typography variant="h5"
                            style={{
                                marginRight: 100,
                                //marginTop: 30,
                                fontFamily: "Avenir",
                                overflowWrap: "break-word",
                            }}>
                                Our Motivation
                            </Typography>
                            <Typography variant="body1"
                            style={{
                                height: 250,
                                width: 450,
                                marginRight: 100,
                                //marginTop: 5,
                                fontFamily: "Avenir",
                                overflowWrap: "break-word",
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* Our Motivation Component*/}
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
                {/* Header Grid */}
                {/* <Grid container direction="column" justify="flex-start" alignItems="center"
                style={{
                    width: "auto"
                }}>
                    <Grid container direction="column" justify="space-between" alignItems="center">
                        <Header />
                        <Menu />
                    </Grid>
                    <HomeImageList />
                </Grid> */}
                <Grid container direction="column" justify="center" alignItems="center">
                <Header />
                {this.renderNavigationBar()}
                {this.renderBodyContent()}
                {/* Second Row of Info Grid */}
                <Footer />
                </Grid>
            </div>

        )
    }
}

export default withStyles(styles)(Index);
