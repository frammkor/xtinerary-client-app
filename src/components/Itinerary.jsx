import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { getItineraries } from "../actions/itinerariesActions";
import { updateFavorites } from "../actions/favoritesActions";
import Activity from "./Activity";

const Itinerary = (props) => {
  const handleStar = async () => {
    await props.updateFavorites(props.auth.user.id, props.itinerary._id);
    props.getItineraries(props.itinerary.cityId);
  };
  const nextProperty = () => {
    // const newIndex = this.StaticRange.property.index + 1;
    // this.setState({
    //     property: data.properties[newIndex]
    // })
  };
  const prevProperty = () => {
    // const newIndex = this.StaticRange.property.index - 1;
    // this.setState({
    //     property: data.properties[newIndex]
    // })
  };
  const [activities, setActivities] = useState([]);
  const handleClick = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/activities/showActivitiesById/${props.itinerary._id}`
      )
      .then((res) => {
        // props.getActivities(res.data) // for redux
        setActivities(res.data); // for hooks
      });
  };
  // for redux
  // const activitiesToDisplay = props.activities.map(activity => <Activity activity={activity}/>)
  // for hooks
  const activitiesToDisplay = activities.map((activity, index) => (
    <Activity key={index} activity={activity} />
  ));
  return (
    <div className="window-element">
      <h3>{props.itinerary.title}</h3>
      <p>
        This itinerary's ID:
        {props.itinerary._id}
      </p>
      <p>{props.itinerary.stars} members like this itinerary</p>
      <p>{props.itinerary.duration} hours</p>
      <p>{props.itinerary.hashtags.map((hash) => `#${hash} `)}</p>
      {props.auth.isAuthenticated ? (
        <button onClick={handleStar} className="my-button" type="button">
          {props.favoritesItineraries.includes(props.itinerary._id)
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
        data-target={`#collapse${props.itinerary._id}`}
        aria-expanded="false"
        aria-controls={`collapse${props.itinerary_id}`}
      >
        Show activities
      </button>
      <div className="collapse" id={`collapse${props.itinerary._id}`}>
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
