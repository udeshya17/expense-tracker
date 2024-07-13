import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './Expense.module.css';

function ExpenseModal({ isOpen, closeModal }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false} // only use this if you are not using the `appElement` prop
    >
      <div className={styles.container}>
        <p className={styles.head}>Add Expenses</p>
        <form style={{ display: 'flex', textAlign: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '30px' }}>
          <input type="text" placeholder='Title' className={styles.inputs} />
          <input type="number" placeholder='Price' className={styles.inputs} />
          <select id="category" name="category" className={styles.inputs}>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <input type="date" placeholder='dd/mm/yyyy' className={styles.inputs} />
          <button type="submit" onClick={closeModal} className={styles.addButton}>Add Expense</button>
          <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </ReactModal>
  );
}

export default ExpenseModal;
