import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { addNewItinerary } from "../actions/itinerariesActions";

const ItineraryCreate = (props) => {
  const { cityId, city } = props.match.params;
  const [itineraryForm, setItineraryForm] = useState({
    title: "Your New Itinerary Title",
    description: "tell us about your adventure",
    author: props.auth.user.userName,
    authorId: props.auth.user.id,
    duration: 0,
    price: 0,
    hashtags: [],
    cityId,
  });

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/itineraries/${cityId}`,
        itineraryForm
      )
      .then((res) => {
        if (res.status === 200) {
          props.addNewItinerary(res.data);
        }
      })
      .catch((err) => alert("something went wrong"));
  };
  const handleChange = (e) => {
    setItineraryForm({
      ...itineraryForm,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="action-window">
      <div className="window-element">
        <h1>
          Create a new Itinerary for
          {city}
        </h1>
        <form action="" method="get" className="center-column">
          <label htmlFor="title">Itinerary Title</label>
          <div className="input-textarea">
            <input
              onChange={handleChange}
              id="title"
              type="text"
              className=""
            />
          </div>
          <label htmlFor="description">Itinerary Description</label>
          <div className="input-textarea">
            <input
              onChange={handleChange}
              id="description"
              type="text"
              className=""
            />
          </div>
          <label htmlFor="duration">Itinerary Duration</label>
          <div className="input-textarea">
            <input
              onChange={handleChange}
              id="duration"
              type="text"
              className=""
            />
          </div>
          <label htmlFor="price">Itinerary Price</label>
          <div className="input-textarea">
            <input
              onChange={handleChange}
              id="price"
              type="text"
              className=""
            />
          </div>
          <label htmlFor="hashtags">
            Itinerary's Hashtags
            <small> (Separate them by spaces)</small>
          </label>
          <div className="input-textarea">
            <input
              onChange={handleChange}
              id="hashtags"
              type="text"
              className=""
            />
          </div>
          <button type="submit" className="my-button" onClick={handleClick}>
            Post New Itinerary
          </button>
        </form>
      </div>
      <div className="window-element">
        <h4>
          Preview your Itinerary for
          {city}
        </h4>
        <h5>{itineraryForm.title}</h5>
        <p>{itineraryForm.description}</p>
        <p>
          Duration:
          {itineraryForm.duration}
        </p>
        <p>
          Price:
          {itineraryForm.price}
        </p>
        <p>
          by:
          {itineraryForm.author}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { addNewItinerary })(ItineraryCreate);
