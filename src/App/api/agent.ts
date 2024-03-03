import axios, { AxiosResponse } from "axios";

// TODO : ADD .ENV VARIABLES FOR DEV PROXY SERVER URL AND DEV .NET BACKEND URL
axios.defaults.baseURL = "https://localhost:5555/";

const trefleAxios = axios.create({
  baseURL: "http://localhost:5000/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
const trefleRequests = {
  get: (url: string) => trefleAxios.get(url).then(responseBody),
};

const Users = {
  list: () => requests.get("api/users"),
  details: (id: number) => requests.get(`api/users/${id}`),
};
const Plants = {
  list: () => requests.get("api/plants"),
  details: (id: number) => requests.get(`api/plants/${id}`),
  createPlant: (plant: object) => requests.post("api/plants", plant),
  editPlant: (id: number, plant: object) =>
    requests.put(`api/plants/${id}`, plant),
  removePlant: (id: number) => requests.delete(`api/plants/${id}`),
};
const Zones = {
  list: () => requests.get("api/zones"),
  details: (id: number) => requests.get(`api/zones/${id}`),
  createZone: (zone: object) => requests.post("api/zones", zone),
  editZone: (id: number, zone: object) => requests.put(`api/zones/${id}`, zone),
  removeZone: (id: number) => requests.delete(`api/zones/${id}`),
};

const Trefle = {
  details: (plant: string) => trefleRequests.get(`trefle/api/?${plant}`),
};

const agent = {
  Users,
  Plants,
  Zones,
  Trefle,
};

export default agent;
