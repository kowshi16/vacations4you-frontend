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
import { getAllActivityAPI } from '../../api/activity';

const ActivityDetails = () => {
    const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
    const [userData, setUserData] = useState(storedUserData);
    const [pageSize, setPageSize] = useState(5);
    const [activityData, setActivityData] = useState([]);

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
            field: "activity_type",
            headerName: "Activity Type",
            flex: 1,
            renderCell: (params) => <div>{params?.row?.activity_type}</div>,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            renderCell: (params) => <div>{moment(params?.row?.date).format("YYYY-MM-DD")}</div>,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            renderCell: (params) => <div>{ccyFormat(params?.row?.price)}</div>,
        },
    ];

    useEffect(() => {
        getAllActivityAPI()
            .then((res) => {
                console.log("Res :", res);
                setActivityData(res?.data);
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
                            rows={activityData}
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

export default ActivityDetails