import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    parkImage: {
        width: "80%",     // CHANGED FROM 40% TO 80%
        height: 300,
        backgroundSize: "cover",
        [theme.breakpoints.between('xs','sm')]: {
          height: 210,
        },
    }, 
    parkName: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "black",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5
    },
    textCard: {
        width: "max-content",
        height: "auto",
        // backgroundColor: 'rgb(69,69,69)',
        backgroundColor: "white",
        borderRadius: 16,
        margin: "auto",
        position: "relative",
        marginTop: "33%"
      },
});


class ParkCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        }
    }

    setHover(value) {
        this.setState({hover: value});
    }

    render() {
        const { classes, onClick, parkName, backgroundImage } = this.props;

        return (
        <Grid style={{ cursor: 'pointer'}} 
            onMouseEnter={() => this.setHover(true)} 
            onMouseLeave={() => this.setHover(false)} 
            item xs={12} md={6}>
          <Card
            className={classes.parkImage} 
            onClick={onClick}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              opacity: this.state.hover ? 0.8 : 1
            }}
          >
            <Card className={classes.textCard} elevation={0}>
              <Typography className={classes.parkName}>
                {parkName}
              </Typography>
            </Card>
          </Card>
        </Grid>
        );
    }
}

ParkCard.propTypes = {
    classes: PropTypes.object.isRequired,
    parkName: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
}

export default withStyles(styles)(ParkCard);