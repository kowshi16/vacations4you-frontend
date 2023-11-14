import React, { useEffect, useState } from "react";
import "../styles/cruiseBooking.css";
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
} from "@mui/material";
import moment from "moment";

import PhoneForwardedSharpIcon from "@mui/icons-material/PhoneForwardedSharp";
import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";

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

    const formatDate = (event) => {
        const input = event.target;
        const inputValue = input.value.replace(/[^0-9]/g, "");

        if (inputValue.length <= 4) {
            input.value = inputValue;
        } else if (inputValue.length <= 6) {
            input.value = inputValue.replace(/(\d{4})(\d{0,2})/, "$1-$2");
        } else {
            input.value = inputValue
                .replace(/(\d{4})(\d{2})(\d{0,2})/, "$1-$2-$3")
                .slice(0, 10);
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
        user_id: 123,
        customer_first_name: "",
        customer_last_name: "",
        customer_email: "",
        customer_phone_no: "",
        number_of_participants: "",
        participants_age: "",
        date: new Date(),
        card_number: "",
        expiry_date: "",
        cvv: "",
        name_on_card: "",
    });

    // const handleCheckout
    const handleCheckout = () => {
        try {
            const bookingDetails = cartData.map((row) => ({
                title: row.title,
                destination: row.destination,
                activity_type: row.activity_type,
                activity_date: row.date,
                price: row.price,
            }));

            const updatedFormData = {
                ...formData,
                number_of_booking: bookingDetails,
            };

            setActivityBookingData(updatedFormData);
            saveActivityBooking();
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    // Save Cruise booking data
    const saveActivityBooking = () => {
        // saveCruiseBookingAPI(cruiseBookingData)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    };

    // Handle Back Button
    const handleBack = () => {
        window.location.replace("/activity");
    };

    return (
        <div className="cruiseBookingCard">
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
                                            style={{ borderBottom: "1px solid #000" }}
                                        >
                                            <InventorySharpIcon />
                                            Details
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Destination</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Price $</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.destination}</TableCell>
                                            <TableCell align="right">{row.activity_type}</TableCell>
                                            <TableCell align="right">
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
                            style={{ borderBottom: "1px solid #000" }}
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
                            style={{ borderBottom: "1px solid #000" }}
                        >
                            <Grid item sm={12}>
                                <label style={{ fontSize: 15 }}>
                                    {" "}
                                    <FastfoodSharpIcon fontSize="small" /> Meal Preferences & PAX
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
                                        Meal Preferences
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Meal Preferences"
                                        value={formData.meal_preference}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                meal_preference: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem value="RoomService">Room Service</MenuItem>
                                        <MenuItem value="Buffet">Buffet</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item sm={2} style={{ marginTop: 10 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">PAX</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="PAX"
                                        value={formData.number_of_participants}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                number_of_participants: e.target.value,
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

                            <Grid item sm={4}></Grid>
                        </Grid>
                    </Card>
                </Grid>

                <Grid item sm={12} style={{ margin: "10px 100px 0 100px" }}>
                    <Card sm={12} style={{ padding: 20, marginTop: 20 }}>
                        <Grid
                            container
                            alignItems="center"
                            style={{ borderBottom: "1px solid #000" }}
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
                                    placeholder="YYYY-MM-DD"
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
            </Grid>

            <Card />
        </div>
    );
}
