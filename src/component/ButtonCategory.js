import React from "react";
import { Badge } from "react-bootstrap";

export default function ButtonCategory(props) {
    
  return <Badge variant="primary">{props.data.name}</Badge>;
}
