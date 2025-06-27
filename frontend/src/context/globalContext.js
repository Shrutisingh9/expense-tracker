import React, {useState,useContext, useEffect} from "react"
import axios from 'axios'

const BASE_URL ="http://localhost:5001/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) =>{

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //Add new Incone
    const addIncome = async (income) => {
        try {
            const validIncome = {
                title: income.title || "Untitled",
                amount: Number(income.amount) || 0, // Ensure it's a number
                type: "income",
                date: income.date || new Date().toISOString().split("T")[0], // Ensure date is present
                category: income.category || "Other",
                description: income.description || "No description"
            };
    
            console.log("Sending income data:", validIncome);  // 🔍 Debugging log
    
            await axios.post(`${BASE_URL}add-income`, validIncome);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Error adding income");
            console.error("Error adding income:", err);
        }
    };
    

    //Fetch Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            console.log("Fetched incomes:", response.data);  // 🔍 Debugging log
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching incomes");
            console.error("Error fetching incomes:", err);
        }
    };

    // Delete an income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Error deleting income");
            console.error("Error deleting income:", err);
        }
    };

    // Calculate total income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Add new expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Error adding expense");
            console.error("Error adding expense:", err);
        }
    };

    //Fetch Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching expenses");
            console.error("Error fetching expenses:", err);
        }
    };

    //Delete an Expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Error deleting expense");
            console.error("Error deleting expense:", err);
        }
    };

    // Calculate total expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Calculate total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Get the last 3 transactions
    const transactionHistory = () => {
        const history = [...incomes, ...expenses].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return history.slice(0, 3);
    };

    // Fetch data on first render
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext =() =>{
    return useContext(GlobalContext)
}