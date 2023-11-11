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

const ccyFormat = (num) => `${num.toFixed(2)}`;

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function CruiseBooking() {
  const storedCartData =
    JSON.parse(localStorage.getItem("shopping-cart")) || [];
  const [cartData, setCartData] = useState(storedCartData);

  useEffect(() => {
    const updatedCartData =
      JSON.parse(localStorage.getItem("shopping-cart")) || [];
    setCartData(updatedCartData);
  }, []);

  const invoiceSubtotal = subtotal(cartData);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    setIsValid(emailPattern.test(inputEmail));
  };

  const handlePhoneChange = (event) => {
    const inputPhone = event.target.value;
    setPhone(inputPhone);

    const phonePattern = /^\d{10}$/;

    setIsValid(phonePattern.test(inputPhone));
  };

  const [meal, setMeal] = React.useState("");

  const handleChangeMeal = (event) => {
    setMeal(event.target.value);
  };

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic
    console.log(data);
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
                      colSpan={10}
                      style={{ borderBottom: "1px solid #000" }}
                    >
                      <InventorySharpIcon />
                      Details
                    </TableCell>
                  </TableRow>

                  <TableRow>
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
                    <TableCell rowSpan={9} />
                    <TableCell align="right" colSpan={7}>
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
                />
              </Grid>

              <Grid item sm={6} style={{ marginTop: 10 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                />
              </Grid>

              <Grid item sm={6} style={{ marginTop: 10 }}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!isValid}
                  helperText={!isValid ? "Invalid email address" : ""}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>

              <Grid item sm={6} style={{ marginTop: 10 }}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  variant="outlined"
                  fullWidth
                  error={!isValid}
                  helperText={
                    !isValid ? "Enter a valid 10-digit phone number" : ""
                  }
                  value={phone}
                  onChange={handlePhoneChange}
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
                  <FastfoodSharpIcon fontSize="small" /> Meal Preferences
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
                    value={meal}
                    label="Meal Preferences"
                    onChange={handleChangeMeal}
                  >
                    <MenuItem value="RoomService">Room Service</MenuItem>
                    <MenuItem value="Buffet">Buffet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={6} style={{ marginTop: 10 }}></Grid>
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
                  <MonetizationOnSharpIcon fontSize="small" /> Payment Methods
                </label>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item sm={6} style={{ marginTop: 10 }}></Grid>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                          error={Boolean(fieldState.error)}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                          error={Boolean(fieldState.error)}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                          error={Boolean(fieldState.error)}
                          helperText={
                            fieldState.error ? fieldState.error.message : null
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Card>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          <Grid item sm={3}>
            <Button fullWidth variant="contained">
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Card />
    </div>
  );
}
