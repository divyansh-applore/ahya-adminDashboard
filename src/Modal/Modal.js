import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

import "./Modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    backgroundColor: "white",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
};

function Modalcom(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="overlay">
      <Button
        className="float-right mt-3"
        onClick={openModal}
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
      >
        {props.title}
      </Button>
      <br />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CloseIcon onClick={closeModal} />
        <h2
          style={{ color: "rgb(76, 68, 187)" }}
          className="text-center mt-2 mb-4"
        >
          {props.title}
        </h2>
        {props.children}

        {/* <button className="btn btn-outline-primary" onClick={closeModal}>Cancel</button> */}
      </Modal>
    </div>
  );
}

export default Modalcom;
