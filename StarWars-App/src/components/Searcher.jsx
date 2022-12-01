import React, { useContext, useState, useRef } from "react";
import { useEffect } from "react";
import userContext from "../context/User/userContext";

export default function Searcher() {
  const { callStarWarsApi } = useContext(userContext);

  const inputSearch = useRef(null);
  const [SearchedCharacter, setSearchedCharacter] = useState("");

  useEffect(() => {
    callStarWarsApi(1, SearchedCharacter);

  }, [SearchedCharacter]);

  function handleChange(e) {
    setSearchedCharacter(e.target.value);
  }

  return (
    <div className="m-auto mt-10 w-[20rem] text-center">
      <input
        type="text"
        placeholder="search a character"
        className="mt-5 w-[100%] rounded p-1"
        onChange={handleChange}
        ref={inputSearch}
      />
    </div>
  );
}
