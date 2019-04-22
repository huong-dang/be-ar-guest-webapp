import axios from "axios";
import Loading from "./Loading";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
    selector:           {
        display:                                                  "flex",
        flexDirection:                                            "column",
        marginTop:                                                theme.spacing.unit,
        [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
            marginRight: theme.spacing.unit * 2,
            minWidth:    "110px"
        }
    },
    selectorsContainer: {
        display:                                                  "flex",
        flexDirection:                                            "column",
        marginTop:                                                theme.spacing.unit,
        [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
            display:       "flex",
            flexDirection: "row",
            marginRight:   theme.spacing.unit * 2
        }
    },
    messageContainer:   {
        marginTop: theme.spacing.unit * 2
    },
    dialogContainer:    {
        minWidth: "1000"
    }
});

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:        [],
            selectedUser: null
        };
    }

    async componentDidMount() {
        try {
            const profiles = await axios.post(
                "/profile/getAllProfiles");

            this.setState({
                              users:   profiles.data,
                              loading: false
                          });
        } catch (e) {
            this.setState({loading: false});
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refresh && this.state.refresh !== prevState.refresh) {
            this.setState({loading: true});
            const profiles = await axios.post(
                "/profile/getAllProfiles");

            this.setState({
                              users:   profiles.data,
                              loading: false
                          });
        }
    }

    handleToolbarClick = prop => event => {
        switch (prop) {
            case "refresh":
                this.setState({refresh: true});
                break;
        }
    };

    renderUsersTable() {
        const columns = [
            {
                name:    "ID",
                options: {
                    display: false
                }
            },
            {
                name:    "Role",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const newRole = value === 'user' ? 'admin' : value === 'admin' ? 'user' : 'user';
                        return (
                            <Button onClick={async () => {
                                const result = await
                                    axios.post('profile/updateRole',
                                               {
                                                   uid:     tableMeta.rowData[0],
                                                   newRole: newRole
                                               });
                                updateValue(newRole);
                            }}>
                                {value}
                            </Button>
                        );
                    }
                }
            },
            "First Name",
            "Last Name",
            "Email",
            "Status",
        ];
        const data    = this.state.users.map(user => {
            return [
                user.userID,
                user.role,
                user.fName,
                user.lName,
                user.email,
                user.userStatus,
            ];
        });
        const options = {
            filterType:    "multiselect",
            responsive:    "scroll",
            print:         false,
            customToolbar: () => {
                return (
                    <React.Fragment>
                        <Tooltip title={"Refresh"}>
                            <IconButton
                                onClick={this.handleToolbarClick("refresh")}
                            >
                                <RefreshIcon/>
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                );
            }
        };

        return (
            <MUIDataTable
                title={"Users"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }

    render() {
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <div style={{margin: 0, padding: 0}}>
                    {this.renderUsersTable()}
                </div>
            );
        }
    }
}

UserManagement.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserManagement);
