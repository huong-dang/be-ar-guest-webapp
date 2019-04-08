import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import List from '@material-ui/core/List';
import LandListItem from '../components/LandListItem';
import RestaurantPanel from '../components/RestaurantPanel';

import axios from 'axios';

const styles = theme => ({
  root: {
    width: "80%",
    height: "auto"
    // flexGrow: 1,
  },
  header: {
    fontSize: 25,
    fontFamily: "Avenir",
    fontWeight: 400,
    textAlign: 'center',
    marginTop: '2%',
  },
  grid: {
    position: "relative",
    marginLeft: "3.5%",
    // marginRight: "3.5%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  parkImage: {
    width: "80%",     // CHANGED FROM 40% TO 80%
    height: 300,
    backgroundSize: "cover",
    [theme.breakpoints.between('xs','sm')]: {
      height: 210,
    },
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
  restaurantName: {
    fontSize: 'larger'
  },
});

const parkData = [
  { id: 1, parkName: 'Magic Kingdom', backgroundImage: '../static/images/ParkImages/MagicKingdom.jpg'},
  { id: 3, parkName: 'Hollywood Studios', backgroundImage: '../static/images/ParkImages/MGMStudios.jpg'},
  { id: 2, parkName: 'Epcot', backgroundImage: '../static/images/ParkImages/Epcot.jpg'},
  { id: 4, parkName: 'Animal Kingdom', backgroundImage: '../static/images/ParkImages/AnimalKingdom.jpg'},
];

const ParkCard = ({ parkName, backgroundImage, onClick, classes }) =>  {
  const [hover, setHover] = useState(false)
  return (
    (
      <Grid style={{ cursor: 'pointer'}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} item xs={12} md={6}>
        <Card
          className={classes.parkImage} 
          onClick={onClick}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: hover ? 0.8 : 1
          }}
        >
          <Card className={classes.textCard} elevation={0}>
            <Typography className={classes.parkName}>
              {parkName}
            </Typography>
          </Card>
        </Card>
      </Grid>
    )
  )
}

class MenuStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "PARKS",
      lands: [],
      restaurants:[],
    };
  }

  handleContentChange = prop => event => {
    this.setState({tab: prop});
  };

  async handleParkSelection(parkID) {
    try {
      const result = await axios.post('/land/getLandsbyPark', { parkID: parkID });
      this.setState({ tab: "LANDS", lands: result.data });
    } catch (e) {
        console.log('Error', e);
    }
  }

  async handleRestaurantSelection(landID) {
    try {
      const result = await axios.post('/land/getRestaurantsByLand', { landID: landID });
      this.setState({ tab: "RESTAURANTS", restaurants: result.data });
    } catch (e) {
      console.log('Error', e);
    }
    
  }

  renderNavigationButton() {
    switch (this.state.tab) {
      case "PARKS":
        return (<div></div>);
      case "LANDS":
        return this.renderNavigateToParks();
      case "RESTAURANTS":
        return this.renderNavigateToLands();
      default:
        return this.renderNavigateToParks();
    }
  }

  renderDividerContent() {
    switch (this.state.tab) {
      case "PARKS":
        return this.renderParks();
      case "LANDS":
        return this.renderLands();
      case "RESTAURANTS":
        return this.renderRestaurants();
      default:
        return this.renderParks();
    }
  }

  renderNavigateToParks() {
    return (
      <div>
          <Button onClick={this.handleContentChange("PARKS")}>
            <KeyboardArrowLeft />
            Back to parks
          </Button>
      </div>
    );
  }

  renderNavigateToLands() {
    return (
      <div>
        <Button variant="text" onClick={this.handleContentChange("LANDS")}>
          <KeyboardArrowLeft />
          Back to lands
        </Button>
      </div>
    );
  }

  renderParks() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header}>
          Select a park
        </Typography>
        <Divider variant="middle" />
        <Grid container spacing={24} className={classes.grid}>
          {parkData.map((park, index) => (
            <ParkCard
              onClick={() => this.handleParkSelection(park.id)}
              parkName={park.parkName} 
              backgroundImage={park.backgroundImage}
              classes={classes}
              id={park.id} 
              key={index} 
            />
          ))}
        </Grid>
      </div>
    );
  }
  
  renderLands() {
    const { classes } = this.props;
   
    const landsInfo = this.state.lands.map((land, index) =>
      {
        return <LandListItem key={index} 
                landID={land.landID} 
                landName={land.landName} 
                parkID={land.parkID} 
                onClick={() => this.handleRestaurantSelection(land.landID)}/>
      }
    )
    return (
      <div>
        <Divider variant="middle" />
        <List>
          {landsInfo}
        </List>
      </div>
    )
  }

  renderRestaurants() {
    const { classes } = this.props;

    const restaurantsInfo = this.state.restaurants.map((restaurant, index) =>
      {
        return (
          <RestaurantPanel key={index}
           restaurantID={restaurant.restaurantID}
           restaurantName={restaurant.restaurantName}
           landID={restaurant.landID} />
        )
      }
    )

    return (
      <div>
        {restaurantsInfo}
      </div>
    )
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Card>
          {this.renderNavigationButton()}
          {this.renderDividerContent()}
        </Card>
      </div>
    );
  }
}

MenuStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuStepper);