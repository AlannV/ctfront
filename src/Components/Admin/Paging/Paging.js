import React from "react";
import "./Paging.css";

export default function Paging({ itemsPerPage, allItems, paging }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <div className="page-numbers-container">
        {pageNumbers?.map((number) => {
          return (
            <button
              className="page-numbers"
              onClick={() => paging(number)}
              key={number}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
}
