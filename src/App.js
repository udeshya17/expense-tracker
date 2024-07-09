import React from 'react';
import './App.css';
import Chart from './components/PieChart/PieChart';
import Content from './components/SubContent/SubContent'
import Expenses from './components/Expenses/Expenses'
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";


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
          <Content />
          <hr/>
          <Content />
          <hr/>
          <Content />
          <hr/>
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
            <Expenses/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
