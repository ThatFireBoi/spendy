import { useAddTransactions } from "../../hooks/useAddTransactions";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransactions();

    const handleSubmit = (e) => {
        e.preventDefault()
        addTransaction({
            description: "Haircut",
            transactionAmount: 50,
            transactionType: "expense",
        });
    };

    return (
        <>
        <div className="expense-tracker">
            <div className="container">
                <h1>Expense Tracker</h1>
                <div className="balance">
                    <h2>Your Balance</h2>
                    <h3>$0.00</h3>
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
                <form className="add-transaction" handleSubmit={handleSubmit}>
                    <input type="text" placeholder="Add Transaction Description" required />
                    <input type="number" placeholder="Amount" required />
                    <input type="radio" id="expense" value="expense" />
                    <label htmlFor="expense">Expense</label>
                    <input type="radio" id="income" value="income" />
                    <label htmlFor="income">Income</label>

                    <button type="submit">Add Transaction</button>
                </form>
            </div>
        </div>
        <div className="transactions">
        <h3>Transactions</h3>
        </div>
        </>
    );
};