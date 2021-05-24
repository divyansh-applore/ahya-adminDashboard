import "./App.css";
import React, { useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Members from "./Member/Members";
import Pass_conform_Admin from "./Password_Comformation/Pass_conform_Admin.js";
import Pass_conform_Service from "./Password_Comformation/Pass_conform_Service";
import login from "./login/Login";
import Service_partner from "./Service/Service-partners";
import Categories from "./Category/Categories";
import Service from "./Service/Services";
import Privateroute from "./Routes/Privateroute";
import { createBrowserHistory } from "history";
import { NavbarContext, NavbarProvider } from "./ContextApi/NavbarProvider";

import { isAuthenticated } from "./helpers/helper";
import PartnerTickets from "./PartnerTickets/PartnerTickets";
import UserTickets from "./UserTickets/UserTickets";
import AllBookings from "./Bookings/Bookings";

const hist = createBrowserHistory();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={login} />
        <Privateroute exact path="/admin/categories" component={Categories} />
        <Privateroute exact path="/admin/members" component={Members} />
        <Privateroute
          exact
          path="/admin/service-partners"
          component={Service_partner}
        />
        <Privateroute exact path="/admin/services" component={Service} />
        <Privateroute
          exact
          path="/admin/partner/tickets"
          component={PartnerTickets}
        />

        <Privateroute
          exact
          path="/admin/user/tickets"
          component={UserTickets}
        />

        <Privateroute
          exact
          path="/admin/all/bookings"
          component={AllBookings}
        />

        <Route
          exact
          path="/admin/pass_conform"
          component={Pass_conform_Admin}
        />
        <Route
          exact
          path="/service/pass_conform"
          component={Pass_conform_Service}
        />
        {isAuthenticated() && <Redirect from="/" to="/admin/members" />}
      </Switch>
    </Router>
  );
}

export default App;
