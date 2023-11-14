import { useEffect, useState } from "react";
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
import { saveCruiseBookingAPI } from "../../api/cruise";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";

const ccyFormat = (num) => `${num.toFixed(2)}`;

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// export default function CruiseBooking() {
const CruiseBooking = () => {
  const storedCartData =
    JSON.parse(localStorage.getItem("shopping-cart")) || [];
  const [cartData, setCartData] = useState(storedCartData);

  const invoiceSubtotal = subtotal(cartData);

  const [cruiseBookingData, setCruiseBookingData] = useState([]);

  const paxOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  const [openPopup, setOpenPopup] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogMessage, setDialogMessage] = useState("");

  const [dialogIcon, setDialogIcon] = useState(null);

  const handleOpenDialog = (message = "Cruise Booking Success", icon) => {
    setOpenDialog(true);
    setDialogMessage(message);
    setDialogIcon(icon);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      const validMonth = Math.min(parseInt(monthPart, 10), 12);
      inputValue = validMonth + inputValue.substring(2);
      input.value = inputValue.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    } else {
      input.value = inputValue.replace(/(\d{2})(\d{0,2})/, "$1/$2").slice(0, 5);
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
    } else if (formData.meal_preference === "") {
      setErrorMessage("Meal Preference is required");
      setOpenPopup(true);
    } else if (formData.number_of_participants === "") {
      setErrorMessage("PAX is required");
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

        setCruiseBookingData(updatedFormData);
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  // Save Cruise booking data
  useEffect(() => {
    const saveCruiseBooking = () => {
      saveCruiseBookingAPI(cruiseBookingData)
        .then((res) => {
          if (res.data.length !== 0 && res.status === 200) {
            handleOpenDialog(
              <>
                Cruise Booking Success! <br />
                Your Booking No: <strong>{res.data._id}</strong>
              </>,
              <CheckCircleSharpIcon
                style={{ color: "green", fontSize: "40px" }}
              />
            );
          } else if (res.data.length !== 0) {
            handleOpenDialog(
              "Something went wrong.",
              <ErrorSharpIcon style={{ color: "red", fontSize: "40px" }} />
            );
          }
        })
        .catch((error) => {
          console.error("Error during cruise booking API request:", error);
          handleOpenDialog(
            "Something went wrong.",
            <ErrorSharpIcon style={{ color: "red", fontSize: "40px" }} />
          );
        });
    };
    saveCruiseBooking();
  }, [cruiseBookingData]);

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
                      style={{ borderBottom: "1px solid blue", color: "blue" }}
                    >
                      <InventorySharpIcon />
                      Details
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Provider</TableCell>
                    <TableCell align="center">Cabin</TableCell>
                    <TableCell align="center">Deck</TableCell>
                    <TableCell align="center">Departure</TableCell>
                    <TableCell align="center">Arrival</TableCell>
                    <TableCell align="center">Duration</TableCell>
                    <TableCell align="center" style={{ width: "110px" }}>
                      Arrival Date
                    </TableCell>
                    <TableCell align="center" style={{ width: "130px" }}>
                      Departure Date
                    </TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.cruise_provider}</TableCell>
                      <TableCell align="center">{row.cabin}</TableCell>
                      <TableCell align="center">{row.deck}</TableCell>
                      <TableCell align="center">{row.departure}</TableCell>
                      <TableCell align="center">{row.arrival}</TableCell>
                      <TableCell align="center">{row.duration}</TableCell>
                      <TableCell align="center" style={{ width: "110px" }}>
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
              style={{ borderBottom: "1px solid blue", color: "blue" }}
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
              style={{ borderBottom: "1px solid blue", color: "blue" }}
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
                    {paxOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
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
              style={{ borderBottom: "1px solid blue", color: "blue" }}
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
  );
};

export default CruiseBooking;
