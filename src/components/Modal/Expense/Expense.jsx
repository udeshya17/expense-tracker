import React, { useEffect } from 'react';
import styles from './Expense.module.css';


function ExpenseModal({closeModal}){

    
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


    return (
        <div >
            <div className={styles.container}>
                <p className={styles.head}>Add Expenses</p>
                <form style={{display:'flex', textAlign:'center',marginTop:'20px', flexWrap:'wrap', gap:'30px'}}>
                    <input type="text" placeholder='Title' className={styles.inputs}/>
                    <input type="number" placeholder='Price' className={styles.inputs}/>
                    <select id="cars" name="cars" className={styles.inputs}>
                    <option value="volvo">Food</option>
                    <option value="saab">Travel</option>
                    <option value="fiat">Entertainment</option>
                    </select>
                    <input type="date" placeholder='dd/mm/yyyy' className={styles.inputs}/>
                    <button type="submit" onClick={closeModal} className={styles.addButton}>Add Expense</button>
                    <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default ExpenseModal;

