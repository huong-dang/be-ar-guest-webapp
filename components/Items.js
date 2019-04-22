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
import AddMultipleIcon from "@material-ui/icons/AddToPhotos";
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
import { ITEMS_UPDATABALE_FIELDS } from "../misc/FieldNames";
import errorHandler from "../misc/errors-handler";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FlagOutlinedIcon from '@material-ui/icons/OutlinedFlag';
import FlagFilledIcon from '@material-ui/icons/Flag';

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
    }
});
const newItemTemplate = {
    restaurantID:    undefined,
    itemName:        "",
    itemDescription: "",
    secret:          false,
    vegan:           true,
    substitution:    "",
    itemStatus:      "AVAILABLE",
    x:               undefined,
    z:               undefined,
    pageNum:         undefined
};

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            selectedItemID: null,
            selectedItem: {},
            editItem: false,
            refresh: false,
            editItemMessage: "",
            saving: false,
            restaurants: [],
            addNewItem: false,
            newItem: newItemTemplate,
            addNewItemMessage: "",
            flaggedItems: []
        };
    }

    async componentDidMount() {
        try {
            const items = await axios.post("/item/getAll");
            const restaurants = await axios.get(
                "/restaurant/getAllRestaurants"
            );
            const flaggedItemIDs = await axios.post('/review/getAllUniqueFlaggedItems');
            this.setState({
                items: items.data,
                loading: false,
                restaurants: restaurants.data,
                flaggedItems: flaggedItemIDs.data
            });
        } catch (e) {
            this.setState({ loading: false });
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refresh && this.state.refresh !== prevState.refresh) {
            this.setState({ loading: true });
            const result = await axios.post("/item/getAll");
            this.setState({
                items: result.data,
                loading: false,
                refresh: false,
                newItem: newItemTemplate
            });
        }
    }

    handleToolbarClick = prop => event => {
        switch (prop) {
            case "addOne":
                this.setState({ addNewItem: true });
                break;
            case "refresh":
                this.setState({ refresh: true });
                break;
        }
    };

    handleEditItemClose = prop => {
        this.setState({ editItem: false, saving: false, editItemMessage: "" });
    };

    handleAddItemClose = prop => {
        this.setState({
            addNewItem: false,
            saving: false,
            editItemMessage: "",
            newItem: newItemTemplate
        });
    };

    handleAddItemSave = async () => {
        try {
            this.setState({ saving: true });
            const result = await axios.post("/item/add", this.state.newItem);

            this.setState({
                saving: false,
                addNewItemMessage: result.data.error
                    ? "Error adding item: " + result.data.error
                    : "Successfully added item!",
                refresh: true
            });
        } catch (e) {
            this.setState({
                saving: false,
                addNewItemMessage: errorHandler.getErrorMessage(e)
            });
        }
    };

    handleEditItemSave = async () => {
        try {
            this.setState({ saving: true });
            const item = this.state.items.find(
                item => item.itemID === this.state.selectedItem.itemID
            );

            // Check with item field(s) were changed
            const contentToBeUpdated = reduce(
                this.state.selectedItem,
                (result, value, key) => {
                    if (
                        value !== item[key] &&
                        ITEMS_UPDATABALE_FIELDS.find(field => field === key)
                    ) {
                        result.push({
                            fieldName: key,
                            newContent: value,
                            itemID: this.state.selectedItem.itemID
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
                    axios.post("/item/update", itemInfo)
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
                saving: false,
                editItemMessage: message ? message : "",
                refresh: true
            });
        } catch (e) {
            this.setState({
                saving: false,
                editItemMessage: errorHandler.getErrorMessage(e)
            });
        }
    };

    renderItemsTable() {
        const columns = [
            {
                name: "ID",
                options: {
                    display: false
                }
            },
            "Park",
            "Land",
            "Restaurant",
            "Name",
            "Flag",
            {
                name: "Description",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div style={{ minWidth: 350 }}>
                                <Typography style={{ fontSize: "13px" }}>
                                    {value}
                                </Typography>
                            </div>
                        );
                    }
                }
            },
            "Substitution",
            "Status",
            "Secret",
            "Vegan",
            "X-coordinate",
            "Z-coordinate",
            "Page Number"
        ];
        const data = this.state.items.map(item => {
            return [
                item.itemID,
                item.parkName,
                item.landName,
                item.restaurantName,
                item.itemName,
                this.state.flaggedItems.indexOf(item.itemID) > -1 ? <FlagFilledIcon style={{ color: '#CC0000' }} /> : <FlagOutlinedIcon/>,
                item.itemDescription ? item.itemDescription : "",
                item.substitution ? item.substitution : "",
                item.itemStatus,
                item.secret ? "Yes" : "No",
                item.vegan ? "Yes" : "No",
                item.x ? item.x : "N/A",
                item.z ? item.z : "N/A",
                item.pageNum ? item.pageNum : "N/A",
            ];
        });
        const options = {
            filterType: "multiselect",
            responsive: "scroll",
            print: false,
            selectableRows: true,
            onRowClick: (rowData, rowMeta) => {
                const selectedItem = this.state.items.find(
                    item => item.itemID === rowData[0]
                );
                this.setState({
                    selectedItemID: rowData[0],
                    editItem: true,
                    selectedItem: selectedItem
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
                        <Tooltip title={"Add Item"}>
                            <IconButton
                                style={{
                                    backgroundColor: "#C9BEDE",
                                    color: "#fff"
                                }}
                                onClick={this.handleToolbarClick("addOne")}
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
                title={"Menu Items"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }

    handleEdit = prop => event => {
        this.setState({
            selectedItem: assign({}, this.state.selectedItem, {
                [prop]: event.target.value
            })
        });
    };

    handleAdd = prop => event => {
        this.setState({
            newItem: assign({}, this.state.newItem, {
                [prop]: event.target.value
            })
        });
    };

    renderEditItem() {
        if (!this.state.editItem) {
            return null;
        }
        const { classes } = this.props;
        return (
            <Dialog
                open={this.state.editItem}
                onClose={this.handleEditItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleEditItemClose}
                >
                    Update Item
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.selectedItem.itemName ? this.state.selectedItem.itemName : ""}
                        onChange={this.handleEdit("itemName")}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        multiline
                        fullWidth
                        value={this.state.selectedItem.itemDescription ? this.state.selectedItem.itemDescription : ""}
                        onChange={this.handleEdit("itemDescription")}
                    />
                    <TextField
                        margin="dense"
                        label="Substitution"
                        type="text"
                        fullWidth
                        multiline
                        value={this.state.selectedItem.substitution ? this.state.selectedItem.substitution : ""}
                        onChange={this.handleEdit("substitution")}
                    />
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <TextField
                                margin="dense"
                                label="X-coordinate"
                                type="number"
                                fullWidth
                                multiline
                                value={this.state.selectedItem.x ? this.state.selectedItem.x : undefined}
                                onChange={this.handleEdit("x")}
                            />
                        </div>
                        <div className={classes.selector}>
                            <TextField
                                margin="dense"
                                label="Z-coordinate"
                                type="number"
                                fullWidth
                                multiline
                                value={this.state.selectedItem.z ? this.state.selectedItem.z : undefined}
                                onChange={this.handleEdit("z")}
                            />
                        </div>
                        <div className={classes.selector}>
                            <TextField
                                margin="dense"
                                label="Page Number"
                                type="number"
                                fullWidth
                                multiline
                                value={this.state.selectedItem.pageNum ? this.state.selectedItem.pageNum : undefined}
                                onChange={this.handleEdit("pageNum")}
                            />
                        </div>
                    </div>
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                value={this.state.selectedItem.itemStatus}
                                onChange={this.handleEdit("itemStatus")}
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
                        <div className={classes.selector}>
                            <InputLabel htmlFor="vegan">Vegan</InputLabel>
                            <Select
                                value={
                                    this.state.selectedItem.vegan ? true : false
                                }
                                onChange={this.handleEdit("vegan")}
                                inputProps={{
                                    name: "vegan",
                                    id: "vegan"
                                }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="secret">Secret</InputLabel>
                            <Select
                                value={
                                    this.state.selectedItem.secret
                                        ? true
                                        : false
                                }
                                onChange={this.handleEdit("secret")}
                                inputProps={{
                                    name: "secret",
                                    id: "secret"
                                }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.messageContainer}>
                        <Typography>{this.state.editItemMessage}</Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleEditItemSave}
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
                        onClick={this.handleEditItemClose}
                        color="secondary"
                        disabled={this.state.saving}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    renderAddItem() {
        if (!this.state.addNewItem) {
            return null;
        }
        const { classes } = this.props;
        let restaurantOptions = this.state.restaurants.map(r => {
            return (
                <MenuItem value={r.restaurantID} key={r.restaurantID}>
                    {r.restaurantName}
                </MenuItem>
            );
        });

        restaurantOptions.unshift(
            <MenuItem value={-1} key={-1}>
                Select a restaurant
            </MenuItem>
        );

        return (
            <Dialog
                open={this.state.addNewItem}
                onClose={this.handleAddItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleAddItemClose}
                >
                    Add Item
                </DialogTitle>
                <DialogContent>
                    <div className={classes.selector}>
                        <InputLabel htmlFor="status">Restaurant</InputLabel>
                        <Select
                            value={
                                this.state.newItem.restaurantID
                                    ? this.state.newItem.restaurantID
                                    : -1
                            }
                            onChange={this.handleAdd("restaurantID")}
                            inputProps={{
                                name: "restaurant",
                                id: "restaurant"
                            }}
                        >
                            {restaurantOptions}
                        </Select>
                    </div>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.newItem.itemName ? this.state.newItem.itemName : ""}
                        onChange={this.handleAdd("itemName")}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        multiline
                        fullWidth
                        value={this.state.newItem.itemDescription ? this.state.newItem.itemDescription : ""}
                        onChange={this.handleAdd("itemDescription")}
                    />
                    <TextField
                        margin="dense"
                        label="Substitution"
                        type="text"
                        fullWidth
                        multiline
                        value={this.state.newItem.substitution ? this.state.newItem.substitution : ""}
                        onChange={this.handleAdd("substitution")}
                    />
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <TextField
                                margin="dense"
                                label="X-coordinate"
                                type="number"
                                fullWidth
                                multiline
                                value={this.state.newItem.x}
                                onChange={this.handleAdd("x")}
                            />
                        </div>
                        <div className={classes.selector}>
                            <TextField
                                margin="dense"
                                label="Z-coordinate"
                                type="number"
                                fullWidth
                                multiline
                                value={this.state.newItem.z}
                                onChange={this.handleAdd("z")}
                            />
                        </div>
                        <div className={classes.selector}>
                            <TextField
                                margin="dense"
                                label="Page Number"
                                type="number"
                                fullWidth
                                multiline
                                value={this.state.newItem.pageNum}
                                onChange={this.handleAdd("pageNum")}
                            />
                        </div>
                    </div>
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                value={this.state.newItem.itemStatus}
                                onChange={this.handleAdd("itemStatus")}
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
                        <div className={classes.selector}>
                            <InputLabel htmlFor="vegan">Vegan</InputLabel>
                            <Select
                                value={this.state.newItem.vegan ? true : false}
                                onChange={this.handleAdd("vegan")}
                                inputProps={{
                                    name: "vegan",
                                    id: "vegan"
                                }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="secret">Secret</InputLabel>
                            <Select
                                value={this.state.newItem.secret ? true : false}
                                onChange={this.handleAdd("secret")}
                                inputProps={{
                                    name: "secret",
                                    id: "secret"
                                }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.messageContainer}>
                        <Typography>{this.state.addNewItemMessage}</Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleAddItemSave}
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
                        onClick={this.handleAddItemClose}
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
            return (
                <div style={{ margin: 0, padding: 0 }}>
                    {this.renderItemsTable()}
                    {this.renderEditItem()}
                    {this.renderAddItem()}
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

Items.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Items);
