import React from 'react';
import HomeIcon from '@material-ui/icons/Home';  // Import the icons you want to use
import InfoIcon from '@material-ui/icons/Info';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import "./NavBar.css";
import logo from "./spendyLogo.png";


export const NavBar = () => {
    return (
        <nav className="nav-bar">
            <img src={logo} alt="logo" className="nav-logo"/>
            <ul>
                <li><HomeIcon /><a href="/">Transactions</a></li>
                <li><InfoIcon /><a href="/">Scanner</a></li>
                <li><EmojiEventsIcon /><a href="/">Achievements</a></li>
            </ul>
        </nav>
    );
};