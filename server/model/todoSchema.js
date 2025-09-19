const { default: mongoose } = require("mongoose");
let { Schema } = mongoose;

let todoSchema = new Schema({
  name: {
    type: String,

    require:true,
  },

  age:{
    type: Number
  }
});

module.exports = mongoose.model("Todolist", todoSchema);

// todolists
