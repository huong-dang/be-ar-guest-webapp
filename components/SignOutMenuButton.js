import Router from "next/router";
import {signOut} from '../services/accounts';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Person from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import Loading from './Loading';

class SignOutMenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleSignOut = async () => {
        try {
            this.setState({loading: true});
            localStorage.clear();
            await signOut();
            this.setState({loading: false});
            Router.push('/');
        } catch (e) {
            console.log('Error signing out.', e);
            this.setState({loading: false});
        }
    };

    render() {
        if (this.state.loading) {
            return <Loading/>
        } else {
            return (
                <ListItem button onClick={this.handleSignOut}>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                </ListItem>
            )
        }
    }
}

export default SignOutMenuButton;
