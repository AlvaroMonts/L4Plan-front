import axios from "axios";
import { useState } from "react";
import { API_KEY } from "../services/config";

export const hooksGoogleMapSites = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSiteDetailsById = (placeId) => {
    setIsLoading(true);
    setData(null);
    setError(null);

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=es&key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        //console.log("Datos del lugar:", placeData);
        setData(response.data.result);
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            error.response.status,
            error.response.data,
            error.message
          );
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    data,
    isLoading,
    error,
    getSiteDetailsById,
  };
};
