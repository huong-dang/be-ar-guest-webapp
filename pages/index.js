import Button from '@material-ui/core/Button';
import Link from 'next/link';

class Index extends React.Component {
    render() {
        return (
            <div>
                <Link href={'/signUp'}>
                    <Button color={'primary'} variant={'outlined'}>
                        Sign Up
                    </Button>
                </Link>
                <Link href={'/signIn'}>
                    <Button color={'secondary'} variant={'outlined'}>
                        Sign In
                    </Button>
                </Link>
            </div>
        )
    }
}

export default Index;
