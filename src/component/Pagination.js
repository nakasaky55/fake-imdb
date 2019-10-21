import React from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationSection(props) {
  let pages = [];
  console.log("page", props.page);
  for (let i = 1; i <= props.totalPage; i++) {
    pages.push(i);
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => props.setPage(1)} />
      <Pagination.Prev disabled={props.page === 1} />

      {pages.map(item => {
        if (item >= props.page - 2 && item < props.page + 2)
          return (
            <Pagination.Item
              active={item === props.page}
              onClick={() => {
                props.setPage(item);
              }}
            >
              {item}
            </Pagination.Item>
          );
      })}

      <Pagination.Next disabled={props.page === props.totalPage} />
      <Pagination.Last onClick={() => props.setPage(props.totalPage)} />
    </Pagination>
  );
}
