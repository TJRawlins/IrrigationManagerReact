/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const PORT = process.env.VITE_API_PORT || 5000;
const app = express();

app.get("/trefle/api", (req, res) => {
  console.log(req);
  axios
    .get(
      `***REMOVED***${process.env.VITE_TREFLE_API_KEY}&q=peach`
    )
    .then((response) => res.json(response.data));
});

// app.get("/api", (req, res) => {
//     console.log(req)
//     res.json({success: true})
// });

// Enable Cors
app.use(cors());
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}...`));
