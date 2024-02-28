import React from "react";
import { useGetBudgets } from "../../hooks/useGetBudgets";
import { ProgressBar } from "./ProgressBar";

export const BudgetList = ({ userID }) => {
  const budgets = useGetBudgets(userID);

  return (
    <div className="budget-list">
      <h2>Budgets</h2>
      {budgets.length > 0 ? (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id} className="budget-item">
              <p><b>{budget.name}|</b></p>
              <p><u>Target Amount</u>: ${budget.targetAmount}</p>
              <p><u>Current Amount</u>: ${budget.currentAmount}</p>
              <ProgressBar currentAmount={budget.currentAmount} targetAmount={budget.targetAmount} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No budgets found.</p>
      )}
    </div>
  );
};
