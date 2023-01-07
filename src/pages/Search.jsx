import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";

const GET_CHARACTER_LOCATION = gql`
  query GetCharacterLocation($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          dimension
        }
      }
    }
  }
`;

function Search() {
  const [query, setQuery] = useState("");

  const [getLocations, { error, loading, data, called }] = useLazyQuery(
    GET_CHARACTER_LOCATION,
    {
      variables: query,
    }
  );

  console.log({ error, loading, data, called });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the name..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => getLocations()}>Search</button>
      {loading && <h2>Loading...</h2>}
      {error && <h2>Something went wrong</h2>}
      {data?.characters.results.map((data, index) => {
        return (
          <>
            <li key={index}>{data.location.dimension}</li>
          </>
        );
      })}
    </div>
  );
}

export default Search;
