import React, { useState, useContext } from "react";
import styles from "./navbar.module.css";
import { NavLink, withRouter } from "react-router-dom";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";
import WorkIcon from "@material-ui/icons/Work";
import PeopleIcon from "@material-ui/icons/People";
import { Button } from "@material-ui/core";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { NavbarContext } from "../ContextApi/NavbarProvider";
import { logout } from "../helpers/helper";

const NavBar = ({ history }) => {
  const [Auth, setAuth] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
      </div>

      <div className={styles.navItems}>
        <NavLink
          className={styles.navItem}
          to="/admin/members"
          activeClassName={styles.activeNavItem}
        >
          <PeopleIcon />
          <p>Members</p>
        </NavLink>

        <NavLink
          className={styles.navItem}
          to="/admin/service-partners"
          activeClassName={styles.activeNavItem}
        >
          <WorkIcon />
          <p>Service Partners</p>
        </NavLink>

        <NavLink
          className={styles.navItem}
          to="/admin/categories"
          activeClassName={styles.activeNavItem}
        >
          <CategoryRoundedIcon />
          <p>Category</p>
        </NavLink>

        <NavLink
          className={styles.navItem}
          to="/admin/services"
          activeClassName={styles.activeNavItem}
        >
          <ShoppingBasketRoundedIcon />
          <p>Service</p>
        </NavLink>

        <NavLink
          className={styles.navItem}
          to="/admin/partner/tickets"
          activeClassName={styles.activeNavItem}
        >
          <ConfirmationNumberIcon />
          <p>Partner Tickets</p>
        </NavLink>

        {/* <div className={styles.navItem}> */}
        <Button
          size="large"
          className="bg-danger text-white mt-3 ml-5"
          onClick={() => logout(() => history.push("/"))}
        >
          <KeyboardBackspaceIcon />
          Logout
        </Button>
        {/* </div> */}
        {/* {!Auth && <Redirect from="/" to="/" />} */}
      </div>
    </div>
  );
};

export default withRouter(NavBar);
