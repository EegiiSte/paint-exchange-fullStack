require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const express = require("express");

const app = express();

// Used to parse JSON bodies
app.use(express.json());

//Use to enabke CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//\middleware -- logging ---> saving user activity
app.use((req, res, next) => {
  console.log(
    `this user requested ${req.method} metod from this path: "${
      req.path
    }" path on ${new Date().toLocaleString()}`
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World! Egi!");
});

// middleware ---> error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
  next();
});

// app.listen(PORT, () => {
//   console.log(`server listening on port http://localhost:${PORT}`);
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("Connect to MongoDB successfully!"),
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    })
  )
  .catch((error) => console.log(error));
