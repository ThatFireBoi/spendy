import React, { useState } from "react";
import { useAddBudget } from "../../hooks/useAddBudget";


export const BudgetForm = () => {
  const { addBudget } = useAddBudget();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetSet, setBudgetSet] = useState(false); //Check is budget has been set

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = 'currentUserUID';
    await addBudget({
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0, // Budget starts at 0
      startDate,
      endDate,
      userID,
    });

    //Sets budget et to true once budget is added
    setBudgetSet(true);

    setName('');
    setTargetAmount('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Budget Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Target Amount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
      <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Add Budget</button>
    </form>
  );
};
