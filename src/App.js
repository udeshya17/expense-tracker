import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './components/PieChart/PieChart';
import Content from './components/SubContent/SubContent';
import Graph from './components/BarGraph/BarGraph';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import AddBalanceModal from './components/Modal/AddBalance/AddBalance';
import AddExpenseModal from './components/Modal/Expense/Expense';

function App() {
  const [addBalanceModal, setAddBalanceModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);

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
  };

  return (
    <>
      <div className='container' style={isDimmed ? { opacity: '23%' } : {}}>
        <p className='heading'>Expense Tracker</p>
        <div className='content'>
          <div className='cardOne'>
            <p className='subHead'>Wallet Balance: <span style={{ color: '#9DFF5B' }}>₹5000</span></p>
            <button className='addButton' onClick={handleAddBalance} style={{ background: 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)' }}>+ Add Income</button>
          </div>
          <div className='cardTwo'>
            <p className='subHead'>Expenses: <span style={{ color: '#F4BB4A'}}>₹500</span></p>
            <button className='addButton' onClick={handleAddExpense} style={{ background: 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)' }}>+ Add Expense</button>
          </div>
          <Chart />
        </div>
        <div className='subContents'>
          <div>
            <p className='subContentHead'>Recent transactions</p>
            <div className='subContainerOne'>
              <Content />
              <div className='pagination'>
                <button className='leftButton'><IoIosArrowRoundBack /></button>
                <div className='page'>1</div>
                <button className='rightButton'><IoIosArrowRoundForward /></button>
              </div>
            </div>
          </div>
          <div>
            <p className='subContentHead'>Top Expenses</p>
            <div className='subContainerTwo'>
              <Graph />
            </div>
          </div>
        </div>
      </div>
      {addBalanceModal && <AddBalanceModal closeModal={closeModal} />}
      {addExpenseModal && <AddExpenseModal closeModal={closeModal} />}
    </>
  );
}

export default App;
