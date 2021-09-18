const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const items = require("./data/items");
const Expense = require("./models/expenseModel");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Expense.deleteMany();

    await Expense.insertMany(items);

    console.log("Data Imported!".green.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Expense.deleteMany();
    console.log("Data Destroyed!".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
