import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import "../styles/admin.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  Grid,
} from "@mui/material";
import { addNewAgentAPI } from '../../api/admin';


const TravelAgentRegister = () => {
  const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
  const [userData, setUserData] = useState(storedUserData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    status: true,
    user_role: "Agent",
  });
  const { name, email, password, confirm_password } = formData;

  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isAgentCreated, setIsAgentCreated] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsPasswordsMatch(true);
    setIsAgentCreated(false);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setIsPasswordsMatch(false);
    } else {
      setIsPasswordsMatch(true);
      console.log(formData);
      createNewAgent();
    }
  };

  const createNewAgent = async () => {
    addNewAgentAPI(formData)
      .then((res) => {
        console.log("Res :", res);
        if (res.status === 200) {
          setIsAgentCreated(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="admin-app">
        <div className="navbar">
          <div className="navbar-left ml-[7rem]">
            <Typography variant="h5" noWrap component="div">
              <b>Welcome {userData.existingUser.name} 👋 </b> ({userData.existingUser.user_role})
            </Typography>
          </div>
        </div>

        <Grid item sm={12} style={{ margin: "30px 100px 0 100px" }}>
          <div className="card">
            <div className="card-body">
              {!isPasswordsMatch && (
                <>
                  <Snackbar
                    open={!isPasswordsMatch}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Passwords does not match
                    </Alert>
                  </Snackbar>
                </>
              )}
              {isAgentCreated && (
                <>
                  <Snackbar
                    open={isAgentCreated}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Agent succesfully registered
                    </Alert>
                  </Snackbar>
                </>
              )}
              <h5 className="card-title mb-4">
                <b>Agent Register</b>
              </h5>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                  <div className="col-lg-6 mb-3 ">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Agency Name"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 mb-3 ">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 mb-3 ">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 mb-3 ">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Re-Enter Password"
                      type="password"
                      name="confirm_password"
                      value={confirm_password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button variant="contained" type="submit">
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default TravelAgentRegister