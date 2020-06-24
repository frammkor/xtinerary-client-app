import React, { Component } from "react";
import { connect } from "react-redux";
import { CityCard } from "../../components";
import {
  getAllCities,
  updateFilteredCities,
} from "../../actions/citiesActions";

class CityList extends Component {
  async componentDidMount() {
    await this.props.getAllCities();
  }

  render() {
    const { allCities } = this.props;
    let { filteredCities } = this.props;
    const toDisplay = filteredCities.map((cityObj) => {
      return (
        <CityCard
          city={cityObj.city}
          country={cityObj.country}
          _id={cityObj._id}
          key={cityObj._id}
        />
      );
    });

    const handelChange = (e) => {
      const userInput = e.target.value.toLowerCase();
      console.log(this.props);
      filteredCities = allCities.filter((element) => {
        if (element.city.toLowerCase().indexOf(userInput, 0) === 0) {
          return element;
        }
      });
      this.props.updateFilteredCities(filteredCities);
    };
    return (
      <div className="action-window center-column">
        <div>
          <h2>
            Choose from
            {allCities.length} spaceports
          </h2>
        </div>
        <div className="input-textarea">
          <input
            type="text"
            name="toFilterCities"
            id="toFilterCities"
            label="explore"
            placeholder="Explore"
            onChange={handelChange}
          />
        </div>
        <p>
          Showing:
          {filteredCities.length} locations
        </p>
        <ul className="city-cards-container">{toDisplay}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredCities: state.citiesReducer.filteredCities,
    allCities: state.citiesReducer.allCities,
  };
};

export default connect(mapStateToProps, { getAllCities, updateFilteredCities })(
  CityList
);
