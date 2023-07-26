const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

const postRoutes = require("./routes/blogRoutes");

app.use(express.json());

mongoose
  .connect(process.env.MOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.log("Failed to connect to the database", err);
  });

app.use("/blog", postRoutes);

app.listen(process.env.APP_PORT, function () {
  console.log(`Server is listening on http:localhost:${process.env.APP_PORT}`);
});
