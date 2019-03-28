import Loading from '../components/Loading';
import SignOut from '../components/SignOut';

class UserPortal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        this.setState({loading: false})
    }

    renderUserPortal() {
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <div>
                    <div>You should see this if you're a user.</div>
                    <SignOut/>
                </div>
            )
        }
    }

    render() {
        return this.renderUserPortal();
    }
}

export default UserPortal;
