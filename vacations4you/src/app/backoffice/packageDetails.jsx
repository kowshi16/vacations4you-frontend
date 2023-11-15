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
import moment from "moment";
import { getAllPackageAPI } from '../../api/package';

const PackageDetails = () => {
    const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
    const [userData, setUserData] = useState(storedUserData);
    const [pageSize, setPageSize] = useState(5);
    const [packageData, setPackageData] = useState([]);

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
            field: "title",
            headerName: "Title",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.title}</div>,
        },
        {
            field: "destination",
            headerName: "Destination",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.destination}</div>,
        },
        {
            field: "duration",
            headerName: "Duration",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.duration}</div>,
        },
        {
            field: "number_of_participants",
            headerName: "No. of participants",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.number_of_participants}</div>,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.category}</div>,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            renderCell: (params) => <div>{ccyFormat(params?.row?.price)}</div>,
        },
    ];

    useEffect(() => {
        getAllPackageAPI()
            .then((res) => {
                console.log("Res :", res);
                setPackageData(res?.data);
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
                        <b>Activity Details</b>
                    </h5>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={packageData}
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

export default PackageDetails