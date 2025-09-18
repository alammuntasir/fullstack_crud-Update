const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

// database conntection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message || err);
  });

//   route define

app.post("/addtodo", (req, res) => {
  return res
    .status(201)
    .json({ success: true, message: "todo created successfully" });
});

app.get("/gettodo", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "todo fetch successfully" });
}); 

app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});
