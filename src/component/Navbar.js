import React from "react";
import {
  Button,
  Navbar,
  NavDropdown,
  Nav,
  FormControl,
  Form
} from "react-bootstrap";

export default function Navvbar(props) {
  return (
    <Navbar expand="lg" variant="dark" fixed="top">
      <Navbar.Brand href="/">Fake IMDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          
        </Nav>
        <Form
          inline
          onChange={event => {
            props.onSetData([])
            props.onSetSearch(event.target.value);
          }}
          onSubmit={event =>{
            event.preventDefault();
            props.onSearch()
          }}
        >
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button type="submit" variant="dark">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
