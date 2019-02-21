import React from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from '../components/Menu';
// import Logo from './images/logo.png';

function Header() {
    return (
        <div style={{marginTop: 15}}>
            <Grid container direction="column" justify="flex-start" alignItems="center"
            style={{
                width: "auto"
            }}>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <img src="../static/images/logo.png" alt="Logo"
                        style={{width: "15%", height: "15%"}}/>
                        <text style={{fontFamily: "Avenir",fontSize: 30}}>
                            be AR guest
                        </text>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;
