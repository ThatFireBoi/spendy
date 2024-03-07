import React, { useEffect } from "react";
import { useGetBudgets } from "../../hooks/useGetBudgets";
import { useDeleteBudget } from "../../hooks/useDeleteBudget";
import { ProgressBar } from "./ProgressBar";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

export function isBudgetSetWithinFirstFiveDays(budgets) {
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  return currentDayOfMonth <= 5 && budgets.length > 0;
}

export const BudgetList = ({ userID, onBudgetSet }) => {
  const budgets = useGetBudgets(userID);
  const { deleteBudget } = useDeleteBudget();

  const handleDeleteBudget = async (budgetID) => {
      await deleteBudget(budgetID);
  };

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
                  <IconButton onClick={() => handleDeleteBudget(budget.id)} aria-label="delete" style={{ color: 'red'}}>
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          ) : (
            <p>No budgets found.</p>
          )}
    </div>
  );
};
