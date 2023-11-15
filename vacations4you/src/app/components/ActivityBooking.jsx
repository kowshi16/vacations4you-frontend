import React, { useEffect, useState } from "react";
import "../styles/activityBooking.css";
import {
    Card,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import moment from "moment";

import PhoneForwardedSharpIcon from "@mui/icons-material/PhoneForwardedSharp";
import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import { saveActivityBookingAPI } from "../../api/activity";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import NavBar from "./Navbar";

const ccyFormat = (num) => `${num.toFixed(2)}`;

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function ActivityBooking() {
    const storedCartData =
        JSON.parse(localStorage.getItem("shopping-cart-activity")) || [];
    const [cartData, setCartData] = useState(storedCartData);

    const invoiceSubtotal = subtotal(cartData);

    const [activityBookingData, setActivityBookingData] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    const [dialogMessage, setDialogMessage] = useState("");

    const [dialogIcon, setDialogIcon] = useState(null);

    const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
    const [userData, setUserData] = useState(storedUserData);

    const [isSuccess, setIsSuccess] = useState('');

    const handleOpenDialog = (message = "Activity Booking Success", icon) => {
        setOpenDialog(true);
        setDialogMessage(message);
        setDialogIcon(icon);
    };

    const handleCloseDialog = () => {
        localStorage.removeItem("shopping-cart-activity");
        if (isSuccess === 'success') {
            window.location.replace("/activity");
        }
        else {
            setOpenDialog(false);
        }
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const formatDate = (event) => {
        const input = event.target;
        let inputValue = input.value.replace(/[^0-9]/g, "");

        if (inputValue.length <= 2) {
            input.value = inputValue;
        } else if (inputValue.length <= 4) {
            const monthPart = inputValue.slice(0, 2);
            const yearPart = inputValue.slice(2);
            const validMonth = Math.min(parseInt(monthPart, 10), 12);

            input.value = `${String(validMonth).padStart(2, "0")}/${yearPart}`;
        } else {
            const monthPart = inputValue.slice(0, 2);
            const yearPart = inputValue.slice(2, 4);
            const validMonth = Math.min(parseInt(monthPart, 10), 12);

            input.value = `${String(validMonth).padStart(2, "0")}/${yearPart}`;
        }
    };

    const onlyLetters = (event) => {
        const input = event.target;
        input.value = input.value.replace(/[^a-zA-Z ]/g, "");
    };

    useEffect(() => {
        const updatedCartData =
            JSON.parse(localStorage.getItem("shopping-cart-activity")) || [];
        setCartData(updatedCartData);
    }, []);

    const [formData, setFormData] = useState({
        user_id: userData.existingUser._id,
        customer_first_name: "",
        customer_last_name: "",
        customer_email: "",
        customer_phone_no: "",
        number_of_participants: "",
        age: "",
        date: new Date(),
        card_number: "",
        expiry_date: "",
        cvv: "",
        name_on_card: "",
    });

    const bookingDetails = cartData.map((row) => ({
        title: row.title,
        destination: row.destination,
        activity_type: row.activity_type,
        activity_date: row.date,
        price: row.price,
    }));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const visaCardRegex = /^\d{16}$/;
    const visaCardExpireDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    // const handleCheckout
    const handleCheckout = () => {
        if (formData.customer_first_name === "") {
            setErrorMessage("First Name is required");
            setOpenPopup(true);
        } else if (formData.customer_last_name === "") {
            setErrorMessage("Last Name is required");
            setOpenPopup(true);
        } else if (!emailPattern.test(formData.customer_email)) {
            setErrorMessage("Email is invalid");
            setOpenPopup(true);
        } else if (formData.customer_phone_no === "") {
            setErrorMessage("Phone number is required");
            setOpenPopup(true);
        } else if (formData.number_of_participants === "") {
            setErrorMessage("No. of participants is required");
            setOpenPopup(true);
        } else if (formData.age === "") {
            setErrorMessage("Age is required is required");
            setOpenPopup(true);
        } else if (!visaCardRegex.test(formData.card_number)) {
            setErrorMessage("Invalid card number");
            setOpenPopup(true);
        } else if (!visaCardExpireDateRegex.test(formData.expiry_date)) {
            setErrorMessage("Expiry date is invalid");
            setOpenPopup(true);
        } else if (formData.cvv === "") {
            setErrorMessage("CVV Date is required");
            setOpenPopup(true);
        } else if (formData.name_on_card === "") {
            setErrorMessage("Name on card is required");
            setOpenPopup(true);
        } else {
            try {
                const updatedFormData = {
                    ...formData,
                    number_of_booking: bookingDetails,
                };

                setActivityBookingData(updatedFormData);
            } catch (error) {
                console.error("Error during checkout:", error);
            }
        }
    };

    // Handle Back Button
    const handleBack = () => {
        window.location.replace("/package");
    };

    // Save Activity booking data
    useEffect(() => {
        const saveActivityBooking = () => {
            saveActivityBookingAPI(activityBookingData)
                .then((res) => {
                    if (res.data.length !== 0 && res.status === 200) {
                        setIsSuccess('success');
                        handleOpenDialog(
                            <>
                                Activity Booking Success! <br />
                                Your Booking No: <strong>{res.data._id}</strong>
                            </>,
                            <CheckCircleSharpIcon
                                style={{ color: "green", fontSize: "40px" }}
                            />
                        );
                    } else if (res.data.length !== 0) {
                        setIsSuccess('error');
                        handleOpenDialog(
                            "Something went wrong.",
                            <ErrorSharpIcon style={{ color: "red", fontSize: "40px" }} />
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error during activity booking API request:", error);
                    handleOpenDialog(
                        "Something went wrong.",
                        <ErrorSharpIcon style={{ color: "red", fontSize: "40px" }} />
                    );
                });
        };
        saveActivityBooking();
    }, [activityBookingData]);

    return (
        <React.Fragment>
            <NavBar />

            <div className="activityBookingCard">
                <Card />

                <Grid container justifyContent="center">
                    <Grid item sm={12} style={{ marginLeft: 50, marginTop: 20 }}>
                        <h4>Checkout</h4>
                    </Grid>

                    <Grid item sm={12} style={{ margin: "30px 100px 0 100px" }}>
                        <div style={{ overflowY: "auto", maxHeight: "400px" }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="left"
                                                colSpan={11}
                                                style={{ borderBottom: "1px solid #1976D2", color: "#1976D2" }}
                                            >
                                                <InventorySharpIcon />
                                                Details
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="center">Title</TableCell>
                                            <TableCell align="center">Destination</TableCell>
                                            <TableCell align="center">Activity Type</TableCell>
                                            <TableCell align="center">Date</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{row.title}</TableCell>
                                                <TableCell align="center">{row.destination}</TableCell>
                                                <TableCell align="center">{row.activity_type}</TableCell>
                                                <TableCell align="center" style={{ width: "110px" }}>
                                                    {" "}
                                                    {moment(row.date).format("YYYY-MM-DD")}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {ccyFormat(row.price)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={10} />
                                            <TableCell align="right" colSpan={8}>
                                                Total
                                            </TableCell>
                                            <TableCell align="right">
                                                {ccyFormat(invoiceSubtotal)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>

                    <Grid item sm={12} style={{ margin: "10px 100px 0 100px" }}>
                        <Card style={{ padding: 20, marginTop: 20 }}>
                            <Grid
                                container
                                alignItems="center"
                                style={{ borderBottom: "1px solid #1976D2", color: "#1976D2" }}
                            >
                                <Grid item sm={12}>
                                    <label style={{ fontSize: 15 }}>
                                        {" "}
                                        <PhoneForwardedSharpIcon fontSize="small" /> Contact details
                                    </label>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item sm={6} style={{ marginTop: 10 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        onInput={onlyLetters}
                                        value={formData.customer_first_name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                customer_first_name: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                <Grid item sm={6} style={{ marginTop: 10 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Last Name"
                                        variant="outlined"
                                        onInput={onlyLetters}
                                        value={formData.customer_last_name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                customer_last_name: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                <Grid item sm={6} style={{ marginTop: 10 }}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.customer_email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, customer_email: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item sm={6} style={{ marginTop: 10 }}>
                                    <TextField
                                        label="Phone Number"
                                        type="tel"
                                        variant="outlined"
                                        fullWidth
                                        onInput={(e) => {
                                            e.target.value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10);
                                        }}
                                        value={formData.customer_phone_no}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                customer_phone_no: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item sm={12} style={{ margin: "10px 100px 0 100px" }}>
                        <Card sm={12} style={{ padding: 20, marginTop: 20 }}>
                            <Grid
                                container
                                alignItems="center"
                                style={{ borderBottom: "1px solid #1976D2", color: "#1976D2" }}
                            >
                                <Grid item sm={12}>
                                    <label style={{ fontSize: 15 }}>
                                        {" "}
                                        <EmojiPeopleIcon fontSize="small" /> No. of participants & Age
                                        Count
                                    </label>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item sm={6} style={{ marginTop: 10 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            No. of participants
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="No. of participants"
                                            value={formData.number_of_participants}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    number_of_participants: parseInt(e.target.value),
                                                })
                                            }
                                        >
                                            <MenuItem value="1">1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                            <MenuItem value="6">6</MenuItem>
                                            <MenuItem value="7">7</MenuItem>
                                            <MenuItem value="8">8</MenuItem>
                                            <MenuItem value="9">9</MenuItem>
                                            <MenuItem value="10">10</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={2} style={{ marginTop: 10 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Age"
                                            value={formData.age}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    age: e.target.value,
                                                })
                                            }
                                        >
                                            <MenuItem value="18-25">18 - 25</MenuItem>
                                            <MenuItem value="26-35">26 - 35</MenuItem>
                                            <MenuItem value="36-45">36 - 45</MenuItem>
                                            <MenuItem value="46-55">46 - 55</MenuItem>
                                            <MenuItem value="56-65">56 - 65</MenuItem>
                                            <MenuItem value="66 and above">66 and above</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4}></Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item sm={12} style={{ margin: "10px 100px 0 100px" }}>
                        <Card sm={12} style={{ padding: 20, marginTop: 20 }}>
                            <Grid
                                container
                                alignItems="center"
                                style={{ borderBottom: "1px solid #1976D2", color: "#1976D2" }}
                            >
                                <Grid item sm={12}>
                                    <label style={{ fontSize: 15 }}>
                                        {" "}
                                        <MonetizationOnSharpIcon fontSize="small" /> Payment Method
                                    </label>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{ marginTop: 1 }}>
                                <Grid item sm={6}>
                                    <TextField
                                        label="Card Number"
                                        variant="outlined"
                                        fullWidth
                                        onInput={(e) => {
                                            e.target.value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 16);
                                        }}
                                        value={formData.card_number}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                card_number: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        label="Expiry Date"
                                        variant="outlined"
                                        fullWidth
                                        placeholder="MM-YY"
                                        onInput={formatDate}
                                        value={formData.expiry_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                expiry_date: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        label="CVV"
                                        variant="outlined"
                                        fullWidth
                                        onInput={(e) => {
                                            e.target.value = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 3);
                                        }}
                                        value={formData.cvv}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                cvv: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        label="Name on Card"
                                        variant="outlined"
                                        fullWidth
                                        onInput={onlyLetters}
                                        value={formData.name_on_card}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name_on_card: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ marginTop: 5, marginBottom: 5 }}
                    >
                        <Grid item sm={2}>
                            <Button
                                fullWidth
                                style={{ background: "#fff", border: "1px solid var(--main-color)", color: "var(--main-color)" }}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item sm={2}>
                            <Button
                                fullWidth
                                style={{ background: "var(--main-color)", color: "#fff", marginLeft: "1rem" }}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </Button>
                        </Grid>
                    </Grid>

                    <Dialog
                        open={openPopup}
                        onClose={handleClosePopup}
                        PaperProps={{
                            style: {
                                width: "400px",
                            },
                        }}
                    >
                        <DialogTitle style={{ textAlign: "center" }}>
                            <ErrorSharpIcon style={{ color: "red", fontSize: "40px" }} />
                        </DialogTitle>
                        <DialogContent style={{ textAlign: "center", fontWeight: "bold" }}>
                            <p>{errorMessage}</p>
                        </DialogContent>
                        <DialogActions style={{ justifyContent: "center" }}>
                            <Button
                                onClick={handleClosePopup}
                                style={{ background: "var(--main-color)", color: "white" }}
                            >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        PaperProps={{
                            style: {
                                width: "400px",
                            },
                        }}
                    >
                        <DialogTitle style={{ textAlign: "center" }}>
                            {dialogIcon}
                        </DialogTitle>
                        <DialogTitle style={{ textAlign: "center" }}>
                            {dialogMessage}
                        </DialogTitle>
                        <DialogContent></DialogContent>
                        <DialogActions style={{ justifyContent: "center" }}>
                            <Button
                                onClick={handleCloseDialog}
                                style={{ background: "var(--main-color)", color: "white" }}
                            >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Card />
            </div>
        </React.Fragment>
    );
}
