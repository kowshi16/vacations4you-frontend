import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import "../styles/backoffice.css";
import Typography from "@mui/material/Typography";
import {
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { styled } from '@mui/material/styles';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { saveFileAdapter, saveFileAdapterActivity, saveFileAdapterPackage } from '../../api/backoffice';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddNewData = () => {
    const CheckMark = "https://img.icons8.com/color/30/000000/checked--v1.png";
    const DeleteMark = "https://img.icons8.com/color/25/000000/cancel--v1.png";
    const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
    const [userData, setUserData] = useState(storedUserData);
    const [productType, setProductType] = useState('');
    const [files, setFiles] = useState();
    const [isDataAdded, setIsDataAdded] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setProductType('');
        setFiles(null);
        setIsDataAdded(false);
      };
      console.log("isDataAdded >>>>>>>>>", isDataAdded);

    const handleSubmit = () => {
        //e.preventDefault();
        if (productType === "Cruise") {
            saveFileAdapter(files)
            .then((res) => {
                console.log("Res :", res);
                setIsDataAdded(true);
                setResponseMsg(res?.message);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else if (productType === "Activity") {
            saveFileAdapterActivity(files)
            .then((res) => {
                console.log("Res :", res);
                setIsDataAdded(true);
                setResponseMsg(res?.message);
            })
            .catch((error) => {
                console.log(error);
            });
        } else if (productType === "Package") {
            saveFileAdapterPackage(files)
            .then((res) => {
                console.log("Res :", res);
                setIsDataAdded(true);
                setResponseMsg(res?.message);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    const handleReset = () => {
        setProductType('');
        setFiles(null);
    };

    return (
        <React.Fragment>
            <NavBar />

            <div className="backoffice-app">
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
                            {isDataAdded && (
                                <>
                                    <Snackbar
                                        open={isDataAdded}
                                        autoHideDuration={3000}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    >
                                        <Alert
                                            onClose={handleClose}
                                            severity="success"
                                            sx={{ width: "100%" }}
                                        >
                                            {responseMsg}
                                        </Alert>
                                    </Snackbar>
                                </>
                            )}
                            <h5 className="card-title mb-4">
                                <b>Add Details</b>
                            </h5>
                            <form>
                                <div className="row">
                                    <div className="col-lg-5 mb-3 ">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={productType}
                                                label="Product Type"
                                                defaultValue={"Cruise"}
                                                onChange={(event) => setProductType(event.target.value)}
                                            >
                                                <MenuItem value={"Cruise"}>Cruise</MenuItem>
                                                <MenuItem value={"Activity"}>Activity</MenuItem>
                                                <MenuItem value={"Package"}>Package</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-lg-3 mb-3 mt-2">
                                        <FormControl fullWidth>
                                            <Button
                                                endIcon={
                                                    files ? (
                                                        <img
                                                            src={DeleteMark}
                                                            alt="Check Mark"
                                                            onClick={() => {
                                                                setFiles(null);
                                                            }}
                                                        />
                                                    ) : (
                                                        <UploadFileIcon />
                                                    )
                                                }
                                                component="label" variant="contained">
                                                <label>
                                                    <input
                                                        name="uploadQuotaAllocatedSheet"
                                                        type="file"
                                                        max={10 * 1024 * 1024}
                                                        hidden
                                                        onClick={(e) => {
                                                            setFiles(null);
                                                            e.target.value = "";
                                                        }}
                                                        onInput={(e) => {
                                                            console.log(e.target.files);
                                                            setFiles(e.target.files);
                                                        }}
                                                        accept=".csv"
                                                    />
                                                    {files ? "Uploaded" : "Choose File"}
                                                </label>
                                            </Button>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button onClick={handleReset} variant="contained" color="error">
                                        Reset
                                    </Button>
                                    <Button disabled={!!!files || !!!productType} onClick={handleSubmit} variant="contained">
                                        Submit
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

export default AddNewData