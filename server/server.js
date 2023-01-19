require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const ClothesModel = require("./db/clothes.model");
const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use("/api/clothes/:id", async (req, res, next) => {
  let clothes = null;

  try {
    clothes = await ClothesModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!clothes) {
    return res.status(404).end("Clothes");
  }

  req.clothes = clothes;
  next();
});

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
    employee.haine = employee.clothes.map(async (id) => {
      const out = await ClothesModel.findOne({ _id: id });
      console.log(out);
      return { type: out.type, name: out.name, price: out.price };
    });
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});
app.use("/api/missing/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});
app.get("/api/missing/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/clothes/", async (req, res) => {
  const clothes = await ClothesModel.find();
  return res.json(clothes);
});
app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});
app.get("/api/missing/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});
app.post("/api/clothes/", async (req, res, next) => {
  const clothes = req.body;

  try {
    const saved = await ClothesModel.create(clothes);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});
app.delete("/api/clothes/:id", async (req, res, next) => {
  try {
    const deleted = await req.clothes.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});
app.delete("/api/missing/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};
app.get("/api/clothes/:id", (req, res) => {
  return res.json(req.clothes);
});

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
