import React from "react";
// Remove unused import {ComponentName} from '@material-tailwind/react';

// Remove unused imports
// import PaidIcon from '@mui/icons-material/Paid';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import "./NavBar.css";

import logo from "./spendyLogo.png";
import { Link } from "react-router-dom";

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    ReceiptPercentIcon,
    TrophyIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";


export function NavBar() {
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="navbar logo">
                <Typography variant="h5" color="blue-gray">
                    SPENDY
                </Typography>
            </div>
            <List>
                <ListItem>
                    <ListItemPrefix>
                        <ReceiptPercentIcon className="nav-logo" />
                    </ListItemPrefix>
                    Transactions & Receipts
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <TrophyIcon className="nav-logo" />
                    </ListItemPrefix>
                    Achievements
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="nav-logo" />
                    </ListItemPrefix>
                    Profile
                </ListItem>
            </List>
        </Card>
    );
}
