import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Loading from './Loading';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

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
            items:   [],
            loading: true,
        }
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

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return <Loading/>;
        } else {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Substitution</TableCell>
                            <TableCell align="right">Secret</TableCell>
                            <TableCell align="right">Vegan</TableCell>
                            {/*<TableCell align="right">Restaurant</TableCell>*/}
                            {/*<TableCell align="right">Park</TableCell>*/}
                            {/*<TableCell align="right">Land</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.items.map(i => (
                            <TableRow key={i.itemID}>
                                <TableCell component="th" scope="row">
                                    {i.itemName}
                                </TableCell>
                                <TableCell align="right">{i.itemDescription}</TableCell>
                                <TableCell align="right">{i.itemStatus}</TableCell>
                                <TableCell align="right">{i.substitution}</TableCell>
                                <TableCell align="right">{i.secret ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{i.vegan ? 'Yes' : 'No'}</TableCell>
                                {/*<TableCell align="right">{i.restaurantName}</TableCell>*/}
                                {/*<TableCell align="right">{i.parkName}</TableCell>*/}
                                {/*<TableCell align="right">{i.landName}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        }
    }

}


Items.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Items);
