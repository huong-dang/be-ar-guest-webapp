import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import TripIcon from '@material-ui/icons/DateRangeOutlined';
import FlagIcon from '@material-ui/icons/OutlinedFlag';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    card:         {
        width:        250,
        height:       250,
        borderRadius: 20,
        position: 'relative'
    },
    title:        {
        fontSize:   16,
        textAlign:  'center',
        fontFamily: 'Avenir',
        fontWeight: '500',
        lineHeight: 1.2,
        marginTop:  8,
    },
    description:  {
        fontSize:   12.5,
        fontFamily: 'Avenir',
        textAlign:  'center',
        lineHeight: 1.4,
        marginTop:  5,
    },
    alterations: {
        fontSize: 12.5,
        textAlign: 'left',
        lineHeight: 1.4,
        marginTop: 5,
        marginLeft: 13,
        fontWeight: 500,
    },
    alterationsDescription: {
        fontSize: 12.5,
        lineHeight: 1.4,
        marginTop: 5,
        marginLeft: 3,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    expandButton:   {
        borderRadius: 10,
        position: 'absolute',
        marginTop: 25,
        marginLeft: 55,
    },
    expandButtonText:   {
        fontFamily: 'Avenir',
        fontSize: 12.5,
    },
    // Dialog Styles
    dialogItemTitle: {
        fontSize:   16,
        fontWeight: '400',
        lineHeight: 1.2,
        textAlign: 'left', 
        fontFamily: 'Avenir',
        textTransform: 'uppercase',
        [theme.breakpoints.between('xs', 'md')]: {
            paddingTop: 20,
        },
    },
    dialogFavoriteButton: {
        position: 'absolute',
        right: 15,
    },
    addToTripButton: {
        position: 'absolute',
        // top: 15,
        right: 45,
    },
    flagButton: {
        position: 'absolute',
        // top: 15,
        right: 75,
    },
    dialogDescription: {
        fontSize:   12.5,
        fontFamily: 'Avenir',
        textAlign:  'center',
        lineHeight: 1.4,
    },
    commentsSection: {
        outlineStyle: 'solid',
        outlineWidth: 'thin',
        borderRadius: 20,
    },
});

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }
    
    handleClose = () => {
        this.setState({ open: false });
    }

    render () {
        const { classes, itemName, itemDescription, substitution } = this.props;

        return (
            <div>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs>
                                <Typography className={classes.title}>
                                    {itemName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FavoriteIcon className={classes.favoriteIcon}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography className={classes.description} color="textSecondary">
                        {/* Plant-based sausage topped with pickled slaw, BBQ vegan aioli, & roasted corn relish. */}
                        {itemDescription}
                    </Typography>
                    {/* <Typography className={classes.description} color="textSecondary">
                        Served with french fries or apple slices.
                    </Typography> */}
                    <Divider variant="middle" style={{marginTop: 8}}/>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                        <Typography className={classes.alterations} color="textSecondary">
                            Alterations:
                        </Typography>
                        <Typography className={classes.alterationsDescription} color="textSecondary">
                            {substitution}
                        </Typography>
                    </Grid>
                    <Button variant="outlined" className={classes.expandButton} onClick={this.handleOpen}>
                        <Typography className={classes.expandButtonText}>View More</Typography>
                    </Button>
                </CardContent>
            </Card>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle className={classes.dialogItemTitle}>
                    {itemName}
                    <IconButton className={classes.dialogFavoriteButton}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton className={classes.addToTripButton}>
                        <TripIcon />
                    </IconButton>
                    <IconButton className={classes.flagButton}>
                        <FlagIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={6}>
                        <DialogContent className={classes.dialogDescription}>
                            <Typography variant="overline">Description: <br/></Typography>
                            {itemDescription}
                            <br />
                            <Typography variant="overline" style={{paddingTop: 5,}}>Alterations: <br/></Typography>
                            {substitution}
                        </DialogContent>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <DialogContent>
                            <Card elevation={0} className={classes.commentsSection}>
                                COMMENTS
                            </Card>
                        </DialogContent>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            </div>
        );
    }
}

ItemCard.propTypes = {
    classes: PropTypes.object.isRequired,
    itemName: PropTypes.string.isRequired,
    itemDescription: PropTypes.string.isRequired,
    substitution: PropTypes.string.isRequired,
};

export default withStyles(styles)(ItemCard);
