import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    profileTile:    {
        // width: 200,
        // height: 100,
    },
    pictureCard:    {
        //display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 110,
        height: 110,
        borderRadius: 70,
        backgroundSize: 'cover',
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: 'grey',
    },
    nameText:   {
        marginTop: 13,
        fontFamily: "Avenir",
        fontSize: 'larger',
        textAlign: 'center',
        fontWeight: 500,
    },
    positionText:   {
        marginTop: 0,
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'dimgray',
        textAlign: 'center',
    },
};

function AboutUs(props) {
    const {classes} = props;

    return (
        <div>
            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                <Typography variant="h5" 
                    style={{
                        fontFamily: "Avenir",
                        marginBottom: 20,
                    }}>
                    Our Team
                </Typography>
                <Grid container spacing={16}>
                    <Grid container direction="column" justify="flex-start" alignItems="center"
                          className={classes.profileTile}>
                        <Grid item xs={12} sm={3}>
                            <Card 
                            style={{backgroundImage: "url('../static/images/PeopleImages/RS.jpg')"}}
                            className={classes.pictureCard}
                            />
                        
                            <Typography variant="h5" className={classes.nameText}>
                                Rachael Sera
                            </Typography>
                            <Typography className={classes.positionText}>
                                Augmented Reality
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-start" alignItems="center"
                          className={classes.profileTile}>
                        <Grid item xs={12} sm={3}>
                            <Card 
                            style={{backgroundImage: "url('../static/images/PeopleImages/BB.jpg')"}}
                            className={classes.pictureCard}
                            />
                            <Typography variant="h5" className={classes.nameText}>
                                Bailey Brooks
                            </Typography>
                            <Typography className={classes.positionText}>
                                Computer Vision
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-start" alignItems="center"
                          className={classes.profileTile}>
                        <Grid item xs={12} sm={3}>
                            <Card 
                            style={{backgroundImage: "url('../static/images/PeopleImages/LY.jpg')"}}
                            className={classes.pictureCard}
                            />
                            <Typography variant="h5" className={classes.nameText}>
                                Lorraine Yerger
                            </Typography>
                            <Typography className={classes.positionText}>
                                Mobile Developer
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-start" alignItems="center"
                          className={classes.profileTile}>
                        <Grid item xs={12} sm={3}>
                            <Card 
                            style={{backgroundImage: "url('../static/images/PeopleImages/HD.jpg')"}}
                            className={classes.pictureCard}
                            />
                            <Typography variant="h5" className={classes.nameText}>
                                Huong Dang
                            </Typography>
                            <Typography className={classes.positionText}>
                                Web Developer
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-start" alignItems="center"
                          className={classes.profileTile}>
                        <Grid item xs={12} sm={3}>
                            <Card 
                            style={{backgroundImage: "url('../static/images/PeopleImages/JL.jpg')"}}
                            className={classes.pictureCard}
                            />
                            <Typography variant="h5" className={classes.nameText}>
                                Jacquelyn Law
                            </Typography>
                            <Typography className={classes.positionText}>
                                Web Developer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

AboutUs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutUs);
