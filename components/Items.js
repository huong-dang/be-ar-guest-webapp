import axios from 'axios';
import Loading from './Loading';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import assign from 'lodash/assign';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ITEMS_UPDATABALE_FIELDS} from '../misc/FieldNames';
import errorHandler from '../misc/errors-handler';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    selector:           {
        display:       'flex',
        flexDirection: 'column',
        minWidth:      '150px',
        marginRight:   theme.spacing.unit * 2
    },
    selectorsContainer: {
        display:       'flex',
        flexDirection: 'row',
        marginTop:     theme.spacing.unit,
        justifyContent: 'space-between'
    },
    messageContainer: {
        marginTop: theme.spacing.unit
    }
});

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:           [],
            loading:         true,
            selectedItemID:  null,
            selectedItem:    {},
            editItem:        false,
            refresh:         false,
            editItemMessage: '',
            savingEdits:     false
        };
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/item/getAll');
            this.setState({items: result.data, loading: false});
        } catch (e) {
            this.setState({loading: false});
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refresh && this.state.refresh !== prevState.refresh) {
            this.setState({loading: true});
            const result = await axios.post('/item/getAll');
            this.setState({items: result.data, loading: false, refresh: false});
        }
    }

    handleToolbarClick = prop => event => {
        switch (prop) {
            case 'add':
                console.log('add an item!!!!');
                break;
            case 'refresh':
                this.setState({refresh: true});
                break;
        }
    };

    handleEditItemClose = prop => {
        this.setState({editItem: false, savingEdits: false, editItemMessage: ''});
    };

    handleEditItemSave = async () => {
        try {
            this.setState({savingEdits: true});
            const item = this.state.items.find(item => item.itemID === this.state.selectedItem.itemID);

            // Check with item field(s) were changed
            const contentToBeUpdated = reduce(this.state.selectedItem, (result, value, key) => {
                if (value !== item[key] && ITEMS_UPDATABALE_FIELDS.find(field => field === key)) {
                    result.push({
                                    fieldName:  key,
                                    newContent: value,
                                    itemID:     this.state.selectedItem.itemID
                                });
                }
                return result;
            }, []);

            let errors    = [];
            let successes = [];
            const results = await Promise.all(map(contentToBeUpdated, (itemInfo) => axios.post('/item/update', itemInfo)));

            results.forEach((result, index) => {
                if (result.data.success) {
                    successes.push(contentToBeUpdated[index].fieldName);
                } else {
                    errors.push({field: contentToBeUpdated[index].fieldName, error: result.data.error});
                }
            });

            let message;

            if (successes.length > 0) {
                message = reduce(successes, (result, field, index) => {
                    result += field + (index !== successes.length - 1 ? ', ' : '. ');
                    return result;
                }, 'Successfully updated these fields: ');
            }

            if (errors.length > 0) {
                const errorMessage = reduce(errors, (result, e, index) => {
                    result += e.field + ' (' + e.error + ')' + (index !== errors.length - 1 ? ', ' : '.');

                    return result;
                }, 'Error(s) with these updates: ');

                message = message ? message + errorMessage : errorMessage;
            }

            this.setState({savingEdits: false, editItemMessage: message ? message : '', refresh: true});
        } catch (e) {
            this.setState({savingEdits: false, editItemMessage: errorHandler.getErrorMessage(e)});
        }
    };

    renderItemsTable() {
        const columns = [
            {
                name:    'ID',
                options: {
                    display: false
                }
            },
            'Park',
            'Land',
            'Restaurant',
            'Name',
            {
                name:    'Description',
                options: {
                    filter:           false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div style={{minWidth: 350}}>
                                <Typography style={{fontSize: '13px'}}>
                                    {value}
                                </Typography>
                            </div>
                        );
                    },
                }
            },
            'Substitution',
            'Status',
            'Secret',
            'Vegan',
        ];
        const data    = this.state.items.map((item) => {
            return [
                item.itemID,
                item.parkName,
                item.landName,
                item.restaurantName,
                item.itemName,
                item.itemDescription ? item.itemDescription : '',
                item.substitution ? item.substitution : '',
                item.itemStatus,
                item.secret ? 'Yes' : 'No',
                item.vegan ? 'Yes' : 'No'
            ];
        });
        const options = {
            filterType:     'multiselect',
            responsive:     'scroll',
            print:          false,
            selectableRows: true,
            onRowClick:     (rowData, rowMeta) => {
                const selectedItem = this.state.items.find(item => item.itemID === rowData[0]);
                this.setState({
                                  selectedItemID: rowData[0],
                                  editItem:       true,
                                  selectedItem:   selectedItem
                              });
            },
            customToolbar:  () => {
                return (
                    <React.Fragment>
                        <Tooltip title={"Refresh"}>
                            <IconButton onClick={this.handleToolbarClick('refresh')}>
                                <RefreshIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Add Item"}>
                            <IconButton style={{backgroundColor: '#C9BEDE'}} onClick={this.handleToolbarClick('add')}>
                                <AddIcon/>
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
        )
    }

    handleEdit = prop => event => {
        this.setState({
                          selectedItem: assign({},
                                               this.state.selectedItem,
                                               {[prop]: event.target.value})
                      });
    };

    renderEditItem() {
        if (!this.state.editItem) {
            return null;
        }
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.editItem}
                onClose={this.handleEditItemClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="customized-dialog-title" onClose={this.handleEditItemClose}>Update Item</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.selectedItem.itemName}
                        onChange={this.handleEdit('itemName')}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        multiline
                        fullWidth
                        value={this.state.selectedItem.itemDescription}
                        onChange={this.handleEdit('itemDescription')}
                    />
                    <TextField
                        margin="dense"
                        label="Substitution"
                        type="text"
                        fullWidth
                        multiline
                        value={this.state.selectedItem.substitution}
                        onChange={this.handleEdit('substitution')}
                    />
                    <div className={classes.selectorsContainer}>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                value={this.state.selectedItem.itemStatus}
                                onChange={this.handleEdit('itemStatus')}
                                inputProps={{
                                    name: 'status',
                                    id:   'status',
                                }}
                            >
                                <MenuItem value={'AVAILABLE'}>Available</MenuItem>
                                <MenuItem value={'UNAVAILABLE'}>Unavailable</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="vegan">Vegan</InputLabel>
                            <Select
                                value={this.state.selectedItem.vegan ? true : false}
                                onChange={this.handleEdit('vegan')}
                                inputProps={{
                                    name: 'vegan',
                                    id:   'vegan',
                                }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.selector}>
                            <InputLabel htmlFor="secret">Secret</InputLabel>
                            <Select
                                value={this.state.selectedItem.secret ? true : false}
                                onChange={this.handleEdit('secret')}
                                inputProps={{
                                    name: 'secret',
                                    id:   'secret',
                                }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.messageContainer}>
                        <Typography>
                            {this.state.editItemMessage}
                        </Typography>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleEditItemSave} color="primary" disabled={this.state.savingEdits}>
                        {this.state.savingEdits ? <CircularProgress size={24}/> : 'Save'}
                    </Button>
                    <Button onClick={this.handleEditItemClose} color="secondary" disabled={this.state.savingEdits}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <div style={{margin: 0, padding: 0}}>
                    {this.renderItemsTable()}
                    {this.renderEditItem()}
                </div>
            );
        }
    }
}

const DialogTitle = withStyles(theme => ({
    root:        {
        margin:  0,
        padding: theme.spacing.unit * 2
    },
    closeButton: {
        position: 'absolute',
        right:    theme.spacing.unit,
        top:      theme.spacing.unit,
        color:    theme.palette.grey[500],
    },
}))(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" align="center">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

Items.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Items);
