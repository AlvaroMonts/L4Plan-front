import { useState } from "react";
import { BASE_URL } from "../services/config";
import axios from "axios";

export const hooksPlan = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [changedSites, setChangedSites] = useState(false);

  const create = (token, name, description, userId) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    let finalUrl = BASE_URL + "/plan";

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios
      .post(finalUrl, { name, description, userId }, yourConfig)
      .then((res) => {
        console.log(
          res.status,
          "Created successfully the plan with id",
          res.data
        );
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data);
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const deletePlan = (token, id) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    let finalUrl = BASE_URL + "/plan/" + id;

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios
      .delete(finalUrl, yourConfig)
      .then((res) => {
        console.log(res.status, "Deleted successfully the plan");
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data);
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const updatePlan = (token, id, name, description, userId) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    let finalUrl = BASE_URL + "/plan/" + id;

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios
      .put(finalUrl, { id, name, description, userId }, yourConfig)
      .then((res) => {
        console.log(res.status, "Updated plan successfully with id", id);
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data);
          setError(error.response.data);
        } else if (error.request) {
          console.log(error.request);
          setError(error.request);
        } else {
          console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const addSiteGoogle = (token, planId, placeId, placeName) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    let finalUrl = BASE_URL + "/plan-sites-google/plan";

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    };

    axios
      .post(finalUrl, { planId, placeId, placeName }, yourConfig)
      .then((res) => {
        console.log(
          res.status,
          "Added place",
          placeName,
          "with id",
          placeId,
          "to plan",
          planId,
          "Created relation with id",
          res.data
        );
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            error.response,
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
      .finally(() => setIsLoading(false));
  };

  const removeSiteGoogle = (token, planId, position) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    let finalUrl = BASE_URL + "/plan-sites-google/plan/" + planId;

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
      data: { position },
    };

    axios
      .delete(finalUrl, yourConfig)
      .then((res) => {
        console.log(
          res.status,
          "Removed place in position",
          position,
          "from plan",
          planId
        );
        setChangedSites(true);
        setData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            error.response.status,
            error.message,
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
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    isLoading,
    error,
    changedSites,
    setChangedSites,
    create,
    deletePlan,
    updatePlan,
    addSiteGoogle,
    removeSiteGoogle,
  };
};
