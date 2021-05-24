import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modalcomp from "../Modal/Modal";
import axios from "axios";
import Tables from "../Tables/ServicesTable";
import NavBar from "../Navbar/Navbar";
import Modal from "react-modal";
import { FormControlLabel, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Select from "@material-ui/core/Select";
import { MenuItem, InputLabel } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import { API } from "../Backend";
import Loader from "../loader/Loader";
import { Edit } from "@material-ui/icons";

function Services() {
  const [edit, setedit] = useState();
  let [Category, setCategory] = useState([]);

  const [refresh, setrefresh] = useState(1);
  const [Loading, setLoading] = useState(true);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      width: "25%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [EditFormData, setEditFormData] = React.useState({
    name: "",
    cover: "",
    keywords: [],
    status: "",
    category: "609668cb9faac80cb66d352b",
    partner: "",
    galleryImage: "",
    amount: "",
    duration: "",
  });

  const [Values, setValues] = useState({
    name: "",
    imageUrl: "",
    keywords: [],
    status: "true",
    category: "609668cb9faac80cb66d352b",
    partner: "",
    amount: "",
    duration: "",
    cover: "",
    galleryImage: "",
    formData: "",
  });

  const {
    name,
    keywords,
    amount,
    duration,
    status,
    category,
    partner,
    cover,
    galleryImage,
    formData,
  } = Values;

  const [Chips, setChips] = useState([]);
  const [EditChips, setEditChips] = useState("");
  const [Partners, setPartners] = useState([]);
  const [Categories, setCategories] = useState([]);

  // useEffect hooks
  useEffect(() => {
    getServices();
    getPartners();
    getCategories();
  }, [refresh]);

  function getServices() {
    axios
      .get(`${API}api/admin/all/services`)
      .then((data) => {
        setCategory(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const getPartners = () => {
    axios
      .get(`${API}api/admin/service/partners`)
      .then((data) => {
        console.log(data);
        setPartners(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getCategories = () => {
    axios
      .get(`${API}api/admin/all/categories`)
      .then((data) => {
        console.log("CATEGORIES", data);
        setCategories(data.data);
        setValues({ ...Values, formData: new FormData() });
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(Values);

    setValues({ ...Values, keywords: [...Chips] });

    formData.append("status", status);
    formData.append("keywords", [...keywords]);
    formData.append("galleryImage", galleryImage);
    formData.append("category", category);

    console.log("FORM DATA BEFORE SENDING", formData);

    setLoading(true);

    axios
      .post(`${API}api/admin/create/service`, formData, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json ",
        },
      })
      .then((data) => {
        if (data.error) {
          alert(data.message);
        }
        setValues({
          name: "",
          imageUrl: "",
          keywords: [],
          status: "true",
          category: "609668cb9faac80cb66d352b",
          partner: "",
          amount: "",
          duration: "",
          cover: "",
          galleryImage: "",
          formData: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setValues({
          name: "",
          imageUrl: "",
          keywords: [],
          status: "true",
          category: "609668cb9faac80cb66d352b",
          partner: "",
          amount: "",
          duration: "",
          cover: "",
          galleryImage: "",
          formData: "",
        });
        setLoading(false);
      });
  };

  // update service
  function EditformSubmit(serviceId) {
    setLoading(true);
  }

  // delete Service
  function deletemember(_id) {
    setLoading(true);
    console.log(_id);
    axios
      .delete(`${API}api/admin/service/${_id}/delete`)
      .then((data) => {
        console.log(data);
        setrefresh((data) => data + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }

  //* console logs
  console.log("Values", Values);

  // changeHandler
  const changeHandler = (name) => (event) => {
    let value = name === "cover" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...Values, [name]: value });
  };

  // handleChange
  const handleChange = (chips) => {};

  const handleAddChip = (chip) => {
    setChips([...Chips, chip]);
    setValues({ ...Values, keywords: [...Chips, chip] });
  };

  const handleDeleteChip = (chip, index) => {
    let remaningChips = Chips.filter((ch, indx) => indx != index);
    setChips(remaningChips);
  };

  // edit chips
  const editHandleChange = (chips) => {};

  const editHandleAddChip = (chip) => {
    setEditChips([...EditChips, chip]);
    setEditFormData({ ...formData, Keywords: [...EditChips] });
  };
  const editHandleDeleteChip = (chip, index) => {
    let remainingChips = EditChips.filter((val, inx) => inx != index);
    setEditChips(remainingChips);
  };

  // conditional rendering
  if (Loading) {
    return <Loader />;
  }

  // Component return
  return (
    <div className="container-fluid">
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="row">
        <div class="col-md-2">
          {" "}
          <NavBar />
        </div>
        <div class="col-md-10 pt-5">
          <h1 className="text-primary">Service</h1>

          <Modalcomp title="Add a Service">
            <form onSubmit={submitHandler}>
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Service Name"
                value={name}
                onChange={changeHandler("name")}
              />
              <br />
              <br />

              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Amount"
                value={amount}
                onChange={changeHandler("amount")}
              />
              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Cover Image</InputLabel>
              <Button variant="contained" component="label">
                Upload File
                <input
                  style={{ width: "100%" }}
                  onChange={changeHandler("cover")}
                  type="file"
                  hidden
                />
              </Button>

              <br />
              <br />
              {cover ? (
                <>
                  {cover.name}
                  <br />
                  <br />
                </>
              ) : (
                ""
              )}

              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Duration"
                value={duration}
                onChange={changeHandler("duration")}
              />
              <br />
              <br />

              <InputLabel id="demo-simple-select-label">
                Gallery Image
              </InputLabel>
              <Button variant="contained" component="label">
                Upload File
                <input
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setValues({
                      ...Values,
                      galleryImage: e.target.files[0],
                    })
                  }
                  type="file"
                  hidden
                />
              </Button>
              <br />
              <br />

              {galleryImage ? (
                <>
                  {galleryImage.name}
                  <br />
                  <br />
                </>
              ) : (
                ""
              )}

              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Select>
              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Partner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={changeHandler("partner")}
                value={partner}
              >
                {Partners &&
                  Partners.map((val) => {
                    return (
                      <option key={val._id} value={val._id}>
                        {val.name}
                      </option>
                    );
                  })}
              </Select>
              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Keywords</InputLabel>
              <ChipInput
                style={{ width: "100%" }}
                value={Chips}
                onChange={(chips) => handleChange(chips)}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
              />

              <br />
              <br />
              {/* <br /> */}
              <button className="btn btn-outline-primary">Add</button>
            </form>
          </Modalcomp>

          {edit && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <br />
              <h2 style={{ color: "rgb(76, 68, 187)" }}>Edit</h2>
              <TextField
                label="ServiceName"
                onChange={(e) =>
                  setEditFormData({ ...formData, name: e.target.value })
                }
                defaultValue={edit.name}
              ></TextField>
              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) =>
                  setEditFormData({ ...formData, status: e.target.value })
                }
                defaultValue={edit.status}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
              <br />
              <br />

              <Button variant="contained" component="label">
                Upload File
                <input
                  style={{ width: "100%" }}
                  // onChange={(e) => setEditImageUrl(e.target.files[0])}
                  type="file"
                  hidden
                />
              </Button>

              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Partner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) =>
                  setEditFormData({ ...formData, partner: e.target.value })
                }
                defaultValue={edit.partner._id}
              >
                {Partners &&
                  Partners.map((val) => {
                    return (
                      <option key={val._id} value={val._id}>
                        {val.name}
                      </option>
                    );
                  })}
              </Select>
              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) =>
                  setEditFormData({ ...formData, category: e.target.value })
                }
                defaultValue={edit.category._id}
              >
                {Categories &&
                  Categories.map((val) => {
                    return (
                      <option key={val._id} value={val._id}>
                        {val.categoryName}
                      </option>
                    );
                  })}
              </Select>
              <br />
              <br />
              <ChipInput
                style={{ width: "100%" }}
                defaultValue={edit.keywords}
                value={EditChips}
                onChange={(chips) => editHandleChange(chips)}
                onAdd={(chip) => editHandleAddChip(chip)}
                onDelete={(chip, index) => editHandleDeleteChip(chip, index)}
              />
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
            {Category && (
              <Tables
                Edit={(data) => {
                  setedit(data);
                  setmodalIsOpen(true);
                  setEditFormData({
                    ServiceName: data.ServiceName,
                    Status: data.Status,
                    ImageURL: data.ImageURL,
                    Keywords: data.Keywords,
                    _id: data._id,
                  });
                }}
                Delete={(_id) => {
                  deletemember(_id);
                }}
                rows={Category}
                columns={[
                  "No",
                  "Service Name",
                  "Image URL",
                  "Status",
                  "Keywords",
                  "Partner Name",
                  "Category Name",
                  "Actions",
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
