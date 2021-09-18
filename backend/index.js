const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const Expense = require("./models/expenseModel");
const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");

dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/add", async (req, res) => {
  const { title, amount, date } = req.body;

  const newExpense = new Expense({
    title,
    amount,
    date: new Date(date),
  });

  await newExpense.save();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in port ${PORT}`.yellow.bold));
