import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Modal,
  Tab,
  Tabs
} from "react-bootstrap";
import "react-input-range/lib/css/index.css";

import Carousel from "./component/Carousel";
import MovieCard from "./component/MovieCard";
import Navbar from "./component/Navbar";
import Pagination from "./component/Pagination";

import InputRange from "react-input-range";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import ModalTrailer from "./component/ModalTrailer";

const API_KEY = "e9904e87af8c01979c10aff72e8fdd76";
const animatedComponents = makeAnimated();

function App() {
  //set data
  const [data, setData] = useState([]);

  //set last change data
  const [lastChange, setLastChange] = useState([]);

  //set manipulated data
  const [manipulatedData, setManipulatedData] = useState([]);

  //set page
  const [page, setPage] = useState(1);

  //set genre
  const [genre, setGenre] = useState(null);

  //url state
  const [search, setSearch] = useState("");

  //multi select search state
  const [defaultValue, setDefaultValue] = useState({ name: null, value: null });

  //search state
  const [isSearch, setIsSearch] = useState(false);

  //value input range
  const [value, setValue] = useState({
    min: 5,
    max: 6
  });

  //state to manage filter by genre
  const [isFilterByGenre, setIsFilterByGenre] = useState(false);

  //state to manage filter by rating
  const [isFilterByRating, setIsFilterByRating] = useState(false);

  //navbar state
  const [isNavbar, setIsNavbar] = useState("relative");

  //Get trending when first open page
  const getAPI = async (currPage) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${currPage}&include_video=true`;
    const result = await fetch(url);
    const jsonResult = await result.json();

    setData(jsonResult.results);
    setLastChange(jsonResult.results);
    setTotalPage(jsonResult.total_pages);

  };

  //Get genre
  const getAPIGenre = async () => {
    const urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

    const result = await fetch(urlGenre);
    const json = await result.json();

    setGenre(json);
  };

  //modal state
  const [modalShow, setModalShow] = useState(false);

  //set trailer url
  const [dataTrailer, setDataTrailer] = useState(null);

  //set total page
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    getAPI(page);
    getAPIGenre();
  }, []);

  useEffect(() => {
    isSearch ? getSearch() : getAPI(page);
  }, [page]);

  // useEffect(() => {
  //   search && getSearch()
  // },[search])

  //check an array .includes in another array or not
  const checker = (target, arr) =>
    target && target.every(v => arr && arr.includes(v));

  //filter by genre
  const filterByGenres = gen_id => {
    if (gen_id !== null && gen_id.length != 0) {
      setIsFilterByGenre(true);
    } else {
      setIsFilterByGenre(false);
      setData(lastChange);
      return;
    }

    let id = gen_id && gen_id.map(({ value }) => value);

    let tempData;
    isFilterByRating ? (tempData = manipulatedData) : (tempData = lastChange);

    const filtered = tempData.filter(item => {
      if (checker(id, item.genre_ids)) return true;
    });

    setData(filtered);
    setManipulatedData(filtered);
    setDefaultValue(gen_id);
  };

  //filter movies by input range
  const filterByRating = value => {
    let tempData;
    isFilterByGenre ? (tempData = manipulatedData) : (tempData = lastChange);
    setValue(value);
    const listFiltered = tempData.filter(item => {
      if (item.vote_average < value.max && item.vote_average > value.min)
        return true;
    });
    setData(listFiltered);
    setIsFilterByRating(true);
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
    setIsNavbar("none");
  };

  const onResetFilter = () => {
    setData(data);
  };

  return (
    <>
      <Container-fluid>
        <Navbar
          dataGenre={genre}
          onSetSearch={setSearch}
          onSearch={getSearch}
          onSetData={setData}
          onFilteredGenre={filterByGenres}
        />
        <Carousel display={isNavbar} data={lastChange && lastChange} />
        <Container>
          <Row>
            <Col lg={3} className="filter-section">
              <p>Filter by genre</p>
              <CreatableSelect
                defaultValue={defaultValue}
                isMulti
                components={animatedComponents}
                inputValue={defaultValue.input}
                value={defaultValue.name}
                options={
                  genre &&
                  genre.genres.map(({ name, id }) => {
                    return { value: id, label: name };
                  })
                }
                onChange={value => filterByGenres(value)}
              />
              <p>Filter by Rating</p>
              <InputRange
                formatLabel={value => `${value}/10`}
                step={1}
                maxValue={10.0}
                minValue={0.0}
                value={value}
                onChange={value => {
                  filterByRating(value);
                }}
              />
              <Button
                variant="dark"
                onClick={() => {
                  setData(lastChange);
                  setIsFilterByGenre(false);
                  setIsFilterByRating(false);
                  setDefaultValue({ name: null, value: null });
                }}
              >
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
                        setModalShow={setModalShow}
                        setDataTrailer={setDataTrailer}
                      />
                    );
                  })}
              </Row>
              {totalPage &&<Pagination totalPage={totalPage} page={page} setPage={setPage} pageHandle={getAPI}/>}
            </Col>
          </Row>
          {/* <Button variant="dark" onClick={() => setPage(page + 1)}>
            See more
          </Button> */}
        </Container>
      </Container-fluid>
      <ModalTrailer
        modalShow={modalShow}
        setModalShow={setModalShow}
        dataTrailer={dataTrailer}
      />
    </>
  );
}

export default App;
