import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import "../styles/admin.css";
import Typography from "@mui/material/Typography";
import {
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar
} from "@mui/material";
import { getUserByIdAPI, resetPasswordAPI, updatetUserByIdAPI } from '../../api/admin';

const TravelAgentEdit = () => {
  const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
  const [userData, setUserData] = useState(storedUserData);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    newPassword: "",
    confirm_newPassword: "",
  });
  const { name, email, newPassword, confirm_newPassword } = formData;
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isAgentDataUpdated, setIsAgentDataUpdated] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("ID")) {
      getAgentById(localStorage.getItem("ID"))
    };
  }, []);

  const getAgentById = async (id) => {
    getUserByIdAPI(id)
      .then((res) => {
        console.log("Res :", res);
        if (res.status === 200) {
          setFormData({
            ...formData,
            id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsPasswordsMatch(true);
    setIsAgentDataUpdated(false);
    setIsPasswordReset(false);
  };

  const onSubmitResetPassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirm_newPassword) {
      setIsPasswordsMatch(false);
    } else {
      setIsPasswordsMatch(true);
      resetPassword();
    }
  };

  const resetPassword = async () => {
    const payload = {
      password: formData.newPassword
    };
    resetPasswordAPI(formData.id, payload)
      .then((res) => {
        console.log("Res :", res);
        if (res.status === 200) {
          setIsPasswordReset(true);
          setFormData({
            ...formData,
            newPassword: "",
            confirm_newPassword: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    updateAgent();
  };

  const updateAgent = async () => {
    const payload = {
      name: formData.name,
      email: formData.email
    };
    updatetUserByIdAPI(formData.id, payload)
      .then((res) => {
        console.log("Res :", res);
        if (res.status === 200) {
          setIsAgentDataUpdated(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              {isAgentDataUpdated && (
                <>
                  <Snackbar
                    open={isAgentDataUpdated}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Agent succesfully updated
                    </Alert>
                  </Snackbar>
                </>
              )}
              {isPasswordReset && (
                <>
                  <Snackbar
                    open={isPasswordReset}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Password reset successfull
                    </Alert>
                  </Snackbar>
                </>
              )}
              <h5 className="card-title mb-4">
                <b>{formData.name}</b>
              </h5>
              <form onSubmit={(e) => onSubmitUpdate(e)}>
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
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button disabled={!!!name || !!!email} variant="contained" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <b>Password Reset</b>
              </h5>
              <form onSubmit={(e) => onSubmitResetPassword(e)}>
                <div className="row">
                  <div className="col-lg-6 mb-3 ">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="New Password"
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 mb-3 ">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      label="Re-Enter New Password"
                      type="password"
                      name="confirm_newPassword"
                      value={confirm_newPassword}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button disabled={!!!newPassword || !!!confirm_newPassword} variant="contained" color="error" type="sumbit">
                    Reset password
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

export default TravelAgentEdit