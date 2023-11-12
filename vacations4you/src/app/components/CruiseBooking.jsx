import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { saveCruiseBookingAPI } from "../../api/cruise";

const ccyFormat = (num) => `${num.toFixed(2)}`;

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function CruiseBooking() {
  const { control, handleSubmit } = useForm();

  const storedCartData =
    JSON.parse(localStorage.getItem("shopping-cart")) || [];
  const [cartData, setCartData] = useState(storedCartData);

  const invoiceSubtotal = subtotal(cartData);

  const [cruiseBookingData, setCruiseBookingData] = useState([]);

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
      JSON.parse(localStorage.getItem("shopping-cart")) || [];
    setCartData(updatedCartData);
  }, []);

  const [formData, setFormData] = useState({
    user_id: 123,
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_phone_no: "",
    meal_preference: "",
    number_of_participants: "",
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
        cruise_name: row.name,
        cabin: row.cabin,
        deck: row.deck,
        departure: row.departure,
        arrival: row.arrival,
        departure_date: row.departure_date,
        arrival_date: row.arrival_date,
        price: row.price,
        duration: row.duration,
        cruise_provider: row.cruise_provider,
      }));

      const updatedFormData = {
        ...formData,
        number_of_booking: bookingDetails,
      };

      setCruiseBookingData(updatedFormData);
      saveCruiseBooking();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // Save Cruise booking data
  const saveCruiseBooking = () => {
    saveCruiseBookingAPI(cruiseBookingData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <TableCell>Provider</TableCell>
                    <TableCell align="right">Cabin</TableCell>
                    <TableCell align="right">Deck</TableCell>
                    <TableCell align="right">Departure</TableCell>
                    <TableCell align="right">Arrival</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Arrival Date</TableCell>
                    <TableCell align="right">Departure Date</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.cruise_provider}</TableCell>
                      <TableCell align="right">{row.cabin}</TableCell>
                      <TableCell align="right">{row.deck}</TableCell>
                      <TableCell align="right">{row.departure}</TableCell>
                      <TableCell align="right">{row.arrival}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="right">
                        {" "}
                        {moment(row.arrival_date).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="right">
                        {moment(row.departure_date).format("YYYY-MM-DD")}
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
                  <FastfoodSharpIcon fontSize="small" /> Meal Preferences and
                  Packs Count
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
                    // value={meal_preference}
                    label="Meal Preferences"
                    // onChange={handleChangeMeal}
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
                  <InputLabel id="demo-simple-select-label">Packs</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={pack}
                    label="Packs"
                    // onChange={handleChangePack}
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

            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Grid container spacing={2} style={{ marginTop: 1 }}>
              <Grid item sm={6}>
                <Controller
                  name="cardNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Card number is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16);
                      }}
                      error={Boolean(fieldState.error)}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                      {...field}
                      value={formData.card_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          card_number: e.target.value,
                        })
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="expiryDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Expiry date is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Expiry Date"
                      variant="outlined"
                      fullWidth
                      placeholder="YYYY-MM-DD"
                      onInput={formatDate}
                      error={Boolean(fieldState.error)}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                      {...field}
                      value={formData.expiry_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expiry_date: e.target.value,
                        })
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="cvv"
                  control={control}
                  defaultValue=""
                  rules={{ required: "CVV is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="CVV"
                      variant="outlined"
                      fullWidth
                      error={Boolean(fieldState.error)}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                      {...field}
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
                  )}
                />
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="nameOnCard"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name on card is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Name on Card"
                      variant="outlined"
                      fullWidth
                      onInput={onlyLetters}
                      error={Boolean(fieldState.error)}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                      {...field}
                      value={formData.name_on_card}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name_on_card: e.target.value,
                        })
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* </form> */}
          </Card>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          <Grid item sm={3}>
            <Button
              fullWidth
              style={{ background: "var(--main-color)", color: "#fff" }}
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
