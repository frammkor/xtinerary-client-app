import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import favoritesReducer from "./favoritesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  citiesReducer,
  itinerariesReducer,
  favoritesReducer,
});
