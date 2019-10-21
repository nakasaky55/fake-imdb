import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Modal, Tab } from "react-bootstrap";

export default function ModalTrailer(props) {
  const [defaultKey, setDefaultKey] = useState(null);
  const data =
    props.dataTrailer &&
    props.dataTrailer.results.filter(item => {
      if (item.site === "YouTube" && item.type === "Trailer") return true;
    });
  useEffect(() => {
    data && setDefaultKey(data[0].id);
  }, [props.dataTrailer]);

  //   console.log(defaultKey)

  return (
    <Modal
      show={props.modalShow}
      onHide={() => props.setModalShow(false)}
      // {...props}
      size="lg"
    //   aria-labelledby="contained-modal-title-vcenter"
      centered
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Tab.Container
        id="left-tabs-example"
        activeKey={defaultKey}
        onSelect={k => setDefaultKey(k)}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {data &&
                data.map((item, i) => {
                  return (
                    <Nav.Item>
                      <Nav.Link eventKey={item.id}>
                        <img src={`https://img.youtube.com/vi/${item.key}/1.jpg`}></img>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {data &&
                data.map(item => {
                  return (
                    <Tab.Pane eventKey={item.id}>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${item.key}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </Tab.Pane>
                  );
                })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Modal>
  );
}
