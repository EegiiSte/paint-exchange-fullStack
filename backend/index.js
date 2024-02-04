require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Used to parse JSON bodies
app.use(express.json());

//Use to enabke CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);

const usersRouter = require("./src/routes/users");
const productsRouter = require("./src/routes/products");
const accountsRouter = require("./src/routes/accounts");

const port = process.env.PORT || 3000;

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

// test
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// middleware ---> error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    console.log("Connect to MongoDB successfully!"),
    app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    })
  )
  .catch((error) => console.log(error));
