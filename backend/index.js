const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/restaurant_management")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  cuisine: String,
  rating: Number,
  phone: String,
  openingHours: String,
  address: String,
  description: String
});

const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema
);

// GET restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get restaurants"
    });
  }
});

// GET restaurant by ID
app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.params.id
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: "Invalid restaurant ID"
    });
  }
});

// ADD restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);

    const savedRestaurant =
      await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add restaurant"
    });
  }
});

// UPDATE restaurant
app.put("/restaurants/:id", async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update restaurant"
    });
  }
});

// DELETE restaurant
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findByIdAndDelete(
        req.params.id
      );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.json({
      message: "Restaurant deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete restaurant"
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log(
    "Backend running at http://localhost:3000"
  );
});