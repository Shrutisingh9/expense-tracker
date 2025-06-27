const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return value > 0; // Ensures amount is positive
                },
                message: "Amount must be a positive number",
            },
        },
        type: {
            type: String,
            default: "income",
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            maxLength: 100, // Increased to allow more meaningful descriptions
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Income', IncomeSchema);
