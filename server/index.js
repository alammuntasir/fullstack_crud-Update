const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const Todo = require("./model/todoSchema");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

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

app.post("/addtodo", async (req, res) => {
  let { task } = req.body;
  let todo = new Todo({
    name: task,
  });
  await todo.save();

  return res.status(201).json({
    success: true,
    message: "todo created.. successfully",
    data: todo,
  });
});

// getall task api

app.get("/getalltodo", async (req, res) => {
  try {
    let alltodo = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "todo fetch successfully",
      data: alltodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

// single task api

app.get("/gettask/:name", async (req, res) => {
  try {
    let { name } = req.params;

    let singletask = await Todo.findOne({ age: name });
    return res.status(200).json({
      success: true,
      message: "single task fetch succesfully",
      data: singletask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

// todo update api
app.patch("/edittask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { age } = req.body;

    let edittask = await Todo.findOneAndUpdate(
      { _id: id },
      { age: age },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "updated successfull", data: edittask });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

// deleted task api

app.delete("/deletetask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletetask = await Todo.findOneAndDelete({ _id: id }, { new: true });

    return res
      .status(200)
      .json({
        success: true,
        message: "deleted successfully",
        data: deletetask,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});
