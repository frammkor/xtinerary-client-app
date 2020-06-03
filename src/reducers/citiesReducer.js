import { GET_ALL_CITIES, UPDATE_FILTERED_CITIES } from "../actions/types";

const initialState = {
  allCities: [],
  filteredCities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CITIES:
      return {
        ...state,
        allCities: action.payload,
        filteredCities: action.payload,
      };
    case UPDATE_FILTERED_CITIES:
      return {
        ...state,
        filteredCities: action.payload,
      };
    default:
      return state;
  }
}
