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

// const styles = {
//     gridList: {
//         flexWrap: 'wrap',
//         cols: 3,
//         spacing: 10
//     },
//     footer: {
       
//     },
// };
class Index extends React.Component {
    
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
            <div>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Header />
                    <Menu />
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <RestaurantCard />
                        {/* <GridList style={{
                            flexWrap: 'wrap',
                            position: 'relative',
                            // cols: 3,
                            // spacing: 5
                        }} cols={2.5} padding={5}> */}
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
                        {/* </GridList> */}
                    </Grid>
                    <Footer marginTop="50"/>
                </Grid>
            </div>

            // /**
            //  *  HOME PAGE
            //  */
            // <HomePageLayout />

        )
    }
}

export default Index;
