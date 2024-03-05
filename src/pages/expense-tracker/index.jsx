import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import "./NavBar.css";
import { NavBar } from "./NavBar"
import Switch from "react-switch";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { useGetBudgets } from "../../hooks/useGetBudgets";
import { BudgetForm } from "../budgets/BudgetForm";
import { BudgetList } from "../budgets/BudgetList";
import { Scanner } from "../scanner/scanner";
import { auth } from "../../config/firebase-config";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { FaMoon, FaSun } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { ProgressBar } from "../budgets/ProgressBar";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";

function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
        const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
    }
        return csvRows.join('\n');
}

function downloadCSV(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transactions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { deleteTransaction } = useDeleteTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const { userName, profilePicture, userID } = useGetUserInfo();
    const budgets = useGetBudgets(userID);
    const [selectedBudgetID, setSelectedBudgetID] = useState("");
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");
    const expenseCategories = ['Food', 'Clothing', 'Entertainment', 'Home', 'Utilities', 'Other'];
    const [expenseCategory, setExpenseCategory] = useState(expenseCategories[0]);
    const [budgetAchievementCompleted, setBudgetAchievementCompleted] = useState(false);

    useEffect(() => {
        if (transactions.length >= 10) {
            toast.success('Achievement Unlocked: Submitted 10 Transactions!');
        }

        if (budgets.length > 0 && !budgetAchievementCompleted) {
            toast.success('Achievement Unlocked: Set a Budget!');
            setBudgetAchievementCompleted(true);
        }
    }, [transactions, budgets, budgetAchievementCompleted]);

    const handleThemeChange = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    // Colors for income and categories
    const categoryColors = {
        'Income': 'rgba(75, 192, 192, 0.2)',
        'Food': 'rgba(255, 99, 132, 0.2)',
        'Clothing': 'rgba(54, 162, 235, 0.2)',
        'Entertainment': 'rgba(255, 206, 86, 0.2)',
        'Home': 'rgba(153, 102, 255, 0.2)',
        'Utilities': 'rgba(255, 159, 64, 0.2)',
        'Other': 'rgba(201, 203, 207, 0.2)'
};


    // Initialized income
    const aggregatedData = {
        'Income': 0,
};

    // Aggregate income and expenses
    transactions.forEach(transaction => {
    const category = transaction.transactionType === 'income' ? 'Income' : transaction.category;
        if (!aggregatedData[category]) {
            aggregatedData[category] = 0;
        }
            aggregatedData[category] += parseFloat(transaction.transactionAmount);
});


    const chartData = {
        labels: Object.keys(aggregatedData),
        datasets: [{
            label: 'Transactions Overview',
            data: Object.values(aggregatedData),
            backgroundColor: Object.keys(aggregatedData).map(category => categoryColors[category] || 'rgba(128, 128, 128, 0.2)'),
            borderColor: Object.keys(aggregatedData).map(category => categoryColors[category].replace('0.2', '1')),
            borderWidth: 1,
            hoverOffset: 20
    }]
};

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const { balance, income, expenses } = transactionTotals;

    const onSubmit = async (e) => {
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount: parseFloat(transactionAmount),
            transactionType,
            category: transactionType === "expense" ? expenseCategory : "",
            budgetID: selectedBudgetID
        });
        setDescription("");
        setTransactionAmount("");
        setSelectedBudgetID(null);
        toast.success("Transaction Added Successfully");
    };

    const signUserOut = async () => {
        try {
        await signOut(auth);
        localStorage.clear();
        navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <div className="nav-bar">
            <NavBar />
            <div className="theme-switch-wrapper">
                <label htmlFor="theme-switch" className="theme-switch">
                    {theme === 'light' ? <FaSun color="#f39c12" size="1.5em" /> : <FaMoon color="#f39c12" size="1.5em" />}
                </label>
            <Switch
                checked={theme === 'dark'}
                onChange={handleThemeChange}
                offColor="#f39c12"
                onColor="#353535"
                className="theme-toggle-slider"
                id="theme-switch"
            />
            </div>
        </div>
        <div className={`expense-tracker-container ${theme}`}>
        <div className="expense-tracker">
            <body><script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
            <script src="https://mediafiles.botpress.cloud/60455ef1-33d9-4a61-b615-2cd02ecc452b/webchat/config.js" defer></script></body>
            <ToastContainer />
            <div className="container">
                {profilePicture && <div className="profile"> <img className="profile-picture" src={profilePicture} alt="" /> <button className="sign-out-btn" onClick={signUserOut}> Sign Out</button></div>}
                <h1> {userName}'s Spendy Tracker</h1>
                <div className="balance">
                    <div className="balance-header">
                    <h3> Your Balance:</h3></div>
                    {balance >= 0 ? <h2><u>${balance}</u><h4>You are doing great! Keep it up!</h4></h2> : <h2> -${balance * -1} <h4>You are spending more than you are saving!</h4></h2>}
                </div>
                <div className="Summary">
                    <div className="Income">
                        <h4><u>Income</u></h4>
                        <h3>${income}</h3>
                    </div>
                    <div className="Expenses">
                        <h4><u>Expenses</u></h4>
                        <h3>${expenses}</h3>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Add Transaction Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder="Amount" value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)}/>
                    <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="expense"> Expense</label>
                    {transactionType === 'expense' && (
                        <select value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
                            {expenseCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                        </select>
                    )}

                    <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="income"> Income</label>
                    {transactionType === 'income' && (
                        <select
                            value={selectedBudgetID}
                            onChange={(e) => setSelectedBudgetID(e.target.value)}
                        >
                            <option value="">None</option>
                            {budgets.map((budget) => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button type="submit"> Add Transaction</button>
                </form>
                <button onClick={() => downloadCSV(convertToCSV(transactions))} className="download-csv-button">Download Transactions as CSV</button>
            </div>
            {/*{profilePicture && <div className="profile"> <img className="profile-picture" src={profilePicture} alt="" /> <button className="sign-out-btn" onClick={signUserOut}> Sign Out</button></div>}*/}
        </div>
        <div className="transactions">
        <h2> Transactions</h2>
        <ul>
            {transactions.map((transaction) => {
                const { id, description, transactionAmount, transactionType, category } = transaction;
                return ( <li key={id} className="transaction-item"> <h4> {description} </h4><p> ${transactionAmount} × <label style={{color: transactionType === "expense" ? "#FF6384" : "#36A2EB"}}> 
                {transactionType} </label></p><p style={{ fontSize: 'smaller', fontStyle: 'italic' }}> {category}</p>
                <IconButton onClick={() => deleteTransaction(id)} aria-label="delete" style={{ color: 'red'}}><DeleteIcon /></IconButton></li>
                );
            })}
        </ul>
        <div className="donut-graph-section">
            <Doughnut data={chartData} />
        </div>
        </div>
        <div className="budget-section">
                    <h2>Manage Your Budgets</h2>
                    <BudgetForm userID={userID} />
                    <BudgetList userID={userID} />
                </div>
                <div className="scanner-section">
            <h2>Upload Receipts</h2>
            <Scanner userID={userID} />
        </div>
        <div className="achievement-section">
                        <h2>Achievements</h2>
                        <div>
                            <p>Submit 10 Transactions</p>
                            <ProgressBar currentAmount={transactions.length} targetAmount={10} />
                        </div>
                        <div>
                            <p>Set a Budget</p>
                            <ProgressBar currentAmount={budgets.length ? 1 : 0} targetAmount={1} />
                        </div>
                    </div>
        </div>
        </>
    );
};