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
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Navbar.Brand href="/">Fake IMDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {/* <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Another action</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item> */}
            {
              props.dataGenre && props.dataGenre.genres.map(item => {
                return <NavDropdown.Item onClick={() => props.onFilteredGenre(item.id)}>{item.name}</NavDropdown.Item>
              })
            }
          </NavDropdown>
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
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
