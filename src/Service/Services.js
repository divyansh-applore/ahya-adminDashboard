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

import S3 from "react-aws-s3";

const config = {
  bucketName: "ahya-bucket",
  region: "us-west-2",
  accessKeyId: "AKIASOGVIHKZV2RVY3VB",
  secretAccessKey: "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",
};

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
  const [formData, setFormData] = React.useState({
    name: "",
    imageUrl: "",
    keywords: [],
    status: "",
    category: "",
    partner: "",
  });

  const [Values, setValues] = useState({
    name: "",
    imageUrl: "",
    keywords: [],
    status: "true",
    category: "",
    partner: "",
  });

  const { name, imageUrl, keywords, status, category, partner } = Values;

  const [Chips, setChips] = useState([]);
  const [EditChips, setEditChips] = useState("");
  const [Partners, setPartners] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [EditImageUrl, setEditImageUrl] = useState("");
  const [EditImage, setEditImage] = useState(false);

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
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(Values);
    setValues({ ...Values });
    setLoading(true);

    // s3 instance
    const ReactS3Client = new S3(config);

    ReactS3Client.uploadFile(imageUrl, `picture/${Date.now()}${imageUrl.name}`)
      .then((s3Data) => {
        console.log("S3", s3Data.location);
        axios
          .post(`${API}api/admin/create/service`, {
            name,
            imageUrl: s3Data.location,
            keywords: Chips,
            status,
            category,
            partner,
          })
          .then((data) => {
            console.log(data);
            setrefresh((data) => data + 1);
            setValues({
              name: "",
              imageUrl: "",
              keywords: [],
              status: "true",
              category: "",
              partner: "",
            });
            setChips([]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((s3Err) => {
        console.log("S3 Error", s3Err);
        setLoading(false);
      });
  };

  console.log("EditImageUrl", EditImageUrl);
  console.log("Edit", imageUrl);

  // update service
  function EditformSubmit(serviceId) {
    setLoading(true);

    const ReactS3Client = new S3(config);

    console.log("FORM DATA BEFORE S3", formData);

    ReactS3Client.uploadFile(
      EditImageUrl,
      `picture/${Date.now()}${EditImageUrl.name}`
    )
      .then((s3Data) => {
        console.log("S3 RESPONSE", s3Data);
        setEditImage(s3Data.location);
        console.log("FORM DATA BEFORE UPDATING", formData);
      })
      .catch((s3Err) => {
        alert("Failed to upload image to s3!");
        setLoading(false);
      });
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

  // changeHandler
  const changeHandler = (name) => (e) => {
    let value = e.target.value;
    setValues({ ...Values, [name]: value });
  };

  console.log("EDIT IMAGE URL", EditImageUrl);

  // handleChange
  const handleChange = (chips) => {};

  const handleAddChip = (chip) => {
    setChips([...Chips, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    let remaningChips = Chips.filter((ch, indx) => indx != index);
    setChips(remaningChips);
  };

  // edit chips
  const editHandleChange = (chips) => {};

  const editHandleAddChip = (chip) => {
    setEditChips([...EditChips, chip]);
    setFormData({ ...formData, Keywords: [...EditChips] });
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
                onChange={changeHandler("name")}
              />
              <br />
              <br />

              <Button variant="contained" component="label">
                Upload File
                <input
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setValues({ ...Values, imageUrl: e.target.files[0] })
                  }
                  type="file"
                  hidden
                />
              </Button>

              {imageUrl ? (
                <>
                  <br />
                  <br />
                  {imageUrl.name}
                </>
              ) : (
                ""
              )}
              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={status}
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

              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={changeHandler("category")}
                value={category}
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
                  setFormData({ ...formData, name: e.target.value })
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
                  setFormData({ ...formData, status: e.target.value })
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
                  onChange={(e) => setEditImageUrl(e.target.files[0])}
                  type="file"
                  hidden
                />
              </Button>

              {EditImageUrl.name ? (
                <>
                  <br />
                  <br />
                  {EditImageUrl.name}
                </>
              ) : (
                <>
                  <br />
                  <br />
                  {edit.imageUrl}
                </>
              )}

              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Partner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) =>
                  setFormData({ ...formData, partner: e.target.value })
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
                  setFormData({ ...formData, category: e.target.value })
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
                  setFormData({
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
