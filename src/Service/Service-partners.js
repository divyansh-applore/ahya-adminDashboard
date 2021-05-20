import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modalcomp from "../Modal/Modal";
import axios from "axios";
import Modal from "react-modal";
import Tables from "../Tables/ServicePartnersTable";
import Button from "@material-ui/core/Button";
import { TextField, Select, InputLabel } from "@material-ui/core";
import NavBar from "../Navbar/Navbar";

import { API } from "../Backend";
import { EmailTwoTone } from "@material-ui/icons";

import Loader from "../loader/Loader";

function Services() {
  const [edit, setedit] = useState();
  const [refresh, setrefresh] = useState(1);
  const [Category, setCategory] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [Members, setMembers] = useState([]);
  let [search, setsearch] = useState("");
  let [searchresult, setsearchresult] = useState(null);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
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
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    businessAddress: "",
    vat: "",
    contact: "",
    category: "",
    status: "",
  });

  const [Values, setValues] = React.useState({
    name: "",
    email: "",
    businessAddress: "",
    vat: "",
    contact: "",
    category: "",
    status: "true",
  });

  // destructuring
  const { name, email, businessAddress, vat, contact, category, status } =
    Values;

  // useEffect hooks
  useEffect(() => {
    GetMembers();
    Getcategory();
  }, [refresh]);

  // Categories
  const Getcategory = () => {
    axios
      .get(`${API}api/admin/get/categories`)
      .then((data) => {
        console.table("CATEGORIES", data.data);
        setCategory(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Partners
  const GetMembers = () => {
    setLoading(true);

    axios
      .get(`${API}api/admin/service/partners`)
      .then((data) => {
        setMembers(data.data);
        console.log("PARTNERS", data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // Add Partner
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${API}api/admin/create/partner`, Values)
      .then((data) => {
        console.log("ADD PARTNER", data);
        if (data.error) {
          alert(data.message);
          setValues({
            name: "",
            email: "",
            contact: "",
            category: "",
            vat: "",
            businessAddress: "",
            status: "",
          });
          setLoading(false);
        } else {
          console.log(data);
          setValues({
            name: "",
            email: "",
            contact: "",
            category: "",
            vat: "",
            businessAddress: "",
            status: "",
          });
          setrefresh((data) => data + 1);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        setValues({
          name: "",
          email: "",
          contact: "",
          category: "",
          vat: "",
          businessAddress: "",
          status: "",
        });
        console.log(err);
        setLoading(false);
      });
  };

  // deleteMember
  const deletemember = (_id) => {
    setLoading(true);

    axios
      .delete(`${API}api/admin/delete/partner/${_id}`)
      .then((data) => {
        console.log(data);
        setrefresh((data) => data + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // editHandler
  const EditformSubmit = (_id) => {
    setLoading(true);

    console.log(formData);
    axios
      .put(`${API}api/admin/edit/partner/${_id}`, formData)
      .then((data) => {
        console.log(data);
        setrefresh((data) => data + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
    closeModal();
    setLoading(false);
  };

  const changeHandler = (name) => (e) => {
    let value = e.target.value;
    setValues({ ...Values, [name]: value });
  };

  // conditional rendering
  if (Loading) {
    return <Loader />;
  }

  // component return
  return (
    <div className="container-fluid">
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="row">
        <div className="col-md-2">
          {" "}
          <NavBar />
        </div>
        <div className="col-md-10 pt-5">
          <h1 className="text-primary">Services Partners </h1>
          <h4 className="mt-3 mb-3 text-muted">Search</h4>

          <TextField
            size="small"
            variant="outlined"
            label="Enter name or email id..."
            onChange={(event) => {
              setsearch(event.target.value);
            }}
          ></TextField>

          <Modalcomp title="Add a partner">
            <form style={{ width: "100%" }} onSubmit={submitHandler}>
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Name"
                onChange={changeHandler("name")}
                value={name}
              />

              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Email"
                value={email}
                onChange={changeHandler("email")}
              />

              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Contact Number"
                value={contact}
                onChange={changeHandler("contact")}
              />

              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Store Address"
                value={businessAddress}
                onChange={changeHandler("businessAddress")}
              />

              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Vat Number"
                value={vat}
                onChange={changeHandler("vat")}
              />
              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={category}
                onChange={changeHandler("category")}
              >
                {Category &&
                  Category.map((cat) => (
                    <option value={cat._id} key={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
              </Select>

              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                value={status}
                onChange={changeHandler("status")}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Select>
              <br />
              <br />
              <Button
                type="submit"
                className="bg-primary text-white"
                size="medium"
              >
                Add
              </Button>
            </form>
          </Modalcomp>

          {/*  Edit */}
          {edit && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <br />
              <h2 style={{ color: "rgb(76, 68, 187)" }}>Edit</h2>
              <TextField
                style={{ width: "100%" }}
                multiline
                rows={1}
                label="Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                defaultValue={edit.name}
              ></TextField>
              <br />
              <br />
              <TextField
                style={{ width: "100%" }}
                multiline
                rows={1}
                label="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                defaultValue={edit.email}
              ></TextField>
              <br />
              <br />
              <TextField
                label="Contact Number"
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                defaultValue={edit.contact}
              ></TextField>{" "}
              <br />
              <br />
              <TextField
                style={{ width: "100%" }}
                id="outlined-multiline-static"
                label="Store Address"
                multiline
                rows={4}
                onChange={(e) =>
                  setFormData({ ...formData, businessAddress: e.target.value })
                }
                defaultValue={edit.businessAddress}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                label="Vat Number"
                onChange={(e) =>
                  setFormData({ ...formData, vat: e.target.value })
                }
                defaultValue={edit.vat}
              ></TextField>{" "}
              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                defaultValue={edit._id}
              >
                {Category &&
                  Category.map((cat) => (
                    <option value={cat._id} key={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
              </Select>
              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                defaultValue={edit.status}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Select>
              <br />
              <br />
              <Button
                color="primary"
                variant="outlined"
                onClick={() => EditformSubmit(edit._id)}
              >
                Submit
              </Button>
              <Button color="primary" variant="outlined" onClick={closeModal}>
                Close
              </Button>
            </Modal>
          )}

          <div className="mt-5">
            <Tables
              Edit={(data) => {
                setedit(data);
                openModal();
                setFormData({
                  name: data.name,
                  contact: data.contact,
                  businessAddress: data.businessAddress,
                  var: data.vat,
                  category: data._id,
                  email: data.email,
                  _id: data._id,
                });
              }}
              Delete={(Email) => {
                deletemember(Email);
              }}
              rows={Members}
              searchTerm={search}
              columns={[
                "Name",
                "Email",
                "Contact Number",
                "Store Address",
                "Vat Number",
                "Category",
                "Status",
                "Actions",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
