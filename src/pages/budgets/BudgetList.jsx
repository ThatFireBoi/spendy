import React from "react";
import { useGetBudgets } from "../../hooks/useGetBudgets";
import { useDeleteBudget } from "../../hooks/useDeleteBudget";
import { ProgressBar } from "./ProgressBar";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";



export function isBudgetSetWithinFirstFiveDays(budgets) {
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  return currentDayOfMonth <= 7 && budgets.length > 0;
}

export const BudgetList = ({ userID, onBudgetSet }) => {
  const budgets = useGetBudgets(userID);
  const { deleteBudget } = useDeleteBudget();

  const handleDeleteBudget = async (budgetID) => {
      await deleteBudget(budgetID);
  };

  const completedBudgets = budgets.filter(budget => budget.isCompleted);

  return (
    <div className="budget-list">
      <h2>Savings Goals</h2>
      {budgets.length > 0 ? (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id} className="budget-item">
              <p><b>{budget.name}</b></p>
              <p><u><b>Target Amount</b></u> ${budget.targetAmount} <u><b>Current Amount</b></u> ${budget.currentAmount}</p>
              <div>
                <p><u><b>Start Date</b></u> {budget.startDate}</p>
                <p><u><b>End Date</b></u> {budget.endDate}</p>
              </div>
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
