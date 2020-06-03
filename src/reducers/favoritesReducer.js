import {
  GET_FAVORITES,
  UPDATE_FAVORITES,
  CLEAR_FAVORITES,
} from "../actions/types";

const initialState = {
  favoritesItineraries: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        favoritesItineraries: action.payload,
      };
    case UPDATE_FAVORITES:
      return {
        ...state,
        favoritesItineraries: action.payload,
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favoritesItineraries: action.payload,
      };
    default:
      return state;
  }
}
