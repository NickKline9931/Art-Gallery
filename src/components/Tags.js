import React from "react";
import "./../styles/Tags.css";

export default function Tags({
  terms,
  enterSearch,
  setQuery,
  setCurrentSearchTerm,
}) {
  function searchWithTag(tag) {
    setQuery(tag);
    setCurrentSearchTerm(tag);
    enterSearch();
  }
  const tags = terms.map((tag, index) => {
    return (
      <button className="tags" onClick={() => searchWithTag(tag)} key={index}>
        <h3>{tag}</h3>
      </button>
    );
  });
  return <div className="tagContainer">{tags}</div>;
}
