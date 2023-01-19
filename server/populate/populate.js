/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const ClothesModel = require("../db/clothes.model");
const clothes = require("./clothes.json");
const price = require("./price.json");
const type = require("./type.json");
const employeeModel = require("../db/employee.model");
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  await ClothesModel.deleteMany({});
  const clothing = clothes.map((clothes) => ({
    name: clothes,
    type: pick(type),
    price: pick(price),
  }));
  await ClothesModel.create(...clothing);
  const haine = await ClothesModel.find();
  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    clothes: [
      pick(
        haine.map((h) => 
          h._id
       )
      ),
    ],
  }));

  await EmployeeModel.create(...employees);

  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
