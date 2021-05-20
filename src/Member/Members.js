import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Modalcomp from "../Modal/Modal";
import axios from "axios";
import Tables from "../Tables/MembersTables";
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

function Members() {
  const [edit, setedit] = useState();
  let [members, setmembers] = useState([]);
  let [Search, setSearch] = useState("");
  let [searchresult, setsearchresult] = useState(null);
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
  const [formData, setFormData] = React.useState({
    name: "",
    status: "",
    role: "",
    email: "",
  });

  const [Values, setValues] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "true",
  });
  const [Loading, setLoading] = useState(false);

  // destructuring
  const { name, email, role, status } = Values;

  // useEffect hooks
  useEffect(() => {
    GetMembers();
  }, [refresh]);

  // getMembers
  const GetMembers = () => {
    setLoading(true);

    axios
      .get(`${API}api/admin/get/members`)
      .then((data) => {
        console.log("Members", data.data);
        setmembers(data.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  };

  // editFormSubmit
  const EditformSubmit = (memberId) => {
    console.log(formData);

    setLoading(true);

    axios
      .put(`${API}api/admin/member/${memberId}/update`, formData)
      .then((data) => {
        if (data.error) {
          alert(data.message);
        }
        console.log(data);
        setrefresh((data) => data + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    closeModal();
  };

  // deleteMember
  const deletemember = (_id) => {
    setLoading(true);

    console.log(_id);
    axios
      .delete(`${API}api/admin/member/${_id}/delete`)
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

  // add member changeHandler
  const changeHandler = (name) => (e) => {
    let value = e.target.value;
    setValues({ ...Values, [name]: value });
    console.log(Values);
  };

  // add Member submitHandler
  const submitHandler = (e) => {
    setValues({ ...Values });

    setLoading(true);

    e.preventDefault();

    addMember({ name, email, role, status })
      .then((data) => {
        if (data.error) {
          alert(data.message);
        }
        setValues({
          name: "",
          email: "",
          role: "",
          status: "",
        });
        setrefresh((data) => data + 1);
        setLoading(false);
      })
      .catch((err) => {
        setValues({
          name: "",
          email: "",
          role: "",
          status: "",
        });
        setLoading(false);
        console.error(err);
      });
  };

  // conditional rendering
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
            <h1 className="text-primary">Members </h1>
            <h4 className="mt-3 mb-3 text-muted">Search</h4>
            <TextField
              className="search-input"
              size="small"
              variant="outlined"
              label="Enter Name or Email"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            ></TextField>

            <Modalcomp title="Add a member">
              <form style={{ width: "100%" }} onSubmit={submitHandler}>
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="Name"
                  value={name}
                  onChange={changeHandler("name")}
                />
                <br />
                <br />

                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="Email"
                  value={email}
                  onChange={changeHandler("email")}
                />
                <br />
                <br />

                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={changeHandler("status")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select>
                <br />
                <br />

                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  onChange={changeHandler("role")}
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </Select>
                <br />
                <br />

                <button type="submit" className="btn btn-outline-primary">
                  Add
                </button>
              </form>
            </Modalcomp>

            {/* Edit */}
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
                  label="Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  defaultValue={edit.name}
                ></TextField>
                <br />
                <br />
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  label="role"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  defaultValue={edit.role}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  label="status"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={edit.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
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

            <div className="mt-5 ">
              {searchresult ? (
                <Tables
                  Edit={(data) => {
                    setedit(data);
                    setmodalIsOpen(true);
                    console.log(formData);
                    setFormData({
                      name: data.name,
                      email: data.email,
                      status: data.status,
                      role: data.Userrole,
                      _id: data._id,
                    });
                    console.log(formData);
                  }}
                  Delete={(Email) => {
                    deletemember(Email);
                  }}
                  rows={searchresult}
                  columns={[
                    "No",
                    "Name",
                    "Email",
                    "Status",
                    "UserRole",
                    "Actions",
                  ]}
                ></Tables>
              ) : (
                <Tables
                  Edit={(data) => {
                    setedit(data);
                    setmodalIsOpen(true);
                    console.log(formData);
                    setFormData({
                      name: data.name,
                      email: data.email,
                      status: data.status,
                      role: data.role,
                      _id: data._id,
                    });
                    console.log(formData);
                  }}
                  Delete={(Email) => {
                    deletemember(Email);
                  }}
                  searchTerm={Search}
                  rows={members}
                  columns={["Id", "Name", "Email", "Status", "Role", "Actions"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Members;
