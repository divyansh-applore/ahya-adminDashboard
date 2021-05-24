import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Modalcomp from "../Modal/Modal";
import axios from "axios";
import Tables from "../Tables/UserTicketsTable";
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

const UserTickets = () => {
  const [edit, setedit] = useState();
  const [Tickets, setTickets] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [TestTickets, setTestTickets] = useState([]);

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [refresh, setrefresh] = useState(1);

  function openModal() {
    setmodalIsOpen(true);
  }

  function closeModal() {
    setmodalIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "30%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const getTickets = () => {
    axios
      .get(`${API}api/admin/get/user/tickets`)
      .then((data) => {
        if (data.error) {
          alert(data.message);
        }
        setTickets(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log("TICKETS", Tickets);

  // useEffect
  useEffect(() => {
    getTickets();
  }, []);

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
            <h1 className="text-primary">User-Tickets</h1>
            <div className="mt-5 ">
              <Tables
                rows={Tickets}
                columns={[
                  "User",
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

export default UserTickets;
