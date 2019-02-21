import axios from 'axios';
import Button from '@material-ui/core/Button';
import {signOut, getCurrentUser} from '../services/accounts';
import Router from 'next/router';
import Loading from '../components/Loading';
import isNil from 'lodash/isNil';
import Link from 'next/link';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        try {
            if (!isNil(localStorage.uid)) {
                const user = await getCurrentUser();
                if (user.uid === localStorage.uid) {
                    this.setState({loading: false})
                } else {
                    await signOut();
                    localStorage.clear();
                    Router.push('/');
                }
            }
        } catch (e) {
            console.log('e', e);
        }
    }

    handleSubmit = async () => {
        try {
            await signOut();
            Router.push('/');
        } catch (e) {
            console.log('Error signing out.', e);
        }
    };

    renderHomePage() {
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <div>
                    <div>
                        You're logged in!
                    </div>
                    <Link href={'/userAccounts'}>
                        <Button>
                            user accounts
                        </Button>
                    </Link>
                    <Button color={'secondary'} variant={'outlined'} onClick={this.handleSubmit}>
                        Sign Out
                    </Button>
                </div>
            )
        }
    }

    render() {
        return this.renderHomePage();
    }
}

export default Home;
