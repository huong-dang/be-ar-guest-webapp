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
import AccountIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
import MenuIcon from '@material-ui/icons/ImportContacts';
import RestaurantWrapper from  '../components/RestaurantWrapper';
import MenuStepper from '../components/MenuStepper';
import FAQDrawer from '../components/FAQDrawer';
import AboutUs from '../components/AboutUs';
import ProductPage from '../components/ProductPage';

const styles = theme => ({
    signInButton: {
        marginRight: '3%',
        marginTop: '2%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    navigationBar:  {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 0,
        },
        [theme.breakpoints.between('sm','md')]: {
            marginBottom: 10,
        },
    },
    homeHeaderText:   {
        fontFamily: "Avenir",
        overflowWrap: "break-word",
    },
    homeBodyText:   {
        fontFamily: "Avenir",
        overflowWrap: "break-word",
        // marginLeft: 'auto',
        // marginRight: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: 265,
            fontSize: 14,
            textAlign: 'justify',
        },
        [theme.breakpoints.up('sm')]: {
            height: 225,
            width: 425,
        },
    },
    homeCardComponents: {
        borderRadius: 20,
        // marginLeft:'auto',
        // marginRight:'auto',
        height: 200,
        width: 425,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    pictureCard:    {
        //display: 'block',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        width: 110,
        height: 110,
        borderRadius: 70,
        backgroundSize: 'cover',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: 'grey',
    },
    nameText:   {
        marginTop: 13,
        fontFamily: "Avenir",
        fontSize: 'larger',
        textAlign: 'center',
        fontWeight: 500,
    },
    positionText:   {
        marginTop: 0,
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'dimgray',
        textAlign: 'center',
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

class IndexJackie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: "HOME"}
    }

    handleNavigationChange = prop => event => {
        this.setState({tab: prop});
    };

    changeOpacity() {
        this.state = {
            opacity: 0.7
        }
    }

    renderNavigationBar() {
        const {classes} = this.props;
        return (
            <div className={classes.navigationBar}>
                <Button size="small" className={classes.button} onClick={this.handleNavigationChange("HOME")}>
                    Home
                </Button>
                <Button size="small" className={classes.button} onClick={this.handleNavigationChange("PRODUCT")}>
                    Product
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
            case "PRODUCT":
                // return this.renderMenus();
                return this.renderProduct();
            case "MENUS":
                return this.renderMenus();
            case "FAQ":
                return this.renderFAQ();
            default:
                return this.renderHome();
        }
    }

    renderHome() {
        const {classes} = this.props;
        return (
            <div>
                <HomeImageList />
                <Grid container spacing={8} style={{paddingLeft: '7%',}}>
                    {/* First Row of Info Grid */}
                    {/* What We Do Grid Component*/}
                    {/* <Grid container spacing={40} className={classes.homeGridRowLayout}> */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" className={classes.homeHeaderText}>
                            What We Do
                        </Typography>
                        <Typography variant="body1" className={classes.homeBodyText}>
                            Be AR Guest is a convenient mobile and web application that helps visitors at Walt Disney World find vegan dishes. Users can utilize our Android mobile application’s augmented reality menu scanner and determine which menu items are vegan through an  interactive interface that is rendered in real time. Users also have the option to use our listed menu information to plan for their meals in advance.
                        </Typography>
                    </Grid>
                    {/* What We Do Grid Component*/}
                    {/* Download Our App Component */}
                    <Grid item xs={12} sm={6}>
                        <Card
                            className={classes.homeCardComponents}
                            style={{
                                backgroundColor: 'rgb(41,41,41)',
                            }}>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Typography variant="h6" style={{
                                    fontFamily: "Avenir",
                                    textAlign: "center",
                                    // fontSize: 24,
                                    fontWeight: 400,
                                    color: 'rgb(252,252,252)',
                                    marginTop: 85,
                                }}>
                                    Download Our App
                                </Typography>
                                <PhoneIcon style={{
                                    marginTop: 85,
                                    color: 'rgb(252,252,252)',
                                }}/>
                            </Grid>
                        </Card>
                    </Grid>
                    {/* </Grid> */}
                    {/* Download Our App Component */}
                    {/* </Grid> */}
                    {/* First Row of Info Grid */}

                    {/* Second Row of Info Grid */}
                    {/* <Grid container spacing={40} className={classes.homeGridRowLayout}> */}
                    {/* View Menus Component */}
                    <Grid item xs={12} sm={6}>
                        <Card
                            onClick={this.handleNavigationChange("MENUS")}
                            onMouseOver={this.changeOpacity()}
                            className={classes.homeCardComponents}
                            style=
                                {{
                                    backgroundImage: "url('../static/images/HomePageImages/restaurantstock.jpg')",
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    backgroundSize: 'cover',
                                    opacity: 1.0,
                                }}
                        >
                            <Grid container direction="row" justify="center" alignItems="center">
                                {/* <Card
                        style=
                        {{
                            backgroundColor: 'black',
                            height: 25,
                            width:
                        }}> */}
                                <Typography
                                    variant="h6"
                                    className={classes.homeHeaderText}
                                    style=
                                        {{
                                            position: 'relative',
                                            color: 'white',
                                            marginTop: 85,
                                            opacity: 1.0,
                                        }}
                                >
                                    View Our Menus
                                </Typography>
                                <MenuIcon
                                    style=
                                        {{
                                            color: 'white',
                                            position: 'relative',
                                            marginLeft: 5,
                                            marginTop: 85,
                                            opacity: 1.0,
                                        }}/>
                                {/* </Card> */}
                            </Grid>
                        </Card>
                    </Grid>
                    {/* View Menus Component */}
                    {/* Our Motivation Grid Component*/}
                    {/* <Grid item
                    style={{
                        // marginRight: "10%",
                    }}> */}
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                            <Typography variant="h5"
                                        style={{
                                            fontFamily: "Avenir",
                                            overflowWrap: "break-word",
                                        }}>
                                Our Motivation
                            </Typography>
                            <Typography variant="body1" className={classes.homeBodyText}>
                                We want to make vegan options accessible to Walt Disney World visitors by reducing the amount of work required to find information on vegan options at Walt Disney World. There is currently no identification of vegan options on Disney’s restaurant menus and there are vegan items that are not listed on menus. Visitors with dietary needs have the task of figuring out where and what to eat on their trip - we want to simplify that aspect of vacation planning.
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* End of 2nd row */}
                    {/* Our Motivation Component*/}

                    {/* <Grid container direction="column" justify="flex-start" alignItems="flex-start"> */}
                    <Grid item xs={6}>
                        <Typography variant="h5"
                                    style={{
                                        fontFamily: "Avenir",
                                        marginBottom: 20,
                                    }}>
                            Our Team
                        </Typography>
                    </Grid>
                    <Grid container spacing={0} style={{}}>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column" justify="flex-start" alignItems="center"
                                  className={classes.profileTile}>
                                <Card
                                    style={{backgroundImage: "url('../static/images/PeopleImages/RS.jpg')"}}
                                    className={classes.pictureCard}
                                />
                                <Typography variant="h5" className={classes.nameText}>
                                    Rachael Sera
                                </Typography>
                                <Typography className={classes.positionText}>
                                    Augmented Reality
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column" justify="flex-start" alignItems="center"
                                  className={classes.profileTile}>
                                <Card
                                    style={{backgroundImage: "url('../static/images/PeopleImages/BB.jpg')"}}
                                    className={classes.pictureCard}
                                />
                                <Typography variant="h5" className={classes.nameText}>
                                    Bailey Brooks
                                </Typography>
                                <Typography className={classes.positionText}>
                                    Computer Vision
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column" justify="flex-start" alignItems="center"
                                  className={classes.profileTile}>
                                <Card
                                    style={{backgroundImage: "url('../static/images/PeopleImages/LY.jpg')"}}
                                    className={classes.pictureCard}
                                />
                                <Typography variant="h5" className={classes.nameText}>
                                    Lorraine Yerger
                                </Typography>
                                <Typography className={classes.positionText}>
                                    Mobile Developer
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column" justify="flex-start" alignItems="center"
                                  className={classes.profileTile}>
                                <Card
                                    style={{backgroundImage: "url('../static/images/PeopleImages/HD.jpg')"}}
                                    className={classes.pictureCard}
                                />
                                <Typography variant="h5" className={classes.nameText}>
                                    Huong Dang
                                </Typography>
                                <Typography className={classes.positionText}>
                                    Web Developer
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container direction="column" justify="flex-start" alignItems="center"
                                  className={classes.profileTile}>
                                <Card
                                    style={{backgroundImage: "url('../static/images/PeopleImages/JL.jpg')"}}
                                    className={classes.pictureCard}
                                />
                                <Typography variant="h5" className={classes.nameText}>
                                    Jacquelyn Law
                                </Typography>
                                <Typography className={classes.positionText}>
                                    Web Developer
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* </Grid> */}
                    {/* </Grid> */}
                </Grid>

                {/* <Grid container spacing={40}> */}

                {/* </Grid> */}
            </div>
        )
    }

    renderProduct() {
        return (
            <ProductPage />
        )
    }

    renderMenus() {
        return (
            // <RestaurantWrapper />
            <MenuStepper />
        )
    }

    renderMenuWrapper() {
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
        const {classes} = this.props;
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
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',}}>
                    <Link href={'/signIn'}>
                        <Button variant="outlined" className={classes.signInButton}>
                            <AccountIcon />
                            <Typography variant="body2" style={{marginLeft: 3,}}>
                                Sign In
                            </Typography>
                        </Button>
                    </Link>
                </div>
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

export default withStyles(styles)(IndexJackie);
