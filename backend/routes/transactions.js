const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

const router = require('express').Router();
const Expense = require('../models/ExpenseModel');
const Income = require('../models/IncomeModel');

//Post All transaction
router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense);

//Get All Transactions with Filtering & Sorting
router.get('/get-transactions', async (req, res) => {
    try {
        const { startDate, endDate, category, sortBy, order } = req.query;
        let filters = {};

        // 🗓️ **Date Range Filter**
        if (startDate && endDate) {
            filters.createdAt = { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate) 
            };
        }

        //Category Filter
        if (category) {
            filters.category = category;
        }

        //Sorting Logic
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        }

        // Fetch incomes and expenses separately
        const incomes = await Income.find(filters).sort(sortOptions);
        const expenses = await Expense.find(filters).sort(sortOptions);

        // Merge transactions with type labels
        const transactions = [
            ...incomes.map(item => ({ ...item.toObject(), type: "income" })),
            ...expenses.map(item => ({ ...item.toObject(), type: "expense" }))
        ];

        //Sort Final Transactions List
        transactions.sort((a, b) => {
            if (sortBy === "amount") {
                return order === "desc" ? b.amount - a.amount : a.amount - b.amount;
            }
            return order === "desc"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt);
        });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error });
    }
});

module.exports = router;
