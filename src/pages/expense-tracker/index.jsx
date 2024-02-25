import { useState } from "react";
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
import { auth } from "../../config/firebase-config";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";


export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { deleteTransaction } = useDeleteTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const { userName, profilePicture } = useGetUserInfo();
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");

    const handleThemeChange = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const { balance, income, expenses } = transactionTotals;

    const onSubmit = async (e) => {
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
        setDescription("");
        setTransactionAmount("");
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
                        <h4>Income</h4>
                        <h3>${income}</h3>
                    </div>
                    <div className="Expenses">
                        <h4>Expenses</h4>
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
                return <li key={id}> <h4> {description} </h4><p> ${transactionAmount} × <label style={{color: transactionType === "expense" ? "red" : "blue"}}> 
                {transactionType} </label></p><IconButton onClick={() => deleteTransaction(id)} aria-label="delete" style={{ color: 'red'}}><DeleteIcon /></IconButton></li>
            
            })}
        </ul>
        </div>
        </div>
        </>
    );
};