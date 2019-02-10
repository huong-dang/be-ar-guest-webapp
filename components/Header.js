import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Logo from './images/logo.png';

function Header() {
    return (
        <div>
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <img src="../static/images/logo.png" alt="Logo"
                style={{width: "15%", height: "15%"}}/>
                <text style={{fontFamily: "Avenir",fontSize: 30}}>
                      be AR guest
                </text>
            </Grid>
        </div>
    );
}
  
export default Header;
