import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Button, Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-input-range/lib/css/index.css";
import MovieCard from "./component/MovieCard";
import Navbar from "./component/Navbar";
import InputRange from "react-input-range";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const API_KEY = "e9904e87af8c01979c10aff72e8fdd76";
const animatedComponents = makeAnimated();

function App() {
  //set data
  const [data, setData] = useState([]);

  //set last change data
  const [lastChange, setLastChange] = useState([]);

  //set page
  const [page, setPage] = useState(1);

  //set genre
  const [genre, setGenre] = useState(null);

  //url state
  const [search, setSearch] = useState("");

  //search state
  const [isSearch, setIsSearch] = useState(false);

  //value input range
  const [value, setValue] = useState({
    min: 5,
    max: 6
  });

  //Get trending when first open page
  const getAPI = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}&include_video=true`;
    const result = await fetch(url);
    const json = await result.json();

    const datatemp = data.concat(json.results);

    setData(datatemp);
    setLastChange(datatemp);
  };

  //Get genre
  const getAPIGenre = async () => {
    const urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

    const result = await fetch(urlGenre);
    const json = await result.json();

    setGenre(json);
  };

  useEffect(() => {
    getAPI();
    getAPIGenre();
  }, []);

  useEffect(() => {
    isSearch ? getSearch() : getAPI();
  }, [page]);

  // useEffect(() => {
  //   search && getSearch()
  // },[search])

  //filter by genre
  const filterByGenres = gen_id => {
    console.log(gen_id && gen_id.map( ({value}) => value));

    const tempData = lastChange;

    const filtered = tempData.map( ({genre_ids}) => {
      const a = gen_id.some(num => num);
      return a
    });
    console.log(filtered)
  };

  //Search movies by keywords
  const getSearch = async event => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`;

    const result = await fetch(url);
    const json = await result.json();

    const datatemp = data.concat(json.results);

    setData(datatemp);
    setLastChange(datatemp);
    setIsSearch(true);
  };

  //filter movies by input range
  const filterByRating = value => {
    const tempData = lastChange;
    setValue(value);
    const listFiltered = tempData.filter(item => {
      if (item.vote_average < value.max && item.vote_average > value.min)
        return true;
    });
    setData(listFiltered);
  };

  const onResetFilter = () => {
    setData(data);
  };
  console.log(
    genre &&
      genre.genres.map(({ name }) => {
        return { value: name, label: name };
      })
  );
  return (
    <Container-fluid>
      <Navbar
        dataGenre={genre}
        onSetSearch={setSearch}
        onSearch={getSearch}
        onSetData={setData}
        onFilteredGenre={filterByGenres}
      />

      <Container>
        <Row>
          <Col lg={3} className="filter-section">
            <CreatableSelect
              isMulti
              components={animatedComponents}
              options={
                genre &&
                genre.genres.map(({ name, id }) => {
                  return { value: id, label: name };
                })
              }
              onChange={value => filterByGenres(value)}
            />
            <InputRange
              skip={0.1}
              maxValue={10}
              minValue={0}
              value={value}
              onChange={value => {
                filterByRating(value);
              }}
            />
            <Button variant="dark" onClick={() => setData(lastChange)}>
              Reset filter
            </Button>
          </Col>
          <Col lg={9}>
            <Row>
              {data &&
                data.map(item => {
                  return (
                    <MovieCard
                      data={item}
                      dataGenre={genre}
                      onFilteredGenre={filterByGenres}
                    />
                  );
                })}
            </Row>
          </Col>
        </Row>
        <Button variant="dark" onClick={() => setPage(page + 1)}>
          See more
        </Button>
      </Container>
    </Container-fluid>
  );
}

export default App;
