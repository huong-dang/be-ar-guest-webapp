import axios from 'axios';
import Button from '@material-ui/core/Button';
import {signOut} from '../services/accounts';
import Router from 'next/router'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = async () => {
        try {
            await signOut();
            Router.push('/');
        } catch (e) {
            console.log('Error signing out.', e);
        }
    }

    render() {
        return (
            <div>
                <div>
                    You're logged in!
                </div>
                <Button color={'secondary'} variant={'outlined'} onClick={this.handleSubmit}>
                    Sign Out
                </Button>
            </div>
        )
    }
}

export default Home;
