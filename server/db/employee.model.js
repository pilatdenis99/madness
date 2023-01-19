// https://mongoosejs.com/
const mongoose = require("mongoose");
const Clothes = require("./clothes.model");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: { type: Boolean, default: false },
  created: {
    type: Date,
    default: Date.now,
  },
  clothes: [{ type: Schema.Types.ObjectId, ref: "Clothes" }],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
