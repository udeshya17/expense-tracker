import React, { useState } from 'react';
import './App.css';
import Chart from './components/PieChart/PieChart';
import Content from './components/SubContent/SubContent';
import Graph from './components/BarGraph/BarGraph';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import AddBalanceModal from './components/Modal/AddBalance/AddBalance';
import ExpenseModal from './components/Modal/Expense/Expense';
import { useSnackbar } from 'notistack';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [addBalanceModal, setAddBalanceModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 3;
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddBalance = () => {
    setAddBalanceModal(true);
    setIsDimmed(true);
  };

  const handleAddExpense = () => {
    setAddExpenseModal(true);
    setIsDimmed(true);
  };

  const closeModal = () => {
    setAddBalanceModal(false);
    setAddExpenseModal(false);
    setIsDimmed(false);
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  const addBalance = (newBalance) => {
    setBalance((prevBalance) => prevBalance + newBalance);
  };

  const addExpense = (newExpense, title, category, date) => {
    const expenseAmount = parseFloat(newExpense);
    if (!isNaN(expenseAmount) && expenseAmount > 0) {
      if (expenseAmount > balance) {
        enqueueSnackbar('Expense exceeds available balance!', { variant: 'error' });
        return; // Prevent further processing
      }
      
      if (editingIndex !== null) {
        const previousAmount = transactions[editingIndex].amount;
        const updatedTransactions = transactions.map((transaction, index) => {
          if (index === editingIndex) {
            return { ...transaction, amount: expenseAmount, title, category, date: new Date(date) };
          }
          return transaction;
        });

        setTransactions(updatedTransactions);
        setBalance((prevBalance) => prevBalance + previousAmount - expenseAmount);
        setExpense((prevExpense) => prevExpense - previousAmount + expenseAmount);
      } else {
        setExpense((prevExpense) => prevExpense + expenseAmount);
        setBalance((prevBalance) => prevBalance - expenseAmount);
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          { title, amount: expenseAmount, category, date: new Date(date) },
        ]);
      }
    }
    closeModal();
  };

  const deleteExpense = (index) => {
    const expenseAmount = transactions[index].amount;
    setTransactions((prevTransactions) => prevTransactions.filter((_, i) => i !== index));
    setExpense((prevExpense) => prevExpense - expenseAmount);
    setBalance((prevBalance) => prevBalance + expenseAmount);
  };

  const editExpense = (index) => {
    const transactionToEdit = transactions[index];
    setEditingIndex(index);
    setEditingTransaction(transactionToEdit);
    setAddExpenseModal(true);
  };

  const totalPages = Math.ceil(transactions.length / expensesPerPage);
  const currentExpenses = transactions.slice((currentPage - 1) * expensesPerPage, currentPage * expensesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className='container' style={isDimmed ? { opacity: '23%' } : {}}>
        <p className='heading'>Expense Tracker</p>
        <div className='content'>
          <div className='cardOne'>
            <p className='subHead'>Wallet Balance: <span style={{ color: '#9DFF5B' }}>{balance}</span></p>
            <br />
            <button className='addButton' onClick={handleAddBalance} style={{ background: 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)' }}>+ Add Income</button>
          </div>
          <div className='cardTwo'>
            <p className='subHead'>Expenses: <span style={{ color: '#F4BB4A' }}>{expense}</span></p>
            <br />
            <button className='addButton' onClick={handleAddExpense} style={{ background: 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)' }}>+ Add Expense</button>
          </div>
          <Chart transactions={transactions}/>
        </div>
        <div className='subContents'>
          <div>
            <p className='subContentHead'>Recent transactions</p>
            <div className='subContainerOne'>
              <Content 
                transactions={currentExpenses} 
                onEdit={editExpense} 
                onDelete={deleteExpense} 
              />
              <div className='pagination'>
                <button className='leftButton' onClick={goToPreviousPage} disabled={currentPage === 1}>
                  <IoIosArrowRoundBack />
                </button>
                <div className='page'>{currentPage} / {totalPages}</div>
                <button className='rightButton' onClick={goToNextPage} disabled={currentPage === totalPages}>
                  <IoIosArrowRoundForward />
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className='subContentHead'>Top Expenses</p>
            <div className='subContainerTwo'>
              <Graph transactions={transactions}/>
            </div>
          </div>
        </div>
      </div>
      {addBalanceModal && (
        <AddBalanceModal
          isOpen={addBalanceModal}
          closeModal={closeModal}
          addBalance={addBalance}
        />
      )}
      {addExpenseModal && (
        <ExpenseModal
          isOpen={addExpenseModal}
          closeModal={closeModal}
          addExpense={addExpense}
          editingTransaction={editingTransaction}
        />
      )}
    </>
  );
}

export default App;
