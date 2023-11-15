import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import "../styles/backoffice.css";
import Typography from "@mui/material/Typography";
import {
    Grid,
} from "@mui/material";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { getAllCruiseAPI } from '../../api/cruise';
import moment from "moment";

const CruiseDetails = () => {
    const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
    const [userData, setUserData] = useState(storedUserData);
    const [pageSize, setPageSize] = useState(5);
    const [cruiseData, setCruiseData] = useState([]);

    const ccyFormat = (num) => `${num.toFixed(2)}`;

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
            field: "cruise_provider",
            headerName: "Cruise Provider",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.cruise_provider}</div>,
        },
        {
            field: "cabin",
            headerName: "Cabin",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.cabin}</div>,
        },
        {
            field: "deck",
            headerName: "Deck",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.deck}</div>,
        },
        {
            field: "departure",
            headerName: "Departure",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.departure}</div>,
        },
        {
            field: "arrival",
            headerName: "Arrival",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.arrival}</div>,
        },
        {
            field: "duration",
            headerName: "Duration",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.duration}</div>,
        },
        {
            field: "arrival_date",
            headerName: "Arrival Date",
            flex: 1,
            renderCell: (params) => <div>{moment(params?.row?.arrival_date).format("YYYY-MM-DD")}</div>,
        },
        {
            field: "departure_date",
            headerName: "Departure Date",
            flex: 1,
            renderCell: (params) => <div>{moment(params?.row?.departure_date).format("YYYY-MM-DD")}</div>,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            renderCell: (params) => <div>{ccyFormat(params?.row?.price)}</div>,
        },
    ];

    useEffect(() => {
        getAllCruiseAPI()
            .then((res) => {
                console.log("Res :", res);
                setCruiseData(res?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                    <h5 className="card-title mb-4">
                        <b>Cruise Details</b>
                    </h5>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={cruiseData}
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

export default CruiseDetails