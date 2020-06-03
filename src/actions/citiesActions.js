import axios from "axios";
import { GET_ALL_CITIES, UPDATE_FILTERED_CITIES } from "./types";

export const getAllCities = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/cities`)
    .then((res) => {
      dispatch({ type: GET_ALL_CITIES, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ALL_CITIES, payload: [] });
    });
};

export const updateFilteredCities = (filteredCities) => (dispatch) => {
  dispatch({ type: UPDATE_FILTERED_CITIES, payload: filteredCities });
};
