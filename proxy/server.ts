/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import url from "url";

dotenv.config();
const BASE_URL: string | undefined = process.env.VITE_BASE_URL;
const PORT: string | number = process.env.VITE_API_PORT || 5000;
const API_KEY: string | undefined = process.env.VITE_TREFLE_API_KEY;
const app = express();

app.get(`/trefle/api/`, (req, res) => {
  // Set headers for cors to allow requests from the react app
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Params after ? http://localhost:5000/trefle/api/?apple
  const params = url.parse(req.url, true).search?.toString().replace("?", "");
  // Axios call with .env variables and params
  axios
    .get(`${BASE_URL}${API_KEY}&q=${params}`)
    .then((response) => res.json(response.data));
});

// Enable Cors
app.use(cors());
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}...`));
