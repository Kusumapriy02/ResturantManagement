import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

function EditRestaurant() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cuisine: "",
    image: "",
    description: "",
    rating: "",
    phone: "",
    openingHours: "",
    address: ""
  });

  useEffect(() => {

    async function fetchRestaurant() {

      try {

        const response = await api.get(
          `/restaurants/${id}`
        );

        setFormData(response.data);

      } catch (error) {

        console.log(error);

      }

    }

    fetchRestaurant();

  }, [id]);

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.put(
        `/restaurants/${id}`,
        formData
      );

      alert("Restaurant updated successfully!");

      navigate("/restaurants");

    } catch (error) {

      console.log(error);

      alert("Failed to update restaurant");

    }

  }

  return (
    <div className="form-container">

      <h2>Edit Restaurant</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          Update Restaurant
        </button>

      </form>

    </div>
  );
}

export default EditRestaurant;