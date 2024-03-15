import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import "./NavBar.css";
import { NavBar } from "./NavBar";
import { DigitalClock } from "./DigitalClock";
import Switch from "react-switch";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import { useGetBudgets } from "../../hooks/useGetBudgets";
import { BudgetForm } from "../budgets/BudgetForm";
import { BudgetList } from "../budgets/BudgetList";
import { Scanner } from "../scanner/scanner";
import { auth, db } from "../../config/firebase-config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { FaMoon, FaSun } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { ProgressBar } from "../budgets/ProgressBar";
import { Chatbot } from "../scanner/Chatbot";
import { isBudgetSetWithinFirstSevenDays } from "../budgets/BudgetList";
import { BudgetCount } from "../budgets/BudgetList";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";

function convertToCSV(data) {
    if (!data || !data.length) {
        return '';
    }

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
        const values = headers.map(header => {
            const cellValue = row[header] ?? '';
            const escaped = String(cellValue).replace(/"/g, '\\"');
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
    const { transactions } = useGetTransactions();
    const { userName, profilePicture, userID } = useGetUserInfo();
    const budgets = useGetBudgets(userID);
    const [selectedBudgetID, setSelectedBudgetID] = useState("");
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");
    const expenseCategories = ['Food', 'Clothing', 'Entertainment', 'Home', 'Utilities', 'Other'];
    const [expenseCategory, setExpenseCategory] = useState(expenseCategories[0]);
    const transactionsRef = useRef(null);
    const savingsRef = useRef(null);
    const receiptsRef = useRef(null);
    const achievementsRef = useRef(null);

    let updatedBalance = 0;
    let updatedIncome = 0;
    let updatedExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.transactionType === 'income' && !transaction.excludeFromBalance) {
            updatedIncome += parseFloat(transaction.transactionAmount);
            updatedBalance += parseFloat(transaction.transactionAmount);
        } else if (transaction.transactionType === 'expense') {
            updatedExpenses += parseFloat(transaction.transactionAmount);
            updatedBalance -= parseFloat(transaction.transactionAmount);
        }
    });

    useEffect(() => {
        const achievementDocRef = doc(db, "achievements", userID);

        getDoc(achievementDocRef).then((docSnap) => {
            if (docSnap.exists()) {
                const achievementData = docSnap.data();
                
                if (transactions.length >= 10 && !achievementData.transactionCount) {
                    toast.success('Achievement Unlocked: Submitted 10 Transactions!');
                    updateDoc(achievementDocRef, { transactionCount: true });
                }

                if (budgets.length > 0 && !achievementData.budgetSet) {
                    toast.success('Achievement Unlocked: Set a Budget!');
                    updateDoc(achievementDocRef, { budgetSet: true });
                }
            } else {
                setDoc(achievementDocRef, { transactionCount: false, budgetSet: false });
            }
        });
    }, [transactions, budgets, userID]);

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
        setTransactionAmount(0);
        setTransactionType("expense");
        setExpenseCategory(expenseCategories[0]);
        setSelectedBudgetID("");
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

    const handleTransactionsClick = () => transactionsRef.current.scrollIntoView({ behavior: 'smooth' });
    const handleSavingsClick = () => savingsRef.current.scrollIntoView({ behavior: 'smooth' });
    const handleReceiptsClick = () => receiptsRef.current.scrollIntoView({ behavior: 'smooth' });
    const handleAchievementsClick = () => achievementsRef.current.scrollIntoView({ behavior: 'smooth' });

    return (
        <>
        <div className="nav-bar">
            <NavBar
                onTransactionsClick={handleTransactionsClick}
                onSavingsClick={handleSavingsClick}
                onReceiptsClick={handleReceiptsClick}
                onAchievementsClick={handleAchievementsClick}
            />
            <div className="theme-switch-wrapper">
                <label htmlFor="theme-switch" className="theme-switch">
                    {theme === 'light' ? <FaSun color="#f39c12" size="1.5em" /> : <FaMoon color="white" size="1.5em" />}
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
            <ToastContainer />
            <div className="container">
                <DigitalClock />
                {profilePicture && <div className="profile"> <img className="profile-picture" src={profilePicture} alt="" /> <button className="sign-out-btn" onClick={signUserOut}> Sign Out</button></div>}
                <h1> {userName}'s Spendy Tracker</h1>
                <div className="balance">
                    <div className="balance-header">
                    <h3> Your Balance:</h3></div>
                    {updatedBalance >= 0 ? (<h2><u>${updatedBalance}</u><h4>You are doing great! Keep it up!</h4></h2>) : (<h2> -${Math.abs(updatedBalance)} <h4>You are spending more than you are saving!</h4></h2>)}
                </div>
                <div className="Summary">
                    <div className="Income">
                        <h4><u>Income</u></h4>
                        <h3>${updatedIncome}</h3>
                    </div>
                    <div className="Expenses">
                        <h4><u>Expenses</u></h4>
                        <h3>${updatedExpenses}</h3>
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
        <div ref={transactionsRef} className="transactions">
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
        <div ref={savingsRef} className="budget-section">
        <h2>Manage Your Savings</h2>
                    <BudgetForm userID={userID} />
                    <BudgetList userID={userID} />
                </div>
                <div ref={receiptsRef} className="scanner-section">
            <h2>Upload Receipts</h2>
            <Scanner userID={userID} />
        </div>
        <div ref={achievementsRef} className="achievement-section">
                        <h2>Achievements</h2>
                        <div>
                            <p>Submit 10 Transactions</p>
                            <ProgressBar currentAmount={transactions.length} targetAmount={10} />
                        </div>
                        <div>
                            <p>Set a Budget the first 7 days of the month</p>
                            <ProgressBar currentAmount={isBudgetSetWithinFirstSevenDays(budgets) ? 1 : 0} targetAmount={1} />
                        </div>
                        <div>
                            <p>Set a Savings Goal</p>
                            <ProgressBar currentAmount={budgets.length ? 1 : 0} targetAmount={1} />
                        </div>
                        <div>
                            <p>Set 5 Goals</p>
                            <ProgressBar currentAmount={budgets.length} targetAmount={4} />
                        </div>
                        <div>
                            <p>Set 10 Goals</p>
                            <ProgressBar currentAmount={budgets.length} targetAmount={10} />
                        </div>
                        <div>
                            <p>Complete a Goal</p>
                            <ProgressBar currentAmount={BudgetCount.length} targetAmount={1} />                        
                            </div>
                            <div>
                            <p>Complete 5 Goals</p>
                            <ProgressBar currentAmount={BudgetCount.length} targetAmount={5} />                        
                            </div>

        <div className="completed-section">
                        <h2>Completed</h2>
                        {transactions.length >= 10 && 
                    <div>
                        <p>Submit 10 Transactions</p>
                        <ProgressBar currentAmount={10} targetAmount={10} />
                    </div>
                }
                    {budgets.length > 0 && 
                    <div>
                        <p>Set a Savings Goal</p>
                        <ProgressBar currentAmount={1} targetAmount={1} />
                    </div>
                }
                {isBudgetSetWithinFirstSevenDays(budgets) && 
                    <div>
                        <p>Set a Budget the first 7 days of the month</p>
                        <ProgressBar currentAmount={1} targetAmount={1} />
                    </div>
                }
                {budgets.length >= 10 && 
                <div>
                <p>Set 10 Goals</p>
                <ProgressBar currentAmount={10} targetAmount={10} />
                </div>
                }
                {BudgetCount({ budgets }) >= 1 && 
                <div>
                    <p>Complete a Goal</p>
                    <ProgressBar currentAmount={1} targetAmount={1} />
                </div>
                }
                {BudgetCount({ budgets }) >= 5 && 
                    <div>
                    <p>Complete 5 Goals</p>
                    <ProgressBar currentAmount={5} targetAmount={5} />
                    </div>
                }
                </div>
                    </div>
                    <div className="chat-bot">
                        <Chatbot />
                    </div>
        </div>
        </>
    );
};