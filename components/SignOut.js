import Router from "next/router";
import Button from '@material-ui/core/Button';
import {signOut} from '../services/accounts';

function SignOut() {
    const handleSignOut = async () => {
        try {
            localStorage.clear();
            await signOut();
            Router.push('/');
        } catch (e) {
            console.log('Error signing out.', e);
        }
    };

    return (
        <Button color={'secondary'} variant={'outlined'} onClick={handleSignOut}>
            Sign Out
        </Button>
    )
}

export default SignOut;
