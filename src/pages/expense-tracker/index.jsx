import React, { useState } from "react";
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
import { auth } from "../../config/firebase-config";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";


export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { deleteTransaction } = useDeleteTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const { userName, profilePicture, userID } = useGetUserInfo();
    const budgets = useGetBudgets(userID);
    const [selectedBudgetID, setSelectedBudgetID] = useState("");
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");

    const handleThemeChange = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const data = {
  labels: ['Income', 'Expenses'],
  datasets: [
    {
      label: 'Transaction Overview',
      data: [transactionTotals.income, transactionTotals.expenses],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
      hoverOffset: 20
    }
  ]
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
            <Switch
                    checked={theme === "dark"}
                    onChange={handleThemeChange}
                    offColor="#F5F5F5"
                    onColor="#2B2B2B"
                    className="theme-toggle-slider"
                    />
                    </div>
        <div className={`expense-tracker-container ${theme}`}>
        <div className="expense-tracker">
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
            </div>
            {/*{profilePicture && <div className="profile"> <img className="profile-picture" src={profilePicture} alt="" /> <button className="sign-out-btn" onClick={signUserOut}> Sign Out</button></div>}*/}
        </div>
        <div className="transactions">
        <h2> Transactions</h2>
        <ul>
            {transactions.map((transaction) => {
                const { id, description, transactionAmount, transactionType } = transaction;
                return <li key={id}> <h4> {description} </h4><p> ${transactionAmount} × <label style={{color: transactionType === "expense" ? "#FF6384" : "#36A2EB"}}> 
                {transactionType} </label></p><IconButton onClick={() => deleteTransaction(id)} aria-label="delete" style={{ color: 'red'}}><DeleteIcon /></IconButton></li>
            
            })}
        </ul>
        <div className="donut-graph-section">
            <Doughnut data={data} />
        </div>
        </div>
        <div className="budget-section">
                    <h2>Manage Your Budgets</h2>
                    <BudgetForm userID={userID} />
                    <BudgetList userID={userID} />
                </div>
        </div>
        </>
    );
};