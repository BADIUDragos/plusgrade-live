const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs-extra");
const cors = require("cors");
const reservationsRouter = require("./routes/reservationsRouter");

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", reservationsRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
