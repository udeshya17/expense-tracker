import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styles from './Expense.module.css';

function ExpenseModal({ isOpen, closeModal, addExpense, editingTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date.toISOString().split('T')[0]);
    } else {
      setTitle('');
      setAmount('');
      setCategory('food');
      setDate('');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(amount, title, category, date);
    closeModal();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.container}>
        <p className={styles.head}>{editingTransaction ? 'Edit Expense' : 'Add Expenses'}</p>
        <form className={styles.formElement} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Title'
            className={styles.inputs}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder='Price'
            className={styles.inputs}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            id="category"
            name="category"
            className={styles.inputs}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <input
            type="date"
            className={styles.inputs}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className={styles.addButton}>{editingTransaction ? 'Update Expense' : 'Add Expense'}</button>
          <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </ReactModal>
  );
}

export default ExpenseModal;
