import React from "react";
import "./../styles/Tags.css";

export default function Tags({ terms, enterSearch, setQuery }) {
  function searchWithTag(tag) {
    setQuery(tag);
    enterSearch();
  }
  const tags = terms.map((tag, index) => {
    return (
      <button className="tags" onClick={() => searchWithTag(tag)}>
        <h3>{tag}</h3>
      </button>
    );
  });
  return <div className="tagContainer">{tags}</div>;
}
