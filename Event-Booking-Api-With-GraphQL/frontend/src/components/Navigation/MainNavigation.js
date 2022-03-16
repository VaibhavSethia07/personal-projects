import React from "react";
/* NavLink renders a normal anchor tag but when you click on it, it catches the click and prevents the browser sending the
request and reloading the page.
Also the difference between the navlink and anchor tag is that navlink provides extra css classes. */
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
const mainNavigation = (props) => {
  return (
    <header>
      <div className="main-navigation-logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="main-navigation-item">
        <ul>
          <li>
            <NavLink to="/auth">Authenticate</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

// We will be using mainNavigation component on auth, events and bookings page.
export default mainNavigation;
