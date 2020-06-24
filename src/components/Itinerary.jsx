import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { getItineraries } from "../actions/itinerariesActions";
import { updateFavorites } from "../actions/favoritesActions";
import Activity from "./Activity/index";

const Itinerary = (props) => {
  const { itinerary, auth } = props;
  const [activities, setActivities] = useState([]);

  const handleStar = async () => {
    await props.updateFavorites(auth.user.id, itinerary._id);
    props.getItineraries(itinerary.cityId);
  };

  const handleClick = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/activities/showActivitiesById/${itinerary._id}`
      )
      .then((res) => {
        setActivities(res.data);
      });
  };

  const activitiesToDisplay = activities.map((activity, index) => (
    <Activity key={index} activity={activity} />
  ));

  return (
    <div className="window-element">
      <h3>{itinerary.title}</h3>
      <p>
        This itinerary's ID:
        {itinerary._id}
      </p>
      <p>{itinerary.stars} members like this itinerary</p>
      <p>{itinerary.duration} hours</p>
      <p>{itinerary.hashtags.map((hash) => `#${hash} `)}</p>
      {props.auth.isAuthenticated ? (
        <button onClick={handleStar} className="my-button" type="button">
          {props.favoritesItineraries.includes(itinerary._id)
            ? "Remove from Favorites"
            : "Save to Favorites"}
        </button>
      ) : (
        <button className="my-button" type="button">
          <Link to="/login">Login to save to Favorites</Link>
        </button>
      )}
      <button
        onClick={handleClick}
        className="my-button"
        type="button"
        data-toggle="collapse"
        data-target={`#collapse${itinerary._id}`}
        aria-expanded="false"
        aria-controls={`collapse${itinerary._id}`}
      >
        Show activities
      </button>
      <div className="collapse" id={`collapse${itinerary._id}`}>
        <div className="cards-slider">
          <div className="cards-slider-wrapper">{activitiesToDisplay}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  favoritesItineraries: state.favoritesReducer.favoritesItineraries,
});

export default connect(mapStateToProps, { getItineraries, updateFavorites })(
  Itinerary
);
