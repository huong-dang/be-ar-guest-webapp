import Grid from '@material-ui/core/Grid';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeImageList from '../components/HomeImageList';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class HomePage extends React.Component {
    
    render() {
        return (
            <div>
                {/* Header Grid */}
                <Grid container direction="column" justify="flex-start" alignItems="center"
                style={{
                    width: "auto"
                }}>
                    <Grid container direction="column" justify="space-between" alignItems="center">
                        <Header />
                        <Menu />
                    </Grid>
                    <HomeImageList />
                </Grid>
                {/* First Row of Info Grid */}
                <Grid container direction="row" justify="center" alignItems="flex-start"
                style={{
                    flexWrap: "nowrap",
                }}>
                    {/* What We Do Grid Component*/}
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                        {/* <PeopleIcon /> */}
                        <Typography variant="h5"
                        style={{
                            marginLeft: 100,
                            marginTop: 35,
                            fontFamily: "Avenir",
                            overflowWrap: "break-word",
                        }}>
                            What We Do
                        </Typography>
                        <Typography variant="body1"
                        style={{
                            height: 250,
                            width: 400,
                            marginLeft: 100,
                            marginTop: 5,
                            fontFamily: "Avenir",
                            overflowWrap: "break-word",
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Typography>
                    </Grid>
                    {/* What We Do Grid Component*/}
                    {/* Download Our App Component */}
                    <Card style={{
                        height: 200,
                        width: 500,
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
                    {/* Download Our App Component */}
                </Grid>
                {/* First Row of Info Grid */}
                {/* Second Row of Info Grid */}
                <Grid container direction="row" justify="center" alignItems="flex-start"
                style={{
                    flexWrap: "nowrap",
                }}>
                    {/* View Menus Component */}
                    <Card style={{
                        height: 200,
                        width: 500,
                        marginLeft: 100,
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
                    {/* View Menus Component */}
                    {/* Our Motivation Grid Component*/}
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
                            width: 400,
                            marginRight: 100,
                            //marginTop: 5,
                            fontFamily: "Avenir",
                            overflowWrap: "break-word",
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Typography>
                    </Grid>
                    {/* Our Motivation Component*/}
                </Grid>
                {/* Second Row of Info Grid */}
                <Footer />
            </div>

        )
    }
}
export default HomePage;