import React, { useState, useEffect } from "react";
import { Card, Col, Modal, Button } from "react-bootstrap";
import ButtonCategory from "./ButtonCategory";

export default function MovieCard(props) {
  let name;
  const idData = props.data.genre_ids;

  // console.log(idData)
  if (props.dataGenre) {
    const genreData = props.dataGenre.genres;
    name = idData.map(id => {
      const a = genreData.filter(genre => {
        if (genre.id === id) return true;
      });
      return { name: a[0].name, id: a[0].id };
    });
  }

  const API_KEY = "e9904e87af8c01979c10aff72e8fdd76";
  //API call
  const getTrailer = async () => {
    const url = `https://api.themoviedb.org/3/movie/${props.data.id}/videos?api_key=${API_KEY}&language=en-US`;

    const response = await fetch(url);
    const result = await response.json();

    props.setDataTrailer(result)
  };

  return (
    <Col lg={4} md={6}>
      <Card style={{ width: "100%", display: "flex" }} className="custom-card">
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
        />
        <div className="badge-holding">
          {name &&
            name.map(item => {
              return (
                <ButtonCategory
                  movieData={props.data}
                  data={item}
                  // onFilteredGenre={props.onFilteredGenre}
                />
              );
            })}
        </div>
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>{props.data.release_date}</Card.Text>
          <Card.Text>{props.data.overview}</Card.Text>
          <Card.Text>{props.data.vote_average}/10</Card.Text>
          <Card.Text className="trailer-holding">
            <Button
              onClick={() => {
                props.setModalShow(true);
                getTrailer()
              }}
            >
              Offial trailer
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
