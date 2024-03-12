import React from "react";
// NavBar icons, material-ui
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import "./NavBar.css";

import logo from "./spendyLogo.png";
//import { Link } from "react-router-dom";


export const NavBar = ({ onTransactionsClick, onSavingsClick, onReceiptsClick, onAchievementsClick }) => {
    return (
        <nav className="nav-bar">
            <img src={logo} alt="logo" className="nav-logo"/>
            <ul>
                <li><PaidIcon /><button onClick={onTransactionsClick} className="nav-link">Transactions</button></li>
                <li><SavingsIcon /><button onClick={onSavingsClick} className="nav-link">Savings</button></li>
                <li><ReceiptIcon /><button onClick={onReceiptsClick} className="nav-link">Receipts</button></li>
                <li><EmojiEventsIcon /><button onClick={onAchievementsClick} className="nav-link">Achievements</button></li>
            </ul>
        </nav>
