import axios from 'axios';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Menu from '../components/Menu';
import Header from '../components/Header';

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
                <Header />
                <Menu />
            </div>
        )
    }
}

export default Index;
