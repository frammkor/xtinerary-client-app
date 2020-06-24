import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getItineraries } from "../../actions/itinerariesActions";
import { getFavorites } from "../../actions/favoritesActions";
import Itinerary from "../../components/Itinerary";

class Itineraries extends Component {
  async componentDidMount() {
    const didMountCityId = this.props.match.params.cityId;
    if (!this.props.itineraries[didMountCityId]) {
      await this.props.getItineraries(didMountCityId);
    }
  }

  render() {
    const { itineraries } = this.props;
    const { country, city, cityId } = this.props.match.params;
    const linkToCreateIti = this.props.auth.isAuthenticated ? (
      <Link
        to={`/itineraryCreate/${country}/${city}/${cityId}`}
        className="my-button"
      >
        Create a new itinerary
      </Link>
    ) : (
      <Link to="/login">Login to create a new Itinerary</Link>
    );
    let itinerariesCards = [];
    if (itineraries[cityId]) {
      itinerariesCards = itineraries[cityId].map((itinerary) => (
        <Itinerary key={itinerary._id} itinerary={itinerary} />
      ));
    }
    const toDisplay = itineraries[cityId] ? (
      <div>
        <h1>
          MYtineraries for
          {city}
        </h1>
        {linkToCreateIti}
        {itinerariesCards}
      </div>
    ) : (
      <div>
        <h1>
          No MYtineraries for
          {city}
        </h1>
        {linkToCreateIti}
      </div>
    );
    return <div className="action-window">{toDisplay}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    itineraries: state.itinerariesReducer.itineraries,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getItineraries, getFavorites })(
  Itineraries
);
