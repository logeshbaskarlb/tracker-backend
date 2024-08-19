const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async (req, res)=> {
    const { title, amount, category, description, date  } = req.body;

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        if( !title || !category || !description || !date ) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        if( amount <= 0 || !amount === 'number' ) {
            return res.status(400).json({ message: "Please enter a valid amount" })
        }
        await income.save();
        res.status(201).json({ message: "Expense added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error adding expense" })
    }
    console.log(income);
}

exports.getExpense = async (req, res) => {
    try {
        const income = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income)=> {
            if(!income) {
                return res.status(404).json({ message: "Expense not found" })
                }
                res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err)=> {
            res.status(500).json({ message: "Error deleting expense" })
        })
}