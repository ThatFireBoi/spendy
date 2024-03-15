import React from "react";
import { Link } from "react-router-dom";
import "./navpages/About_us";
import "./navpages/Features";
import "./navpages/Inspiration";

export const NavBar = () => {
  return (
    <div>
      <nav>
        <Link to="/">Website</Link>
        <ul>
          <li>
            <Link to="/Inspiration">What inspires us</Link>
          </li>
          <li>
            <Link to="/Features">Features</Link>
            </li>
          <li>
            <Link to="/About_us">About us</Link>
            </li>
        </ul>
      </nav>
    </div>
  );
}