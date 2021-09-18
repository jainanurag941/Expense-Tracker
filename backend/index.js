const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const Expense = require("./models/expenseModel");
const asyncHandler = require("express-async-handler");

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get(
  "/items",
  asyncHandler(async (req, res) => {
    const items = await Expense.find({});
    res.json(items);
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in port ${PORT}`.yellow.bold));
