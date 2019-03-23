

// /////// UPDATED VERSION ////////////


// Changes:

// Instead of using the column/row positioning I just used the MaterialUI grid positioning going off of this example: 

// https://material-ui.com/layout/grid/#grid-with-breakpoints

// Using a grid, each row can take up a max grid width of 12. So, when the view is in mobile (xs) each grid (image card) takes up the full width 12. In desktop mode
// which is denoted as "md" and up I've set it to a value of 6 - meaning half the row (which renders two cards per row). I can try to explain this better later on 
// cause its a little confusing.

// Also, I removed the marginTop: 30% on each card image. Instead, I spaced them out by setting a spacing property on the outermost Grid component. It's set to 24, 
// but you can change that as you need. And I increased the width of parkImage from 40% to 80%. Again, not necessary, but it looked weird at 40%. 



import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    width: "80%",
    height: "auto"
    // flexGrow: 1,
  },
  header: {
    fontSize: 18,
    fontFamily: "Avenir",
    fontWeight: 400,
    marginRight: "5%"
  },
  grid: {
    position: "relative",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  parkImage: {
    width: "80%",     // CHANGED FROM 40% TO 80%
    height: 300,
    backgroundSize: "cover"
    // opacity: 0.5,
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
  }
});

class MenuStepper extends React.Component {
  renderParks() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header}>Select a park</Typography>
        <Divider variant="middle" />
        <Grid container spacing={24} className={classes.grid}>
          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage:
                  "url('../static/images/ParkImages/MagicKingdom.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>
                  Magic Kingdom
                </Typography>
              </Card>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage:
                  "url('../static/images/ParkImages/MGMStudios.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>
                  Hollywood Studios
                </Typography>
              </Card>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage: "url('../static/images/ParkImages/Epcot.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>Epcot</Typography>
              </Card>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.parkImage}
              style={{
                backgroundImage:
                  "url('../static/images/ParkImages/AnimalKingdom.jpg')"
              }}
            >
              <Card className={classes.textCard} elevation={0}>
                <Typography className={classes.parkName}>
                  Animal Kingdom
                </Typography>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Card>
          <Typography>hello</Typography>
          {this.renderParks()}
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

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// const styles = theme => ({
//   root: {
//     width: '80%',
//     height: 'auto',
//     // flexGrow: 1,
//   },
//   header: {
//     fontSize: 18,
//     fontFamily: 'Avenir',
//     fontWeight: 400,
//     marginRight: '5%',
//   },
//   grid: {
//     position: 'relative',
//     marginLeft: '5%',
//     marginRight: '5%',
//     marginTop: '5%',
//     marginBottom: '5%',
//     width: 'auto',
//   },
//   parkImage: {
//     width: '40%',
//     height: 300,
//     backgroundSize: 'cover',
//   },
//   parkImageHover: {
//     opacity: 0.4,
//   },
//   textCard: {
//     width: 'max-content',
//     height: 'auto',
//     // backgroundColor: 'rgb(69,69,69)',
//     backgroundColor: 'white',
//     borderRadius: 16,
//     margin: 'auto',
//     position: 'relative',
//     marginTop: '33%',
//   },
//   parkName: {
//     fontSize: 18,
//     fontFamily: 'Roboto',
//     fontWeight: 400,
//     color: 'black',
//     textAlign: 'center',
//     position: 'relative',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 5,
//     marginBottom: 5,
//   }
// });

// class MenuStepper extends React.Component {
//   renderParks() {
//     const {classes} = this.props;
//     return (
//       <div>
//         <Typography className={classes.header}>
//           Select a park
//         </Typography>
//         <Divider variant="middle"/>
//         <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.grid}>
//           {/* <div> */}
//           <Grid container direction="row" justify="center" alignItems="flex-start">
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/MagicKingdom.jpg')",
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Magic Kingdom
//                 </Typography>
//               </Card>
//             </Card>
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/MGMStudios.jpg')",
//               marginLeft: '3%',
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Hollywood Studios
//                 </Typography>
//               </Card>
//             </Card>
//           </Grid>
//           {/* </div> */}

//           {/* <div> */}
//           <Grid container direction="row" justify="center" alignItems="flex-start" style={{ marginTop: '3%',}}>
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/Epcot.jpg')",
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Epcot
//                 </Typography>
//               </Card>
//             </Card>
//             <Card className={classes.parkImage}
//             style={{
//               backgroundImage: "url('../static/images/ParkImages/AnimalKingdom.jpg')",
//               marginLeft: '3%',
//             }}>
//               <Card className={classes.textCard} elevation={0}>
//                 <Typography className={classes.parkName}>
//                   Animal Kingdom
//                 </Typography>
//               </Card>
//             </Card>
//           </Grid>
//           {/* </div> */}
//         </Grid>
//       </div>
//     )
//   }

//   render() {
//     const { classes, theme } = this.props;

//     return (
//       <div className={classes.root}>
//         <Card>
//           <Typography>
//             hello
//           </Typography>
//           {this.renderParks()}
//         </Card>
//       </div>
//     );
//   }
// }

// MenuStepper.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(MenuStepper);