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

const styles = {
    gridList: {
        flexWrap: 'wrap',
        cols: 3,
        spacing: 10
    },
    footer: {
       
    },
};
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
                    <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                        <RestaurantCard />
                        {/* <GridList style={{
                            flexWrap: 'wrap',
                            position: 'relative',
                            // cols: 3,
                            // spacing: 5
                        }} cols={2.5} padding={5}> */}
                            
                            <ItemCard />
                            <ItemCard />
                            <ItemCard />
                            <ItemCard />
                        {/* </GridList> */}
                    </Grid>
                </Grid>
            </div>

            /**
             *  HOME PAGE
             */
            // <div>
            //     <Grid container direction="column" justify="flex-start" alignItems="center">
            //         <Grid container direction="column" justify="space-between" alignItems="center">
            //             <Header />
            //             <Menu />
            //         </Grid>
            //         <HomeImageList />
            //     </Grid>
            //         <Footer style={{
            //             position: "relative",
            //             top: "-180px",
            //             height: "150px"
            //         }}/>
            // </div>
        )
    }
}

export default Index;
