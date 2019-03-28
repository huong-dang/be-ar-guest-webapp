import axios from 'axios';
import Button from '@material-ui/core/Button';
import {signOut, getCurrentUser} from '../services/accounts';
import Router from 'next/router';
import Loading from '../components/Loading';
import isNil from 'lodash/isNil';

class UserAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users:   [],
            isAdmin: false
        }
    }

    async componentDidMount() {
        try {
            if (!isNil(localStorage.uid)) {
                const user = await getCurrentUser();
                if (user.uid === localStorage.uid) {
                    const admin = await axios.post('profile/isAdmin', {uid: localStorage.uid});
                    if (admin.data) {
                        this.setState({loading: false, isAdmin: true})
                    } else {
                        Router.back();
                    }
                } else {
                    await signOut();
                    localStorage.clear();
                    Router.push('/signIn');
                }
            }
        } catch (e) {
            console.log('e', e);
        }
    }

    renderUserAccounts() {
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <div>
                    <div>You should only be able to see this if you're an admin!</div>
                </div>
            )
        }
    }

    render() {
        return this.renderUserAccounts();
    }
}

export default UserAccounts;
