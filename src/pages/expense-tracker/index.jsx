import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const { userName, profilePicture } = useGetUserInfo();
    const navigate = useNavigate();

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
        <div className="expense-tracker">
            <div className="container">
                <h1> {userName}'s Spendy Expense Tracker</h1>
                <div className="balance">
                    <h3> Your Balance</h3>
                    {balance >= 0 ? <h2>${balance} <h4>You are doing great! Keep it up!</h4></h2> : <h2> -${balance * -1} <h4>You are spending more than you are saving!</h4></h2>}
                </div>
                <div className="Summary">
                    <div className="Income">
                        <h4>Income</h4>
                        <p>${income}</p>
                    </div>
                    <div className="Expenses">
                        <h4>Expenses</h4>
                        <p>${expenses}</p>
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
            {profilePicture && <div className="profile"> <img className="profile-picture" src={profilePicture} alt="" /> <button className="sign-out-btn" onClick={signUserOut}> Sign Out</button></div>}
        </div>
        <div className="transactions">
        <h3> Transactions</h3>
        <ul>
            {transactions.map((transaction) => {
                const { description, transactionAmount, transactionType } = transaction;
                return <li> <h4> {description} </h4><p> ${transactionAmount} × <label style={{color: transactionType === "expense" ? "red" : "blue"}}> {transactionType} </label></p></li>
            
            })}
        </ul>
        </div>
        </>
    );
};