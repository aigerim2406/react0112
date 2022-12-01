import React, { useReducer } from "react";

import userContext from "./userContext";
import userReducer from "./userReducer";

export default function UserState(props) {
  const initialState = {
    characters: "",
    selectedGif: "",
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Star wars api URL
  const SW_url = "https://swapi.dev/api/people/";

  //API Key y URL de la API de GIPHY
  const API_key = "UYB6O0WZSE4yARnLNytEMTHyeOOmliVd";
  const GIPHY_url = "https://api.giphy.com/v1/gifs/search";

  async function callStarWarsApi(page, search = "") {
    const auxNull = null;

    try {
      dispatch({
        type: "CALL_SW_API",
        payload: auxNull,
      });

      const res = await fetch(`${SW_url}?page=${page}&search=${search}`);
      const resJSON = await res.json();

      dispatch({
        type: "CALL_SW_API",
        payload: resJSON,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function callGifAPI(parameter) {
    const varAux = null;

    try {
      dispatch({
        type: "CALL_GIF_API",
        payload: varAux,
      });

      const res = await fetch(`${GIPHY_url}?q=${parameter}&api_key=${API_key}`);
      const resJSON = await res.json();

      const result = resJSON.data[0];
      dispatch({
        type: "CALL_GIF_API",
        payload: result,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <userContext.Provider
      value={{
        characters: state.characters,
        selectedGif: state.selectedGif,
        callStarWarsApi,
        callGifAPI,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}
