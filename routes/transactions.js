const { addIncome, getIncomes, deleteIncome } = require("../controller/income");
const { addExpense, getExpense, deleteExpense } = require("../controller/expense");

const express = require("express");
const router = express.Router();

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpense)
      .delete('/delete-expense/:id', deleteExpense);


module.exports = router;