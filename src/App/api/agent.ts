import axios, { AxiosResponse } from "axios";
// import { Zone } from "../models/Zone";

axios.defaults.baseURL = "https://localhost:5555/api/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Users = {
  list: () => requests.get("users"),
  details: (id: number) => requests.get(`users/${id}`),
};
const Plants = {
  list: () => requests.get("plants"),
  details: (id: number) => requests.get(`plants/${id}`),
};
const Zones = {
  list: () => requests.get("zones"),
  details: (id: number) => requests.get(`zones/${id}`),
  createZone: (zone: object) => requests.post("zones", zone),
  removeZone: (id: number) => requests.delete(`zones/${id}`),
};

const agent = {
  Users,
  Plants,
  Zones,
};

export default agent;
