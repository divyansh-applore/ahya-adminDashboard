import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Modalcomp from "../Modal/Modal";
import axios from "axios";
import Tables from "../Tables/BookingTable";
import NavBar from "../Navbar/Navbar";
import Modal from "react-modal";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { NavbarContext } from "../ContextApi/NavbarProvider";

import { InputLabel } from "@material-ui/core";
import { API } from "../Backend";
import { addMember } from "../helpers/helper";

import Loader from "../loader/Loader";

const AllBookings = () => {
  // useState hooks
  const [Test, setTest] = useState([]);
  const [Bookings, setBookings] = useState([]);
  const [Loading, setLoading] = useState(false);

  // Conditional rendering
  if (Loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="row">
          <div className=" col-md-2">
            {" "}
            <NavBar />
          </div>
          <div className="col-md-10 pt-5">
            <h1 className="text-primary">Partner-Tickets</h1>
            <div className="mt-5 ">
              <Tables
                rows={Test}
                columns={[
                  "Partner",
                  "Subject",
                  "Query-Type",
                  "Description",
                  "Mobile",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBookings;
