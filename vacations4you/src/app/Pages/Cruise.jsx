import React, { useState, useEffect } from "react";
import "../styles/cruise.css";
import { FaShoppingCart } from "react-icons/fa";
import RatingStars from "../components/RatingStars";
import CruiseCart from "../components/CruiseCart";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  // Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import { getAllCruiseAPI, getCruiseByFiltersAPI } from "../../api/cruise";
import { Image } from "../features/landingPage/landingPageComponents/customComponents/Image";
import noDataFoundImg from "../../images/Common/noDataFound.png";

function Cruise() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [cabin, setCabin] = useState("");
  const [deck, setDeck] = useState("");
  const [departure_date, setDepartureDate] = useState(null);
  const [arrival_date, setArrivalDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [cruise_provider, setCruiseProvider] = useState("");

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeDeparture = (event) => {
    setDeparture(event.target.value);
  };

  const handleChangeArrival = (event) => {
    setArrival(event.target.value);
  };

  const handleChangeDeck = (event) => {
    setDeck(event.target.value);
  };

  const handleChangeCabin = (event) => {
    setCabin(event.target.value);
  };

  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleChangeCruiseProvider = (event) => {
    setCruiseProvider(event.target.value);
  };

  const [cartsVisibility, setCartVisible] = useState(false);

  const [cruisesInCart, setCruise] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cruisesInCart));
  }, [cruisesInCart]);

  //Set cruise data by search criteria
  const queryParams = {
    deck: deck,
    cabin: cabin,
    departure: departure,
    arrival: arrival,
    departure_date: departure_date
      ? new Date(departure_date).toISOString().split("T")[0]
      : "",
    arrival_date: arrival_date
      ? new Date(arrival_date).toISOString().split("T")[0]
      : "",
  };

  const addCruiseToCart = (cruise) => {
    const newCruise = {
      ...cruise,
      count: 1,

      // provider:cruise.name,
      // cabin: cruise.cabin,
      // deck: cruise.deck,
      // departure: cruise.departure,
      // arrival: cruise.arrival,
      // duration: cruise.duration,
      // arrivalDate: cruise.arrival_date,
      // departureDate: cruise.departure_date,
    };

    setCruise([...cruisesInCart, newCruise]);

    const updatedCart = [...cruisesInCart, newCruise];
    setCruise(updatedCart);

    localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));

    //window.location.href = "/cruise-booking";
  };

  //Get all cruise
  const [cruiseDetails, setCruiseDetails] = useState([]);

  const fetchAllCruise = () => {
    getAllCruiseAPI()
      .then((res) => {
        console.log("Res :", res);
        setCruiseDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get all cruise - new method
  useEffect(() => {
    fetchAllCruise();
  }, []);

  const onQuantityChange = (cruiseId, count) => {
    setCruise((oldState) => {
      const cruisesIndex = oldState.findIndex((item) => item._id === cruiseId);
      if (cruisesIndex !== -1) {
        oldState[cruisesIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onCruiseRemove = (cruise) => {
    setCruise((oldState) => {
      const cruisesIndex = oldState.findIndex(
        (item) => item._id === cruise._id
      );
      if (cruisesIndex !== -1) {
        oldState.splice(cruisesIndex, 1);
      }
      return [...oldState];
    });
  };

  //Get Cruise data by search criteria
  const getCruiseBySearch = () => {
    getCruiseByFiltersAPI(queryParams)
      .then((res) => {
        console.log("Search Cruise Records :", res);
        setCruiseDetails(res?.data?.records);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearClick = () => {
    setDeparture("");
    setArrival("");
    setCabin("");
    setDeck("");
    setDepartureDate("");
    setArrivalDate("");

    fetchAllCruise();
  };

  return (
    <div className="cruise-app">
      <div>{/* searching criteria */}</div>
      <CruiseCart
        visibility={cartsVisibility}
        cruises={cruisesInCart}
        onClose={() => setCartVisible(false)}
        onQuantityChange={onQuantityChange}
        onCruiseRemove={onCruiseRemove}
      />
      <div className="navbar-cart">
        <button
          className="btn cruise-cart-btn"
          onClick={() => setCartVisible(true)}
        >
          <FaShoppingCart size={24} />
          {cruisesInCart.length > 0 && (
            <span className="cruise-count">{cruisesInCart.length}</span>
          )}
        </button>
      </div>

      <div className="cruise-div">
        <Card>
          <Grid container className="cruise-card">
            <Grid item xs={3} sx={{ margin: "0 5px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Departure</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={departure}
                  label="Departure"
                  onChange={handleChangeDeparture}
                >
                  <MenuItem value="Colombo">Colombo</MenuItem>
                  <MenuItem value="Hambantota">Hambantota</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} sx={{ margin: "0 5px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Arrival</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={arrival}
                  label="Arrival"
                  onChange={handleChangeArrival}
                >
                  <MenuItem value="Colombo">Colombo</MenuItem>
                  <MenuItem value="Hambantota">Hambantota</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3} sx={{ margin: "0 5px" }}>
              <FormControl fullWidth>
                <DateRangePicker
                  onChange={(newDates) => {
                    if (newDates && newDates.length === 2) {
                      const [start, end] = newDates;
                      // setDepartureDate(start.toJSON());
                      // setArrivalDate(end.toJSON());
                      setDepartureDate(start.toISOString());
                      setArrivalDate(end.toISOString());
                    }
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={3} sx={{ margin: "0px 10px 0px 10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cabin</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cabin}
                  label="Cabin"
                  onChange={handleChangeCabin}
                >
                  <MenuItem value="InsideCabin">Inside Cabin</MenuItem>
                  <MenuItem value="OceanviewCabin">Oceanview Cabin</MenuItem>
                  <MenuItem value="Suit">Suite</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Deck</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={deck}
                  label="Deck"
                  onChange={handleChangeDeck}
                >
                  <MenuItem value="D1">D1</MenuItem>
                  <MenuItem value="D2">D2</MenuItem>
                  <MenuItem value="D3">D3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={1} sx={{ margin: "0 10px 0 20px" }}>
              <Button fullWidth variant="contained" onClick={getCruiseBySearch}>
                Search
              </Button>
            </Grid>

            <Grid item xs={1}>
              <Button fullWidth variant="outlined" onClick={handleClearClick}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>

      <Grid container spacing={2} style={{ marginTop: 40 }}>
        <Grid item xs={3}>
          <Card className="second-filter">
            <Grid container style={{ marginTop: 40 }}>
              {/* <Grid item xs={12} style={{ marginLeft: 16 }}>
                <label className="title">Price</label>
              </Grid> */}

              <Grid item xs={10}>
                {/* <Slider
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDis
                  play="auto"
                /> */}

                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  style={{ marginLeft: 16 }}
                >
                  Price
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="500 To 1000"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="1001 To 2000"
                  />

                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="2001 To 3000"
                  />

                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="3001 To 4000"
                  />

                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label="4001 and more"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={10} style={{ marginTop: 25, marginLeft: 16 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Duration
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={duration}
                    label="Duration"
                    onChange={handleChangeDuration}
                  >
                    <MenuItem value="1-3">1 to 3 nights</MenuItem>
                    <MenuItem value="4-6">4 to 6 nights</MenuItem>
                    <MenuItem value="7-9">7 to 9 nights</MenuItem>
                    <MenuItem value="10-13">10 to 13 nights</MenuItem>
                    <MenuItem value="14">14 and more nights</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={10}
                style={{ marginTop: 40, marginBottom: 40, marginLeft: 16 }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Cruise Provider
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cruise_provider}
                    label="cruise_provider"
                    onChange={handleChangeCruiseProvider}
                  >
                    <MenuItem value="carnival_cruise_line">
                      Carnival Cruise Line
                    </MenuItem>
                    <MenuItem value="princess_cruises">
                      Princess Cruises
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={9}>
          <main>
            <h2 className="title">Available Cruise Packages</h2>
            <div className="cruises">
              {cruiseDetails.length > 0 ? (
                cruiseDetails.map((cruise) => (
                  <div className="cruise" key={cruise._id}>
                    <img
                      className="cruise-image"
                      src={cruise.image_path}
                      alt={cruise.image_path}
                    />
                    <h4 className="cruise-name">{cruise.name}</h4>
                    <RatingStars rating={cruise.rating} />
                    <p>
                      <strong>Cabin - </strong>
                      {cruise.cabin}
                    </p>
                    <p>
                      <strong>Deck - </strong>
                      {cruise.deck}
                    </p>
                    <p>
                      <strong>Price - </strong>
                      {cruise.price}
                    </p>
                    <p>
                      <strong>Arrival - </strong>
                      {cruise.arrival}
                    </p>
                    <p>
                      <strong>Departure - </strong>
                      {cruise.departure}
                    </p>
                    <p>
                      <strong>Duration - </strong>
                      {cruise.duration}
                    </p>
                    <p>
                      <strong>Provider - </strong>
                      {cruise.cruise_provider}
                    </p>
                    {/* <p>
      <strong>Arrival Date - </strong>
      {cruise.arrival_date}
    </p> */}
                    <p>
                      <strong>Arrival Date - </strong>
                      {moment(cruise.arrival_date).format("YYYY-MM-DD")}
                    </p>
                    {/* <p>
      <strong>Departure Date - </strong>
      {cruise.departure_date}
    </p> */}
                    <p>
                      <strong>Departure Date - </strong>
                      {moment(cruise.departure_date).format("YYYY-MM-DD")}
                    </p>

                    <span className="cruise-price">{cruise.price}$</span>
                    <div className="buttons">
                      <button
                        className="btn"
                        onClick={() => addCruiseToCart(cruise)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <Image as="a" image={noDataFoundImg} alt="No Data Found" />
              )}
            </div>
          </main>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cruise;
