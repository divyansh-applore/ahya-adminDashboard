import React, { useState } from "react";
import styles from "./login.module.css";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { TextField } from "@material-ui/core";

import { login, Authenticate, isAuthenticated } from "../helpers/helper";
import { Redirect } from "react-router-dom";
import Loader from "../loader/Loader";

const Home = () => {
  // useState
  const [Values, setValues] = useState({
    email: "",
    password: "",
    didRedirect: false,
  });
  const [Loading, setLoading] = useState(false);

  // destructuring
  const { email, password, didRedirect } = Values;

  // changeHandler
  const changeHandler = (name) => (e) => {
    let value = e.target.value;
    setValues({ ...Values, [name]: value });
  };

  // submitHandler method
  const submitHandler = (Values) => {
    setValues({ ...Values });
    setLoading(true);

    login(Values)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setLoading(false);
          alert(data.message);
          setValues({
            email: "",
            password: "",
          });
        } else {
          const allData = data.data;
          Authenticate(allData, () => {
            setValues({
              email: "",
              password: "",
              didRedirect: true,
            });
          });
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  // Redirect Method
  const performRedirect = () => {
    if (didRedirect) {
      if (isAuthenticated()) {
        return <Redirect to="/admin/members" />;
      }
    }
  };

  // conditional rendering
  if (Loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {performRedirect()}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.head}>Ahya Dashboard</h1>
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.loginContent}>
            <h1 className={styles.loginHead}>
              Sign In <SupervisorAccountIcon fontSize="large" color="primary" />
            </h1>

            <label className={styles.label}>
              Enter Email <EmailIcon color="primary" />
            </label>

            <TextField
              value={email}
              onChange={changeHandler("email")}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />

            <label className={styles.label}>
              Enter Password <LockIcon color="primary" />{" "}
            </label>

            <TextField
              type="password"
              value={password}
              onChange={changeHandler("password")}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />

            <Button
              className="mt-4 mb-4"
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => submitHandler(Values)}
            >
              Sign in
            </Button>
          </div>
        </div>
        <div className={styles.loginFooter}>&nbsp;</div>
      </div>
    </div>
  );
};

export default Home;
