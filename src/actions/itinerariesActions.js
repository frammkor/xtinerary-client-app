import axios from "axios";
import { GET_ITINERARIES, ADD_NEW_ITINERARY } from "./types";

export const getItineraries = (cityId) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/itineraries/${cityId}`)
    .then((res) => {
      dispatch({
        type: GET_ITINERARIES,
        payload: { cityId, itineraries: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ITINERARIES, payload: [] });
    });
};

export const addNewItinerary = (newItinerary) => (dispatch) => {
  dispatch({ type: ADD_NEW_ITINERARY, payload: newItinerary });
};
