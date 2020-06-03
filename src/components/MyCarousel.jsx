import React, { useState } from "react";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const MyCard = (props) => {
  return (
    <div className="my-card">
      <Card>
        <CardImg top width="100%" src={props.city.url} alt={props.city.name} />
        <CardBody>
          <CardTitle>{props.city.name}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

const Slide = (props) => {
  return (
    <div className="container row">
      <div className="col-6">
        <MyCard city={props.cityArr[0]} />
        <MyCard city={props.cityArr[1]} />
      </div>
      <div className="col-6">
        <MyCard city={props.cityArr[2]} />
        <MyCard city={props.cityArr[3]} />
      </div>
    </div>
  );
};

const MyCarousel = (props) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Slide cityArr={props.cityArr[0]} className="d-block w-100" />
        </div>
        <div className="carousel-item">
          <Slide cityArr={props.cityArr[1]} className="d-block w-100" />
        </div>
        <div className="carousel-item">
          <Slide cityArr={props.cityArr[0]} className="d-block w-100" />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default MyCarousel;
