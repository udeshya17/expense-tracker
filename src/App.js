import React, { useState, useEffect } from 'react';
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

  // Load data from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedExpense = localStorage.getItem('expense');
    const storedTransactions = localStorage.getItem('transactions');

    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }

    if (storedExpense) {
      setExpense(parseFloat(storedExpense));
    }

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const closeModal = () => {
    setAddBalanceModal(false);
    setAddExpenseModal(false);
    setIsDimmed(false);
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  const addBalance = (newBalance) => {
    setBalance((prevBalance) => {
      const updatedBalance = prevBalance + newBalance;
      localStorage.setItem('balance', updatedBalance);
      return updatedBalance;
    });
  };

  const addExpense = (newExpense, title, category, date) => {
    const expenseAmount = parseFloat(newExpense);
    if (!isNaN(expenseAmount) && expenseAmount > 0) {
      if (expenseAmount > balance) {
        enqueueSnackbar('Expense exceeds available balance!', { variant: 'error' });
        return;
      }
      
      const newTransaction = { title, amount: expenseAmount, category, date: new Date(date) };
      
      if (editingIndex !== null) {
        const previousAmount = transactions[editingIndex].amount;
        const updatedTransactions = transactions.map((transaction, index) => {
          if (index === editingIndex) {
            return { ...transaction, amount: expenseAmount, title, category, date: new Date(date) };
          }
          return transaction;
        });

        setTransactions(updatedTransactions);
        setBalance((prevBalance) => {
          const updatedBalance = prevBalance + previousAmount - expenseAmount;
          localStorage.setItem('balance', updatedBalance);
          localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
          return updatedBalance;
        });
        setExpense((prevExpense) => {
          const updatedExpense = prevExpense - previousAmount + expenseAmount;
          localStorage.setItem('expense', updatedExpense);
          return updatedExpense;
        });
      } else {
        setTransactions((prevTransactions) => {
          const updatedTransactions = [...prevTransactions, newTransaction];
          localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
          return updatedTransactions;
        });
        setExpense((prevExpense) => {
          const updatedExpense = prevExpense + expenseAmount;
          localStorage.setItem('expense', updatedExpense);
          return updatedExpense;
        });
        setBalance((prevBalance) => {
          const updatedBalance = prevBalance - expenseAmount;
          localStorage.setItem('balance', updatedBalance);
          return updatedBalance;
        });
      }
    }
    closeModal();
  };

  const deleteExpense = (index) => {
    const expenseAmount = transactions[index].amount;
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.filter((_, i) => i !== index);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
    setExpense((prevExpense) => {
      const updatedExpense = prevExpense - expenseAmount;
      localStorage.setItem('expense', updatedExpense);
      return updatedExpense;
    });
    setBalance((prevBalance) => {
      const updatedBalance = prevBalance + expenseAmount;
      localStorage.setItem('balance', updatedBalance);
      return updatedBalance;
    });
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

  const handleAddBalance = () => {
    setAddBalanceModal(true);
    setIsDimmed(true);
};

const handleAddExpense = () => {
    setAddExpenseModal(true);
    setIsDimmed(true);
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
