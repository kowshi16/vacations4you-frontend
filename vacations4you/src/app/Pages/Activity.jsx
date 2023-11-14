import React, { useState, useEffect } from "react";
import "../styles/activity.css";
import { FaShoppingCart } from "react-icons/fa";
import ActivityCart from "../components/ActivityCart";
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
import { DatePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import moment from "moment";
import { getActivityBySearchCriteriaAPI, getAllActivityAPI } from "../../api/activity";
import { Image } from "../features/landingPage/landingPageComponents/customComponents/Image";
import noDataFoundImg from "../../images/Common/noDataFound.png";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import RatingStars from "../components/RatingStars";
import NavBar from "../components/Navbar";

function Activity() {
  const [cartsVisibility, setCartVisible] = useState(false);
  const [activitiesInCart, setActivity] = useState(
    JSON.parse(localStorage.getItem("shopping-cart-activity")) || []
  );
  const [payload, setPayload] = useState({
    destination: "",
    date: null,
    activity_type: "",
    rating: "",
    minPrice: "",
    maxPrice: ""
  });
  const [activityDetails, setActivityDetails] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  console.log("selectedPriceValue >>>>>>>>>>>", selectedPriceRange);
  console.log("payload >>>>>>>>>>>", payload);

  useEffect(() => {
    localStorage.setItem("shopping-cart-activity", JSON.stringify(activitiesInCart));
  }, [activitiesInCart]);

  const onQuantityChange = (activityId, count) => {
    setActivity((oldState) => {
      const activitiesIndex = oldState.findIndex((item) => item._id === activityId);
      if (activitiesIndex !== -1) {
        oldState[activitiesIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onActivityRemove = (activity) => {
    setActivity((oldState) => {
      const activitiesIndex = oldState.findIndex(
        (item) => item._id === activity._id
      );
      if (activitiesIndex !== -1) {
        oldState.splice(activitiesIndex, 1);
      }
      return [...oldState];
    });
  };

  const fetchAllActivity = () => {
    getAllActivityAPI()
      .then((res) => {
        console.log("Res :", res);
        setActivityDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get all activity
  useEffect(() => {
    fetchAllActivity();
  }, []);

  //Get Activity data by search criteria
  const getActivityBySearch = () => {
    getActivityBySearchCriteriaAPI({ ...payload, date: payload.date ? new Date(payload.date).toISOString().split("T")[0] : "" })
      .then((res) => {
        console.log("Search Activity Records :", res);
        setActivityDetails(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearClick = () => {
    setPayload({ ...payload, destination: "", date: null, activity_type: "", rating: "", price: "" });
    fetchAllActivity();
  };

  const handleClearFiltersClick = () => {
    setSelectedPriceRange("");
    setPayload({ ...payload, rating: "", minPrice: "", maxPrice: "" });
    getActivityBySearchCriteriaAPI({
      ...payload, destination: payload.destination, date: payload.date ? new Date(payload.date).toISOString().split("T")[0] : ""
      , activity_type: payload.activity_type, rating: "", minPrice: "", maxPrice: ""
    })
      .then((res) => {
        console.log("Search Activity Records :", res);
        setActivityDetails(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addActivityToCart = (activity) => {
    const newActivity = {
      ...activity,
      count: 1,
    };

    setActivity([...activitiesInCart, newActivity]);

    const updatedCart = [...activitiesInCart, newActivity];
    setActivity(updatedCart);

    localStorage.setItem("shopping-cart-activity", JSON.stringify(updatedCart));
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="activity-app">
        <ActivityCart
          visibility={cartsVisibility}
          activities={activitiesInCart}
          onClose={() => setCartVisible(false)}
          onQuantityChange={onQuantityChange}
          onActivityRemove={onActivityRemove}
        />
        <div className="navbar-cart">
          <button
            className="button activity-cart-btn"
            onClick={() => setCartVisible(true)}
          >
            <FaShoppingCart size={24} />
            {activitiesInCart.length > 0 && (
              <span className="activity-count">{activitiesInCart.length}</span>
            )}
          </button>
        </div>

        <Grid item sm={12} style={{ margin: "10px 100px 0 100px" }}>
          <Card style={{ padding: 20 }} className="activity-card">
            <Grid
              container
              alignItems="center"
              style={{ borderBottom: "1px solid #fff" }}
            >
              <Grid item sm={12}>
                <label style={{ fontSize: 15, color: "#fff" }}>
                  {" "}
                  <SearchSharpIcon fontSize="small" /> Activity Search
                </label>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: 5 }}
              spacing={2}
            >
              <Grid item sm={6} style={{ marginTop: 5 }}>
                <FormControl fullWidth>
                  <DatePicker ranges={[]}
                    value={payload.date}
                    onClean={handleClearClick}
                    onChange={(newDate) => {
                      setPayload({ ...payload, date: newDate })
                    }} />
                </FormControl>
              </Grid>

              <Grid item sm={6} style={{ marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Destination</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={payload.destination}
                    label="Destination"
                    onChange={(event) => {
                      setPayload({ ...payload, destination: event.target.value })
                    }}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <MenuItem value="Colombo">Colombo</MenuItem>
                    <MenuItem value="Singapore">Singapore</MenuItem>
                    <MenuItem value="Maldives">Maldives</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={6} style={{ marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Activity Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={payload.activity_type}
                    label="Activity Type"
                    onChange={(event) => {
                      setPayload({ ...payload, activity_type: event.target.value })
                    }}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <MenuItem value="Leisure">Leisure</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Wildlife">Wildlife</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={3} style={{ marginTop: 5 }}>
                <Button
                  fullWidth
                  onClick={getActivityBySearch}
                  style={{ background: "var(--main-color)", color: "#fff" }}
                >
                  Search
                </Button>
              </Grid>

              <Grid item sm={3} style={{ marginTop: 5 }}>
                <Button
                  fullWidth
                  style={{
                    border: "1px solid var(--main-color)",
                    color: "var(--main-color)",
                    fontWeight: "bold",
                    background: "#fff",
                  }}
                  onClick={handleClearClick}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid container style={{ marginTop: 40 }}>
          <Grid item xs={3}>
            <Card className="second-filter">
              <Grid
                item
                xs={9}
                style={{ borderBottom: "1px solid blue", color: "blue" }}
              >
                <label style={{ fontSize: 15 }}>
                  <FilterListSharpIcon /> Filters
                </label>
              </Grid>

              <Grid container style={{ marginTop: 20 }}>
                {/* <Grid item xs={12} style={{ marginLeft: 16 }}>
                <label className="title">Price</label>
              </Grid> */}

                <Grid item xs={10}>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    style={{ marginLeft: 16 }}
                  >
                    Price
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectedPriceRange}
                    onChange={(event) => {
                      setSelectedPriceRange(event.target.value);
                      setPayload({...payload, 
                        minPrice: event.target.value.split("-")[0] ? event.target.value.split("-")[0] : "" , 
                        maxPrice: event.target.value.split("-")[1] ? event.target.value.split("-")[1] : "" })
                    }}
                  >
                    <FormControlLabel value="" control={<Radio />} label="All" />

                    <FormControlLabel
                      value={"5000-10000"}
                      control={<Radio />}
                      label="$ 5000 To 10000"
                    />
                    <FormControlLabel
                      value={"10001-20000"}
                      control={<Radio />}
                      label="$ 10001 To 20000"
                    />

                    <FormControlLabel
                      value={"20001-30000"}
                      control={<Radio />}
                      label="$ 20001 To 30000"
                    />

                    <FormControlLabel
                      value={"30001-40000"}
                      control={<Radio />}
                      label="$ 30001 To 40000"
                    />

                    <FormControlLabel
                      value={"40001"}
                      control={<Radio />}
                      label="$ 40001 and more"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={10}>
                  {/* <Slider
                  defaultValue={50}
                  aria-label="Default"
                  valueLabelDis
                  play="auto"
                /> */}

                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    style={{ marginLeft: 16, marginTop: 10 }}
                  >
                    Rating
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={payload.rating}
                    onChange={(event) => {
                      setPayload({ ...payload, rating: event.target.value })
                    }}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="1⭐"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="2⭐"
                    />

                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="3⭐"
                    />

                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="4⭐"
                    />

                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="5⭐"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item sm={4} style={{ marginTop: 5 }}>
                  <Button
                    fullWidth
                    onClick={getActivityBySearch}
                    style={{ background: "var(--main-color)", color: "#fff" }}
                  >
                    Search
                  </Button>
                </Grid>

                <Grid item sm={4} style={{ marginTop: 5, marginLeft: 10, marginBottom: 10 }}>
                  <Button
                    fullWidth
                    style={{
                      border: "1px solid var(--main-color)",
                      color: "var(--main-color)",
                      fontWeight: "bold",
                    }}
                    onClick={handleClearFiltersClick}
                  >
                    Clear
                  </Button>
                </Grid>

              </Grid>
            </Card>
          </Grid>

          <Grid item xs={9}>
            <main>
              {/* <h2 className="title">Available Activity</h2> */}
              <div className="activities">
                {activityDetails?.length > 0 ? (
                  activityDetails.map((activity) => (
                    <div className="activity" key={activity._id}>
                      <img
                        className="activity-image"
                        src={activity.image_path}
                        alt={activity.image_path}
                      />
                      <h5 className="activity-name">{activity.title}</h5>

                      <Grid item xs={12}>
                      <RatingStars rating={activity.rating} />
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Destination - </strong>
                        {activity.destination}
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Type - </strong>
                        {activity.activity_type}
                      </Grid>
                      
                      <Grid item xs={12}>
                        <strong>Date - </strong>
                        {moment(activity.date).format("YYYY-MM-DD")}
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Price - </strong>$ {activity.price?.toLocaleString()}
                      </Grid>

                      <div className="buttons">
                        <button
                          className="button"
                          onClick={() => addActivityToCart(activity)}
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
    </React.Fragment>
  );
}

export default Activity;
