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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    main:   {
        width:                                                    'auto',
        display:                                                  'block', // Fix IE 11 issue.
        marginLeft:                                               theme.spacing.unit * 3,
        marginRight:                                              theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width:       400,
            marginLeft:  'auto',
            marginRight: 'auto',
        },
    },
    paper:  {
        marginTop:     theme.spacing.unit * 8,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        padding:       `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin:          theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form:   {
        width:     '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:          [],
            loading:        true,
            selectedItemID: null,
            selectedItem:   {},
            editItem:       false,
            refresh:        false
        };
    }

    async componentDidMount() {
        try {
            const result = await axios.post('/item/getAll');
            this.setState({items: result.data, loading: false});
            console.log(this.state);
        } catch (e) {
            this.setState({loading: false});
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.refresh && this.state.refresh !== prevState.refresh) {
            this.setState({loading: true})
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

    handleEditItemClose = () => {
        this.setState({editItem: false})
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
                item.itemDescription,
                item.substitution,
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

    renderEditItem() {
        if (!this.state.editItem) {
            return null;
        }
        return (
            <div>
                <Dialog
                    open={this.state.editItem}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.selectedItem.itemName}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleEditItemClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEditItemClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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

Items.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Items);
