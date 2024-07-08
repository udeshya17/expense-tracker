import React from 'react';
import './App.css';
import Chart from './components/PieChart/PieChart'

function App() {
  return (
    <div className="container">
      <p className='heading'>Expense Tracker</p>
      <div className='content'>
        <div className='cardOne'>
          <p className='subHead'>Wallet Balance: <span style={{ color: '#9DFF5B' }}>₹5000</span></p>
          <button className='addButton' style={{ background: 'linear-gradient(90deg, #B5DC52 0%, #89E148 100%)' }}>+ Add Income</button>
        </div>
        <div className='cardTwo'>
          <p className='subHead'>Expenses: <span style={{ color: '#F4BB4A'}}>₹500</span></p>
          <button className='addButton' style={{ background: 'linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)' }}>+ Add Expense</button>
        </div>
        <Chart />
      </div>
      <div className='subContents'>
        <div>
          <p className='subContentHead'>Recent transactions</p>
            <div className='subContainerOne'>

            </div>
        </div>
        <div>
          <p className='subContentHead'>Top Expenses</p>
            <div className='subContainerTwo'>

            </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
