import React from "react";
// NavBar icons, material-ui
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import "./NavBar.css";
import logo from "./spendyLogo.png";
import { Link } from "react-router-dom";


export const NavBar = () => {
    return (
        <nav className="nav-bar">
            <img src={logo} alt="logo" className="nav-logo"/>
            <ul>
                <li><HomeIcon /><a href="/expense-tracker">Transactions</a></li>
                <li><InfoIcon /><Link to="/expense-tracker">Receipts</Link></li>
                <li><EmojiEventsIcon /><a href="/expense-tracker">Achievements</a></li>
            </ul>
        </nav>
    );
};