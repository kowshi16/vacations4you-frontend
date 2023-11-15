import React, { useState, useEffect } from "react";
import "../styles/package.css";
import { FaShoppingCart } from "react-icons/fa";
import NavBar from "../components/Navbar";
import { getAllPackageAPI, getDestinationsAPI, getPackageBySearchCriteriaAPI, getCategoryAPI } from "../../api/package";
import PackageCart from "../components/PackageCart";
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
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import RatingStars from "../components/RatingStars";
import { Image } from "../features/landingPage/landingPageComponents/customComponents/Image";
import noDataFoundImg from "../../images/Common/noDataFound.png";
import Typography from "@mui/material/Typography";

function Package() {
  const [cartsVisibility, setCartVisible] = useState(false);
  const [packagesInCart, setPackage] = useState(
    JSON.parse(localStorage.getItem("shopping-cart-package")) || []
  );
  const [payload, setPayload] = useState({
    destination: "",
    duration: "",
    number_of_participants: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: ""
  });
  const [packageDetails, setPackageDetails] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("USER")) || [];
  const [userData, setUserData] = useState(storedUserData);

  useEffect(() => {
    localStorage.setItem("shopping-cart-package", JSON.stringify(packagesInCart));
  }, [packagesInCart]);

  useEffect(() => {
    getDestinationsAPI()
      .then((res) => {
        console.log("Res :", res);
        setDestinationOptions(res?.data?.destinations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCategoryAPI()
      .then((res) => {
        console.log("Res :", res);
        setCategoryOptions(res?.data?.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onQuantityChange = (packageId, count) => {
    setPackage((oldState) => {
      const packagesIndex = oldState.findIndex((item) => item._id === packageId);
      if (packagesIndex !== -1) {
        oldState[packagesIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onPackageRemove = (packagee) => {
    setPackage((oldState) => {
      const packagesIndex = oldState.findIndex(
        (item) => item._id === packagee._id
      );
      if (packagesIndex !== -1) {
        oldState.splice(packagesIndex, 1);
      }
      return [...oldState];
    });
  };

  const fetchAllPackage = () => {
    getAllPackageAPI()
      .then((res) => {
        console.log("Res :", res);
        setPackageDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get all package
  useEffect(() => {
    fetchAllPackage();
  }, []);

  //Get Package data by search criteria
  const getPackageBySearch = () => {
    getPackageBySearchCriteriaAPI(payload)
      .then((res) => {
        console.log("Search Package Records :", res);
        setPackageDetails(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearClick = () => {
    setPayload({
      ...payload, destination: "", duration: "", number_of_participants: "", category: "",
      minPrice: "", maxPrice: "", rating: ""
    });
    fetchAllPackage();
  };

  const handleClearFiltersClick = () => {
    setSelectedPriceRange("");
    setPayload({ ...payload, rating: "", minPrice: "", maxPrice: "" });
    getPackageBySearchCriteriaAPI({
      ...payload, destination: payload.destination, duration: payload.duration,
      number_of_participants: payload.number_of_participants, category: payload.category,
      minPrice: "", maxPrice: "", rating: ""
    })
      .then((res) => {
        console.log("Search Package Records :", res);
        setPackageDetails(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addPackageToCart = (packagee) => {
    const newPackage = {
      ...packagee,
      count: 1,
    };

    setPackage([...packagesInCart, newPackage]);

    const updatedCart = [...packagesInCart, newPackage];
    setPackage(updatedCart);

    localStorage.setItem("shopping-cart-package", JSON.stringify(updatedCart));
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="package-app">
        <PackageCart
          visibility={cartsVisibility}
          packages={packagesInCart}
          onClose={() => setCartVisible(false)}
          onQuantityChange={onQuantityChange}
          onPackageRemove={onPackageRemove}
        />
        <div className="navbar">
          <div className="navbar-left ml-[7rem]">
            <Typography variant="h5" noWrap component="div">
              <b>Welcome {userData.existingUser.name} 👋 </b> ({userData.existingUser.user_role})
            </Typography>
          </div>
          <div className="navbar-right">
            <div className="navbar-cart">
              <button
                className="button package-cart-btn"
                onClick={() => setCartVisible(true)}
              >
                <FaShoppingCart size={24} />
                {packagesInCart.length > 0 && (
                  <span className="package-count">{packagesInCart.length}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <Grid item sm={12} style={{ margin: "30px 100px 0 100px" }}>
          <Card style={{ padding: 20 }} className="package-card">
            <Grid
              container
              alignItems="center"
              style={{ borderBottom: "1px solid #fff" }}
            >
              <Grid item sm={12}>
                <label style={{ fontSize: 15, color: "#fff" }}>
                  {" "}
                  <SearchSharpIcon fontSize="small" /> Package Search
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
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {destinationOptions.map(destination => (
                      <MenuItem key={destination} value={destination}>
                        {destination}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={6} style={{ marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={payload.duration}
                    label="Duration"
                    onChange={(event) => {
                      setPayload({ ...payload, duration: event.target.value })
                    }}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <MenuItem value="1N 2D">1N 2D</MenuItem>
                    <MenuItem value="2N 3D">2N 3D</MenuItem>
                    <MenuItem value="3N 4D">3N 4D</MenuItem>
                    <MenuItem value="4N 5D">4N 5D</MenuItem>
                    <MenuItem value="5N 6D">5N 6D</MenuItem>
                    <MenuItem value="6N 7D">6N 7D</MenuItem>
                    <MenuItem value="7N 8D">7N 8D</MenuItem>
                    <MenuItem value="8N 9D">8N 9D</MenuItem>
                    <MenuItem value="9N 10D">9N 10D</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={6} style={{ marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Number of Travelers</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={payload.number_of_participants}
                    label="Number of Travelers"
                    onChange={(event) => {
                      setPayload({ ...payload, number_of_participants: event.target.value })
                    }}
                    style={{ backgroundColor: "#fff" }}
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

              <Grid item sm={6} style={{ marginTop: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Speciality</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={payload.category}
                    label="Speciality"
                    onChange={(event) => {
                      setPayload({ ...payload, category: event.target.value })
                    }}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {categoryOptions.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={3} style={{ marginTop: 5 }}>
                <Button
                  fullWidth
                  onClick={getPackageBySearch}
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
                      setPayload({
                        ...payload,
                        minPrice: event.target.value.split("-")[0] ? event.target.value.split("-")[0] : "",
                        maxPrice: event.target.value.split("-")[1] ? event.target.value.split("-")[1] : ""
                      })
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
                    onClick={getPackageBySearch}
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
              {/* <h2 className="title">Available Package</h2> */}
              <div className="packages">
                {packageDetails?.length > 0 ? (
                  packageDetails.map((packagee) => (
                    <div className="package" key={packagee._id}>
                      <img
                        className="package-image"
                        src={packagee.image_path}
                        alt={packagee.image_path}
                      />
                      <h5 className="package-name">{packagee.title}</h5>

                      <Grid item xs={12}>
                        <RatingStars rating={packagee.rating} />
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Destination - </strong>
                        {packagee.destination}
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Speciality - </strong>
                        {packagee.category}
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Duration - </strong>
                        {packagee.duration}
                      </Grid>

                      <Grid item xs={12}>
                        <strong>No. of participants - </strong>
                        {packagee.number_of_participants}
                      </Grid>

                      <Grid item xs={12}>
                        <strong>Price - </strong>$ {packagee.price?.toLocaleString()}
                      </Grid>

                      <div className="buttons">
                        <button
                          className="button"
                          onClick={() => addPackageToCart(packagee)}
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

export default Package;
