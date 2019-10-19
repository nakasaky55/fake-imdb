import React, { useState } from "react";
import { Card, Col, Modal, Button } from "react-bootstrap";
import ButtonCategory from "./ButtonCategory";

const API_KEY = "e9904e87af8c01979c10aff72e8fdd76";

export default function MovieCard(props) {
  let name;
  const idData = props.data.genre_ids;
  const [video, setVideo] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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

  //get movie trailer
  const getTrailer = async () => {
    const url = `https://api.themoviedb.org/3/movie/${props.data.id}/videos?api_key=${API_KEY}&language=en-US`;

    const response = await fetch(url);
    const result = await response.json();

    setVideo(result.results);
  };

  useState(() => {
    getTrailer();
  }, [props.data]);

  //modal
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <iframe
            width="560"
            height="400"
            src={props.source}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

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
                  onFilteredGenre={props.onFilteredGenre}
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
            {video &&
              video
                .filter(({ site, type }) => {
                  if (site === "YouTube" && type === "Trailer") return true;
                })
                .map((a, i) => {
                  return (
                    <>
                      <div>
                        {/* {console.log("Link trailer" ,`https://www.youtube.com/embed/${a.key}?controls=0`)} */}
                        <Button
                          variant="outline-dark"
                          size="lg"
                          className="button-trailer"
                          onClick={() => setModalShow(true)}
                        >
                          <a>Trailer {i + 1}</a>
                        </Button>
                      </div>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        source={`https://www.youtube.com/embed/${a.key}?controls=0`}
                      />
                    </>
                  );
                })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
