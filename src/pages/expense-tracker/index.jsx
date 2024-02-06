import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./styles.css";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions } = useGetTransactions();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const onSubmit = async (e) => {
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
    };

    return (
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1> Expense Tracker</h1>
                <div className="balance">
                    <h3> Your Balance</h3>
                    <h2>$0.00</h2>
                </div>
                <div className="Summary">
                    <div className="Income">
                        <h4>Income</h4>
                        <p>$0.00</p>
                    </div>
                    <div className="Expenses">
                        <h4>Expenses</h4>
                        <p>$0.00</p>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Add Transaction Description" required onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)}/>
                    <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="expense"> Expense</label>
                    <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="income"> Income</label>

                    <button type="submit"> Add Transaction</button>
                </form>
            </div>
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