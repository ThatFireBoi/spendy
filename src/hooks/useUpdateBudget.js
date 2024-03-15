import { useState, useEffect } from 'react';

export const useUpdateBudget = () => {
  const [budgets, setBudgets] = useState([]);

  const updateBudget = (budgetId, amount) => {
    // Create a new array of budgets
    const updatedBudgets = budgets.map(budget => {
      // If this is the budget we want to update
      if (budget.id === budgetId) {
        // Update the currentAmount
        const newCurrentAmount = budget.currentAmount + amount;

        // Check if the budget is completed
        const completed = newCurrentAmount >= budget.targetAmount;

        // Return a new budget object with the updated properties
        return { ...budget, currentAmount: newCurrentAmount, completed };
      }

      // If this is not the budget we want to update, return it unchanged
      return budget;
    });

    // Update the budgets state
    setBudgets(updatedBudgets);
  };


  return { budgets, updateBudget };
};
