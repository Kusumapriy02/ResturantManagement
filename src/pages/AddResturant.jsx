import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function AddRestaurant() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: "",
  location: "",
  cuisine: "",
  image: "",
  description: "",
  rating: "",
  budget: "",
  phone: "",
  openingHours: "",
  address: ""
});

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post(
        "/restaurants",
        formData
      );

      navigate("/restaurants");

    } catch (error) {

      console.log(error);

    }
  }

  return (
    <div className="form-container">

      <h2>Add Restaurant</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select
  name="budget"
  value={formData.budget}
  onChange={handleChange}
  required
>
  <option value="">
    Select Budget
  </option>

  <option value="Low">
    Low
  </option>

  <option value="Medium">
    Medium
  </option>

  <option value="High">
    High
  </option>
</select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
        />
        <select
  name="budget"
  value={formData.budget}
  onChange={handleChange}
  required
>
  <option value="">Select Budget</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="openingHours"
          placeholder="Opening Hours"
          value={formData.openingHours}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <button
          className="submit-btn"
          type="submit"
        >
          Add Restaurant
        </button>

      </form>

    </div>
  );
}

export default AddRestaurant;