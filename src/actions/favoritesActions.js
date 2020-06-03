import axios from "axios";
import { GET_FAVORITES, UPDATE_FAVORITES, CLEAR_FAVORITES } from "./types";

export const getFavorites = (userId) => (dispatch) => {
  axios
    .get(`http://localhost:8080/api/getfavorites/${userId}`)
    .then((res) => {
      dispatch({ type: GET_FAVORITES, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_FAVORITES, payload: [] });
    });
};

export const updateFavorites = (userId, itineraryId) => (dispatch) => {
  axios
    .put(
      `${process.env.REACT_APP_API_URL}/itineraries/favorite/${userId}/${itineraryId}`
    )
    .then((res) => {
      const { stars, favoriteList } = res.data;
      // aqui recibo la variable stars, que si yo guardara en redux los itinerarios
      // guardados en keys con el id de la ciudad, una vez modificado el like, podria
      // acceder a solo ese itinerario en redux y actualizar ese itinerario solo en ves
      // de pedir todos los itinerarios para esa ciudad nuevamente
      dispatch({ type: UPDATE_FAVORITES, payload: favoriteList });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: UPDATE_FAVORITES, payload: [] });
    });
};

export const clearFavorites = () => (dispatch) => {
  dispatch({ type: CLEAR_FAVORITES, payload: [] });
};
