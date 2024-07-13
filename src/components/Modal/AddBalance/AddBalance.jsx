import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './AddBalance.module.css';

function AddBalanceModal({ isOpen, closeModal, addBalance }) {
  
  const [balanceInput, setBalanceInput] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBalance = parseFloat(balanceInput);
    if (!isNaN(newBalance)) {
      addBalance(newBalance);
    }
    closeModal();
  };

  const handleChange = (e) => {
    setBalanceInput(e.target.value);
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
        <p className={styles.head}>Add Balance</p>
        <form className={styles.formElement} onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder='Income Amount'
            className={styles.inputs}
            onChange={handleChange}
            value={balanceInput}
          />
          <button type="submit" className={styles.addButton}>Add Balance</button>
          <button type="button" className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </ReactModal>
  );
}

export default AddBalanceModal;
