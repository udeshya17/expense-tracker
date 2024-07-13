import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './AddBalance.module.css';

function AddBalanceModal({ isOpen, closeModal }) {
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
        <p className={styles.head}>Add Balance</p>
        <form style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginTop: '20px' }}>
          <input type="number" placeholder='Income Amount' className={styles.inputs} />
          <button type="submit" onClick={closeModal} className={styles.addButton}>Add Balance</button>
          <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </ReactModal>
  );
}

export default AddBalanceModal;
