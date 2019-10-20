import React from "react";
import { Badge } from "react-bootstrap";

export default function ButtonCategory(props) {
    
  return <Badge className={props.data.name}>{props.data.name}</Badge>;
}
