import { GET_ITINERARIES, ADD_NEW_ITINERARY } from "../actions/types";

const initialState = {
  itineraries: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARIES:
      const { cityId, itineraries } = action.payload;
      return {
        ...state,
        itineraries: {
          ...state.itineraries,
          [cityId]: itineraries,
        },
      };
    case ADD_NEW_ITINERARY:
      const cityIdForNewIty = action.payload.createdItinerary.cityId;
      console.log(cityIdForNewIty);
      console.log(state.itineraries);
      return {
        ...state,
        itineraries: {
          ...state.itineraries,
          [cityIdForNewIty]: [
            ...state.itineraries[cityIdForNewIty],
            action.payload.createdItinerary,
          ],
        },
      };
    default:
      return state;
  }
}
