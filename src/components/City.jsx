import * as React from "react";
import { Link } from "react-router-dom";

const City = (props) => {
  // I intended to use this lines to create a responsive img loading for the cities cards
  // const w = window.innerWidth
  // || document.documentElement.clientWidth
  // || document.body.clientWidth;
  let imgWidth = 500;
  // if (w < 1024) {
  //     imgWidth = 300
  // }
  const imgBackground = `url(${process.env.REACT_APP_IMAGES_URL}/${props._id}-${imgWidth}.jpg)`;
  return (
    <li>
      <Link
        to={`/itineraries/${props.country}/${props.city}/${props._id}`}
        className="city-cards"
        style={{
          backgroundImage: imgBackground,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="city-title .my-button">
          <p className="city-name">
            {props.city} - {props.country}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default City;
