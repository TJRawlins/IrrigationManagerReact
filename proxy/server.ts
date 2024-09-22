/* eslint-disable @typescript-eslint/no-explicit-any */
// ! TREFLE CODE
/*
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import url from "url";

dotenv.config();
const DEV_SECURE_URL: string | undefined = process.env.VITE_DEV_SECURE_URL;
const REACT_DEV_PORT: string | undefined = process.env.VITE_REACT_DEV_PORT;
const PROXY_SERVER_PORT: string | number =
  process.env.VITE_PROXY_SERVER_PORT || 5000;
const TREFLE_API_URL: string | undefined = process.env.VITE_TREFLE_API_URL;
const API_KEY: string | undefined = process.env.VITE_TREFLE_API_KEY;
const app = express();

app.get(`/trefle/api/`, (req, res) => {
  // Set headers for cors to allow requests from the react app
  res.header(
    "Access-Control-Allow-Origin",
    `${DEV_SECURE_URL}:${REACT_DEV_PORT}`
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Params after ? http://localhost:5000/trefle/api/?apple
  const params = url.parse(req.url, true).search?.toString().replace("?", "");
  // Axios call with .env variables and params
  axios
    .get(`${TREFLE_API_URL}${API_KEY}&q=${params}`)
    .then((response) => res.json(response.data));
});

// Enable Cors
app.use(cors());
app.listen(PROXY_SERVER_PORT, () =>
  console.log(`Proxy server running on port ${PROXY_SERVER_PORT}...`)
);
*/
