import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modalcomp from "../Modal/Modal";
import axios from "axios";
import Tables from "../Tables/CategoryTable";
import NavBar from "../Navbar/Navbar";
import Modal from "react-modal";
import { TextField, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ChipInput from "material-ui-chip-input";

import { API } from "../Backend";
import Loader from "../loader/Loader";

import S3 from "react-aws-s3";

const config = {
  bucketName: "ahya-bucket",
  region: "us-west-2",
  accessKeyId: "AKIASOGVIHKZV2RVY3VB",
  secretAccessKey: "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",
};

function Categories() {
  const [edit, setedit] = useState("");
  let [category, setcategory] = useState([]);

  const [refresh, setrefresh] = useState(1);
  const [Loading, setLoading] = useState(false);
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
  const [Chips, setChips] = useState([]);
  const [EditChips, setEditChips] = useState([]);
  const [formData, setFormData] = React.useState({
    categoryName: "",
    imageUrl: "",
    status: "",
    Keywords: [],
  });

  const [Values, setValues] = React.useState({
    categoryName: "",
    imageUrl: "",
    status: "true",
    keywords: [],
  });

  // destructuring
  const { categoryName, imageUrl, status, keywords } = Values;

  // useEffect hooks
  useEffect(() => {
    Getcategory();
  }, [refresh]);

  // getAllCategories
  const Getcategory = () => {
    setLoading(true);

    axios
      .get(`${API}api/admin/all/categories`)
      .then((data) => {
        setcategory(data.data);
        console.log("ALL CATEGORIES", data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // submitHandler for adding new categories
  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    setValues({ ...Values, keywords: [...Chips] });

    axios
      .post(`${API}api/admin/category/create`, {
        categoryName,
        status,
        imageUrl,
        keywords: [...Chips],
      })
      .then((data) => {
        console.log("NEW CATEGORY DATA", data);
        setrefresh((data) => data + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // editHandler
  function EditformSubmit(categoryId) {
    setFormData({ ...formData, Keywords: EditChips });

    console.log(formData);
    axios
      .put(`${API}api/admin/category/${categoryId}/edit`, formData)
      .then((data) => {
        console.log(data);
        setrefresh((data) => data + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
    // alert("Refresh page to see changes");
  }

  // deleteMember
  function deletemember(_id) {
    console.log(_id);
    axios
      .delete(`${API}api/admin/category/${_id}/delete`)
      .then((data) => {
        console.log(data);
        setrefresh((data) => data + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log("FORMDATA", formData);

  // changeHandler
  const changeHandler = (name) => (e) => {
    let value = e.target.value;
    setValues({ ...Values, [name]: value });
  };

  // handleChange
  const handleChange = (chips) => {};

  const handleAddChip = (chip) => {
    setChips([...Chips, chip]);
  };

  console.log("CHIPS", Chips);
  console.log("EDIT CHIPS", EditChips);

  const handleDeleteChip = (chip, i) => {
    let remainingKeywords = Chips.filter((word, ind) => ind != i);
    setChips(remainingKeywords);
  };

  // for editing existing chips
  const editHandleChange = (chips) => {};

  const editHandleAddChip = (chip) => {
    setEditChips([...EditChips, chip]);
    setFormData({ ...formData, Keywords: [...EditChips] });
  };
  const editHandleDeleteChip = (chip, index) => {
    let remainingChips = EditChips.filter((val, inx) => inx != index);
    setEditChips(remainingChips);
  };

  useEffect(() => {
    if (edit) {
      setEditChips(edit.keywords);
    }
  }, [edit]);

  console.log("EDIT", edit);

  // conditional rendering
  if (Loading) {
    return <Loader />;
  }

  // Categories return
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
        <div class="col-md-10  pt-5">
          <h1 className="text-primary">Category</h1>

          <Modalcomp title="Add a Category">
            <form onSubmit={submitHandler}>
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Category Name"
                value={categoryName}
                onChange={changeHandler("categoryName")}
              />
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Image Url"
                value={imageUrl}
                onChange={changeHandler("imageUrl")}
              />
              <br />
              <br />

              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select onChange={changeHandler("status")} value={status}>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
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
              <Button
                color="primary"
                size="medium"
                className="bg-primary text-white"
                type="submit"
              >
                Add
              </Button>
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
                label="Category Name"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                defaultValue={edit.categoryName}
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
              <Button variant="contained">
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
              <br />
              <br />
              {/* <TextField
                label="Image URL"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                defaultValue={edit.imageUrl}
              ></TextField>{" "} */}
              <br />
              <br />
              <InputLabel id="demo-simple-select-label">Keywords</InputLabel>
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
            {category && (
              <Tables
                Edit={(data) => {
                  setedit(data);
                  setmodalIsOpen(true);
                  setFormData({
                    categoryName: data.CategoryName,
                    status: data.Status,
                    imageUrl: data.ImageURL,
                    keywords: data.Keywords,
                    _id: data._id,
                  });
                }}
                Delete={(_id) => {
                  deletemember(_id);
                  console.log(_id);
                }}
                rows={category}
                columns={[
                  "No",
                  "Category Name",
                  "Image URL",
                  "Status",
                  "Keywords",
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

export default Categories;
