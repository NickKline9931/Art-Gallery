import React from "react";

export default function Tags({ terms, enterSearch, setQuery }) {
  function searchWithTag(tag) {
    setQuery(tag);
    enterSearch();
  }
  const tags = terms.map((tag, index) => {
    return (
      <li key={index} onClick={() => searchWithTag(tag)}>
        <h5>{tag}</h5>
      </li>
    );
  });
  return (
    <div>
      <ul>{tags}</ul>
    </div>
  );
}
