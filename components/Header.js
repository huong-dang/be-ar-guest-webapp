import React from 'react';
// import Logo from './images/logo.png';

function Header() {
    return (
        <div>
            <img src="../static/images/logo.png" alt="Logo"
            style={{width: "13%", height: "13%"}}/>
            <text style={{fontFamily: /*"Roboto, Helvetica, sans-serif"*/"Avenir",
                          fontSize: 30}}>
                be AR guest
            </text>
        </div>
    );
}
  
export default Header;
