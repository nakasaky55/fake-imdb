import React from "react";
import { Carousel } from "react-bootstrap";

export default function CarouselComponent(props) {

  return (
    <Carousel>
      {props.data.map(item => {
        return (
          <Carousel.Item style={{ display: props.display }}>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{item.original_title}</h3>
              <p>{item.overview}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
