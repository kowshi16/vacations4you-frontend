import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import "../styles/admin.css";
import Typography from "@mui/material/Typography";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
    Grid,
} from "@mui/material";
import { getAllAgentDetailsAPI, getTotalActivityPriceAPI, getTotalCruisePriceAPI, getTotalPackagePriceAPI } from '../../api/admin';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
    const [userData, setUserData] = useState(storedUserData);
    const [agents, setAgents] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [cruisePrice, setCruisePrice] = useState(0);
    const [activityPrice, setActivityPrice] = useState(0);
    const [packagePrice, setPackagePrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAgentDetailsAPI()
            .then((res) => {
                console.log("Res :", res);
                setAgents(res?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getTotalCruisePriceAPI()
            .then((res) => {
                console.log("Res :", res);
                setCruisePrice(res?.data?.cruiseTotalPrice);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getTotalActivityPriceAPI()
            .then((res) => {
                console.log("Res :", res);
                setActivityPrice(res?.data?.activityTotalPrice);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        getTotalPackagePriceAPI()
            .then((res) => {
                console.log("Res :", res);
                setPackagePrice(res?.data?.packageTotalPrice);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.name}</div>,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.email}</div>,
        },
        {
            field: "view",
            headerName: "Edit",
            flex: 1,
            renderCell: (params) => (
                <EditIcon style={{cursor: "pointer", color: "green"}} 
                    onClick={() => {
                        localStorage.setItem("ID", params?.row?._id);
                        navigate(`/agent-edit`);
                    }}>
                </EditIcon>
            ),
        },
    ];

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
                    <div className="row mb-2">
                        <div className="col-lg-3 mb-2">
                            <div className="card" style={{ backgroundColor: "#4095C4" }}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Total Travel Agents{" "}
                                        <GroupsIcon
                                            fontSize="large"
                                            style={{ color: "#FFFFFF", marginBottom: "5px" }}
                                        ></GroupsIcon>
                                    </h5>
                                    <h2 className="card-text">{agents.length}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-2">
                            <div className="card" style={{ backgroundColor: "#2C6BAA" }}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Cruise Income{" "}
                                        <AttachMoneyIcon
                                            fontSize="large"
                                            style={{ color: "#FFFFFF", marginBottom: "5px" }}
                                        ></AttachMoneyIcon>
                                    </h5>
                                    <h2 className="card-text">{cruisePrice}.00</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-2">
                            <div className="card" style={{ backgroundColor: "#404FA5" }}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Activity Income{" "}
                                        <AttachMoneyIcon
                                            fontSize="large"
                                            style={{ color: "#FFFFFF", marginBottom: "5px" }}
                                        ></AttachMoneyIcon>
                                    </h5>
                                    <h2 className="card-text">{activityPrice}.00</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-2">
                            <div className="card" style={{ backgroundColor: "#404FA5" }}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Package Income{" "}
                                        <AttachMoneyIcon
                                            fontSize="large"
                                            style={{ color: "#FFFFFF", marginBottom: "5px" }}
                                        ></AttachMoneyIcon>
                                    </h5>
                                    <h2 className="card-text">{packagePrice}.00</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={agents}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                            loading={false}
                            getRowId={(row) => row._id}
                            components={{ Toolbar: CustomToolbar }}
                        />
                    </div>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default AdminDashboard