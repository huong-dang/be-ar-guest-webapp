import axios from "axios";
import Loading from "./Loading";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddOneIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import assign from "lodash/assign";
import reduce from "lodash/reduce";
import map from "lodash/map";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RESTAURANTS_UPDATABLE_FIELDS } from "../misc/FieldNames";
import errorHandler from "../misc/errors-handler";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
    selector: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing.unit,
        [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
            marginRight: theme.spacing.unit * 2,
            minWidth: "110px"
        }
    },
    selectorsContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing.unit,
        [theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
            display: "flex",
            flexDirection: "row",
            marginRight: theme.spacing.unit * 2
        }
    },
    messageContainer: {
        marginTop: theme.spacing.unit * 2
    },
    dialogContainer: {
        minWidth: "1000"
    }
});

const newRestaurantTemplate = {
    landID: null,
    restaurantName: "",
    restaurantStatus: "",
    restaurantTypeID: null
};

class RestaurantManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants:             [],
            lands:                   [],
            loading:                 true,
            selectedRestaurantID:    null,
            selectedRestaurant:      {},
            editRestaurant:          false,
            restaurantTypes:         [],
            refresh:                 false,
            editRestaurantMessage:   "",
            saving:                  false,
            addNewRestaurant:        false,
            newRestaurant:           newRestaurantTemplate,
            addNewRestaurantMessage: ""
        };
    }

    async componentDidMount() {
        try {
            const restaurants = await axios.get(
                "/restaurant/getAllRestaurantsInfoForAdmin"
            );
            const restaurantTypes = await axios.get("/restaurantType/getAll");
            const lands = await axios.post("/land/getAll");

            this.setState({
                restaurants: restaurants.data,
                loading: false,
                restaurantTypes: restaurantTypes.data,
                lands: lands.data
            });
        } catch (e) {
            this.setState({ loading: false });
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refresh && this.state.refresh !== prevState.refresh) {
            this.setState({ loading: true });
            const restaurants = await axios.get(
                "/restaurant/getAllRestaurantsInfoForAdmin"
            );
            this.setState({
                restaurants: restaurants.data,
                loading: false,
                refresh: false,
                newRestaurant: newRestaurantTemplate
            });
        }
    }

    handleToolbarClick = prop => event => {
        switch (prop) {
            case "add":
                this.setState({ addNewRestaurant: true });
                break;
            case "refresh":
                this.setState({ refresh: true });
                break;
        }
    };

    handleEditRestaurantClose = prop => {
        this.setState({ editRestaurant: false, saving: false, editRestaurantMessage: "" });
    };

    handleAddRestaurantClose = prop => {
        this.setState({
            addNewRestaurant: false,
            saving: false,
            addNewRestaurantMessage: "",
            newRestaurant: newRestaurantTemplate
        });
    };

    handleAddRestaurantSave = async () => {
        try {
            this.setState({ saving: true });
            const result = await axios.post(
                "/restaurant/add",
                this.state.newRestaurant
            );
            this.setState({
                saving: false,
                addNewRestaurantMessage: result.data.error
                    ? "Error adding restaurant: " + result.data.error
                    : "Successfully added new restaurant!",
                refresh: true
            });
        } catch (e) {
            this.setState({
                saving: false,
                addNewRestaurantMessage: errorHandler.getErrorMessage(e)
            });
        }
    };

    handleEditRestaurantSave = async () => {
        try {
            this.setState({ saving: true });
            const restaurant = this.state.restaurants.find(
                r => r.restaurantID === this.state.selectedRestaurant.restaurantID
            );

            // Check with item field(s) were changed
            const contentToBeUpdated = reduce(
                this.state.selectedRestaurant,
                (result, value, key) => {
                    if (
                        value !== restaurant[key] &&
                        RESTAURANTS_UPDATABLE_FIELDS.find(field => field === key)
                    ) {
                        result.push({
                            fieldName: key,
                            newContent: value,
                            restaurantID: this.state.selectedRestaurant.restaurantID
                        });
                    }
                    return result;
                },
                []
            );

            let errors = [];
            let successes = [];
            const results = await Promise.all(
                map(contentToBeUpdated, itemInfo =>
                    axios.post("/restaurant/update", itemInfo)
                )
            );

            results.forEach((result, index) => {
                if (result.data.success) {
                    successes.push(contentToBeUpdated[index].fieldName);
                } else {
                    errors.push({
                        field: contentToBeUpdated[index].fieldName,
                        error: result.data.error
                    });
                }
            });

            let message;

            if (successes.length > 0) {
                message = reduce(
                    successes,
                    (result, field, index) => {
                        result +=
                            field +
                            (index !== successes.length - 1 ? ", " : ". ");
                        return result;
                    },
                    "Successfully updated these fields: "
                );
            }

            if (errors.length > 0) {
                const errorMessage = reduce(
                    errors,
                    (result, e, index) => {
                        result +=
                            e.field +
                            " (" +
                            e.error +
                            ")" +
                            (index !== errors.length - 1 ? ", " : ".");

                        return result;
                    },
                    "Error(s) with these updates: "
                );

                message = message ? message + errorMessage : errorMessage;
            }

            this.setState({
                saving:                false,
                editRestaurantMessage: message ? message : "",
                refresh:               true
            });
        } catch (e) {
            this.setState({
                saving:                false,
                editRestaurantMessage: errorHandler.getErrorMessage(e)
            });
        }
    };

    renderRestaurantsTable() {
        const columns = [
            {
                name: "ID",
                options: {
                    display: false
                }
            },
            "Name",
            "Type",
            "Status",
            "Land",
            "Park"
        ];
        const data = this.state.restaurants.map(restaurant => {
            return [
                restaurant.restaurantID,
                restaurant.restaurantName,
                restaurant.restaurantTypeName,
                restaurant.restaurantStatus,
                restaurant.landName,
                restaurant.parkName
            ];
        });
        const options = {
            filterType: "multiselect",
            responsive: "scroll",
            print: false,
            selectableRows: true,
            onRowClick: (rowData, rowMeta) => {
                const selectedRestaurant = this.state.restaurants.find(
                    r => r.restaurantID === rowData[0]
                );
                console.log('selectedRestaurant', selectedRestaurant);
                this.setState({
                    selectedRestaurantID: rowData[0],
                    editRestaurant: true,
                    selectedRestaurant: selectedRestaurant
                });
            },
            customToolbar: () => {
                return (
                    <React.Fragment>
                        <Tooltip title={"Refresh"}>
                            <IconButton
                                onClick={this.handleToolbarClick("refresh")}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Add Restaurant"}>
                            <IconButton
                                style={{
                                    backgroundColor: "#C9BEDE",
                                    color: "#fff"
                                }}
                                onClick={this.handleToolbarClick("add")}
                            >
                                <AddOneIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                );
            }
        };

        return (
            <MUIDataTable
                title={"Restaurants"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }

    handleEdit = prop => event => {
        this.setState({
            selectedRestaurant: assign({}, this.state.selectedRestaurant, {
                [prop]: event.target.value
            })
        });
    };

    handleAdd = prop => event => {
        this.setState({
            newRestaurant: assign({}, this.state.newRestaurant, {
                [prop]: event.target.value
            })
        });
    };

    renderEditRestaurant() {
        if (!this.state.editRestaurant) {
            return null;
        }
        const { classes } = this.props;
        let restaurantTypeOptions = this.state.restaurantTypes.map(r => {
            return (
                <MenuItem value={r.restaurantTypeID} key={r.restaurantTypeID}>
                    {r.restaurantTypeName}
                </MenuItem>
            );
        });
        restaurantTypeOptions.unshift(
            <MenuItem value={-1} key={-1}>
                Select a restaurant type
            </MenuItem>
        );
        let landOptions = this.state.lands.map(l => {
            return (
                <MenuItem value={l.landID} key={l.landID}>
                    {l.landName}
                </MenuItem>
            );
        });
        landOptions.unshift(
            <MenuItem value={-1} key={-1}>
                Select a land
            </MenuItem>
        );

        return (
            <Dialog
                open={this.state.editRestaurant}
                onClose={this.handleEditRestaurantClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleEditRestaurantClose}
                >
                    Edit Restaurant
                </DialogTitle>
                <DialogContent>
                    <div className={classes.selector}>
                        <InputLabel htmlFor="restaurantTypeID">
                            Restaurant Type
                        </InputLabel>
                        <Select
                            value={
                                this.state.selectedRestaurant.restaurantTypeID
                                    ? this.state.selectedRestaurant.restaurantTypeID
                                    : -1
                            }
                            onChange={this.handleEdit("restaurantTypeID")}
                            inputProps={{
                                name: "restaurantTypeID",
                                id: "restaurantTypeID"
                            }}
                        >
                            {restaurantTypeOptions}
                        </Select>
                    </div>
                    <div className={classes.selector}>
                        <InputLabel htmlFor="landID">Land Name</InputLabel>
                        <Select
                            value={
                                this.state.selectedRestaurant.landID
                                    ? this.state.selectedRestaurant.landID
                                    : -1
                            }
                            onChange={this.handleEdit("landID")}
                            inputProps={{
                                name: "landID",
                                id: "landID"
                            }}
                        >
                            {landOptions}
                        </Select>
                    </div>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.selectedRestaurant.restaurantName}
                        onChange={this.handleEdit("restaurantName")}
                    />
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                value={
                                    this.state.selectedRestaurant.restaurantStatus
                                }
                                onChange={this.handleEdit("restaurantStatus")}
                                inputProps={{
                                    name: "status",
                                    id: "status"
                                }}
                            >
                                <MenuItem value={"AVAILABLE"}>
                                    Available
                                </MenuItem>
                                <MenuItem value={"UNAVAILABLE"}>
                                    Unavailable
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.messageContainer}>
                        <Typography>
                            {this.state.editRestaurantMessage}
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleEditRestaurantSave}
                        color="primary"
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Save"
                        )}
                    </Button>
                    <Button
                        onClick={this.handleEditRestaurantClose}
                        color="secondary"
                        disabled={this.state.saving}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderAddRestaurant() {
        if (!this.state.addNewRestaurant) {
            return null;
        }
        const { classes } = this.props;
        let restaurantTypeOptions = this.state.restaurantTypes.map(r => {
            return (
                <MenuItem value={r.restaurantTypeID} key={r.restaurantTypeName}>
                    {r.restaurantTypeName}
                </MenuItem>
            );
        });
        restaurantTypeOptions.unshift(
            <MenuItem value={-1} key={-1}>
                Select a restaurant type
            </MenuItem>
        );
        let landOptions = this.state.lands.map(l => {
            return (
                <MenuItem value={l.landID} key={l.landID}>
                    {l.landName}
                </MenuItem>
            );
        });
        landOptions.unshift(
            <MenuItem value={-1} key={-1}>
                Select a land
            </MenuItem>
        );

        return (
            <Dialog
                open={this.state.addNewRestaurant}
                onClose={this.handleAddRestaurantClose}
                aria-labelledby="form-dialog-title"
                fullWidth
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleAddRestaurantClose}
                >
                    Add Restaurant
                </DialogTitle>
                <DialogContent>
                    <div className={classes.selector}>
                        <InputLabel htmlFor="restaurantTypeID">
                            Restaurant Type
                        </InputLabel>
                        <Select
                            value={
                                this.state.newRestaurant.restaurantTypeID
                                    ? this.state.newRestaurant.restaurantTypeID
                                    : -1
                            }
                            onChange={this.handleAdd("restaurantTypeID")}
                            inputProps={{
                                name: "restaurantTypeID",
                                id: "restaurantTypeID"
                            }}
                        >
                            {restaurantTypeOptions}
                        </Select>
                    </div>
                    <div className={classes.selector}>
                        <InputLabel htmlFor="landID">Land Name</InputLabel>
                        <Select
                            value={
                                this.state.newRestaurant.landID
                                    ? this.state.newRestaurant.landID
                                    : -1
                            }
                            onChange={this.handleAdd("landID")}
                            inputProps={{
                                name: "landID",
                                id: "landID"
                            }}
                        >
                            {landOptions}
                        </Select>
                    </div>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.newRestaurant.restaurantName}
                        onChange={this.handleAdd("restaurantName")}
                    />
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                value={
                                    this.state.newRestaurant.restaurantStatus
                                }
                                onChange={this.handleAdd("restaurantStatus")}
                                inputProps={{
                                    name: "status",
                                    id: "status"
                                }}
                            >
                                <MenuItem value={"AVAILABLE"}>
                                    Available
                                </MenuItem>
                                <MenuItem value={"UNAVAILABLE"}>
                                    Unavailable
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.messageContainer}>
                        <Typography>
                            {this.state.addNewRestaurantMessage}
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleAddRestaurantSave}
                        color="primary"
                        disabled={this.state.saving}
                    >
                        {this.state.saving ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Save"
                        )}
                    </Button>
                    <Button
                        onClick={this.handleAddRestaurantClose}
                        color="secondary"
                        disabled={this.state.saving}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        } else {
            // console.log("this.state", this.state);
            return (
                <div style={{ margin: 0, padding: 0 }}>
                    {this.renderRestaurantsTable()}
                    {this.renderEditRestaurant()}
                    {this.renderAddRestaurant()}
                </div>
            );
        }
    }
}

const DialogTitle = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500]
    }
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" align="center">
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="Close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

RestaurantManagement.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RestaurantManagement);
