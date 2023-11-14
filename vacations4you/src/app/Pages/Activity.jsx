import React, { useState, useEffect } from "react";
import "../styles/activity.css";
import activity1Img from "../../images/ActivityPage/hiking.jpg";
import { Grid, Card, CardContent, CardMedia, Typography, Rating, Button, Slider, Box } from '@mui/material';

const activities = [
  {
    id: 1,
    title: 'Hiking Adventure',
    description: 'Explore scenic trails and enjoy breathtaking views.',
    rating: 4.5,
    price: 50,
    imageUrl: {activity1Img},
  },
  {
    id: 2,
    title: 'City Bike Tour',
    description: 'Discover the city landmarks on a guided bike tour.',
    rating: 4.2,
    price: 30,
    imageUrl: '../../images/ActivityPage/snorkelling.jpg',
  },
  // Add more activities as needed
];

function Activity() {


  const [ratingFilter, setRatingFilter] = useState([0, 5]);
  const [priceFilter, setPriceFilter] = useState([0, 100]);

  const handleRatingChange = (event, newValue) => {
    setRatingFilter(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.rating >= ratingFilter[0] &&
      activity.rating <= ratingFilter[1] &&
      activity.price >= priceFilter[0] &&
      activity.price <= priceFilter[1]
  );

  return (
    <React.Fragment>
      {/* <div
        className="p-5 bg-primary bs-cover"
        style={{
          backgroundImage: "url(https://d3rr2gvhjw0wwy.cloudfront.net/uploads/mandators/56119/cms/598855/940x500-1-50-7a7c6a8b2fdcb59bf2cfe1f590f4c01e.jpg)",
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container text-center">
          <span className="display-5 px-3 bg-white rounded shadow">
            Activity
          </span>
        </div>
      </div> */}

      
      <Grid container spacing={3}>
      {/* Filters */}
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Filters</Typography>
            <Typography gutterBottom>Rating</Typography>
            <Rating value={ratingFilter} onChange={handleRatingChange} precision={0.5} />
            <Typography gutterBottom>Price Range</Typography>
            <Slider value={priceFilter} onChange={handlePriceChange} valueLabelDisplay="auto" />
          </CardContent>
        </Card>
      </Grid>

      {/* Activities */}
      <Grid item xs={9}>
        <Grid container spacing={2}>
          {filteredActivities.map((activity) => (
            <Grid item key={activity.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia component="img" height="120" image={activity1Img} alt={activity.title} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {activity.description}
                  </Typography>
                  <Rating value={activity.rating} precision={0.5} readOnly />
                  <Box mt={1}>
                    <Typography variant="h6">${activity.price}</Typography>
                  </Box>
                  <Button variant="contained" color="primary">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>

    </React.Fragment>
  );
}

export default Activity;
