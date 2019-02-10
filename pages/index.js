import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Menu from '../components/Menu';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';

class Index extends React.Component {
    render() {
        return (
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
            <div>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Header />
                    <Menu />
                    <ItemCard />
                </Grid>
            </div>
        )
    }
}

export default Index;
