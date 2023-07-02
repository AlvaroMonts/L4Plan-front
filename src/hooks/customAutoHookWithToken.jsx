import { useEffect, useState } from "react";
import { BASE_URL } from "../services/config";
import axios from "axios";

function customAutoHookWithToken(url, method, token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  let finalUrl = BASE_URL + url;

  const yourConfig = {
    headers: {
      Authorization: "Bearer " + JSON.parse(token),
    },
  };

  const fetchData = () => {
    setData(null);
    setError(null);
    setLoading(true);
    axios[method](finalUrl, yourConfig)
      .then((res) => setData(res.data))
      .catch((error) => {
        if (error.response) {
          console.log(
            error.message,
            error.response.status,
            error.response.data
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
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [finalUrl]);

  const refetch = () => {
    setRefreshing(true);
    fetchData();
  };

  return { data, loading, error, refetch, refreshing, setData };
}

export default customAutoHookWithToken;
