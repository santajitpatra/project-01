const express = require("express");
const { connectMOngoDB } = require("./connection");

const { logReqRes } = require("./middlewares")

const userRouter = require("./routes/user.js");

const app = express();
const port = 8000;

//Connect to mongoDB server
connectMOngoDB("mongodb://127.0.0.1:27017/node_data").then(() => {
  console.log("mongodb connected");
});

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(port, () => { console.log(`Example app listening on port ${port}`)});
