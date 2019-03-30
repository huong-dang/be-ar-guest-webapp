import Router from "next/router";
import {signOut} from '../services/accounts';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Person from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';

function SignOutMenuButton() {
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
        <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
                <Person/>
            </ListItemIcon>
            <ListItemText primary="Sign Out"/>
        </ListItem>
    )
}

export default SignOutMenuButton;
