import axios from "axios";
import Button from "@material-ui/core/Button";
import { signOut, getCurrentUser } from "../services/accounts";
import Router from "next/router";
import Loading from "../components/Loading";
import isNil from "lodash/isNil";
import Dashboard from "../components/Dashboard";
import SignOut from "../components/SignOut";

class AdminPortal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isAdmin: false
        };
    }

    userIsAdmin = async uid => {
        try {
            const admin = await axios.post("profile/isAdmin", { uid: uid });
            return admin.data;
        } catch (e) {
            throw e;
        }
    };

    authorizedUser = async () => {
        try {
            const user = await getCurrentUser();
            return user && user.uid === localStorage.uid;
        } catch (e) {
            throw e;
        }
    };

    async componentDidMount() {
        try {
            const isAuthorizedUser = await this.authorizedUser();
            const isAdmin = await this.userIsAdmin(localStorage.uid);
            if (!isNil(localStorage.uid) && isAuthorizedUser && isAdmin) {
                this.setState({ loading: false });
            } else {
                localStorage.clear();
                // User is not logged in
                await signOut();
                Router.push("/signIn");
            }
        } catch (e) {
            console.log("An error occurred", e);
        }
    }

    renderAdminPortal() {
        if (this.state.loading) {
            return <Loading />;
        } else {
            return <Dashboard />;
        }
    }

    render() {
        return this.renderAdminPortal();
    }
}

export default AdminPortal;
