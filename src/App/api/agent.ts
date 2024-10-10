import axios, { AxiosError, AxiosResponse } from "axios";
// import { axiosErrorHandler } from "./axiosErrorHandler";

// const errorHandler = () => {
//   axiosErrorHandler<AxiosError | Error>((res) => {
//     if (res.type === "axios-error") {
//       //type is available here
//       const axiosError = res.error;
//       console.debug("Axios Error: ", axiosError);
//     } else {
//       const stockError = res.error;
//       console.debug("Stock Error: ", stockError);
//     }
//   });
// };

const errorHandler = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(
      `Error: Unable to ${error.config?.method} ${error.config?.url}`
    );
    console.log("Request Error: ", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error Message: ", error.message);
  }
  console.log(error.config);
};

axios.defaults.baseURL = `${import.meta.env.VITE_DEV_SECURE_URL}:${
  import.meta.env.VITE_BACKEND_API_DEV_PORT
}/`;

// ! Trefle Code
/*
const trefleAxios = axios.create({
  baseURL: `${import.meta.env.VITE_DEV_URL}:${
    import.meta.env.VITE_PROXY_SERVER_PORT
  }/`,
});
*/

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
  post: (url: string, body: object) =>
    axios
      .post(url, body)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
  put: (url: string, body: object) =>
    axios
      .put(url, body)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
  delete: (url: string) =>
    axios
      .delete(url)
      .then(responseBody)
      .catch((error) => errorHandler(error)),
};

// ! Trefle Code
/*
const trefleRequests = {
  get: (url: string) =>
    trefleAxios
      .get(url)
      .then(responseBody)
      .catch(() => errorHandler()),
};
*/

const Users = {
  list: () => requests.get("api/users"),
  details: (id: number) => requests.get(`api/users/${id}`),
};
const Plants = {
  list: () => requests.get("api/plants"),
  details: (id: number) => requests.get(`api/plants/${id}`),
  createPlant: (plant: object) => requests.post("api/plants", plant),
  copyPlantsToNewZone: (
    oldZoneId: number,
    newZoneId: number,
    seasonId: number
  ) =>
    requests.post(
      `api/plants/copyplantstonewzone/${oldZoneId}/${newZoneId}/${seasonId}`,
      {}
    ),
  editPlant: (id: number, plant: object) =>
    requests.put(`api/plants/${id}`, plant),
  removePlant: (id: number) => requests.delete(`api/plants/${id}`),
  removePlantsFromZone: (zoneId: number, seasonId: number) =>
    requests.delete(`api/plants/deleteplantsfromzone/${zoneId}/${seasonId}`),
};
const Zones = {
  list: () => requests.get("api/zones"),
  details: (id: number) => requests.get(`api/zones/${id}`),
  createZone: (zone: object) => requests.post("api/zones", zone),
  editZone: (id: number, currentSeasonId: number | undefined, zone: object) =>
    requests.put(`api/zones/${id}/seasonId/${currentSeasonId}`, zone),
  removeZone: (id: number) => requests.delete(`api/zones/${id}`),
};
const Seasons = {
  list: () => requests.get("api/seasons"),
  details: (id: number) => requests.get(`api/seasons/${id}`),
  createZone: (season: object) => requests.post("api/seasons", season),
  editZone: (id: number, season: object) =>
    requests.put(`api/seasons/${id}`, season),
  removeZone: (id: number) => requests.delete(`api/seasons/${id}`),
};

// ! Trefle Code
/*
const Trefle = {
  details: (plant: string) => trefleRequests.get(`trefle/api/?${plant}`),
};
*/

const agent = {
  Users,
  Plants,
  Zones,
  Seasons,
  // ! Trefle Code
  // Trefle,
};

export default agent;
