import React, { useEffect } from 'react';
import styles from './AddBalance.module.css';


function AddModal({closeModal}){

    
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


    return (
        <div >
            <div className={styles.container}>
                <p className={styles.head}>Add Balance</p>
                <form style={{display:'flex', justifyContent:'space-between', textAlign:'center',marginTop:'20px'}}>
                    <input type="number" placeholder='Income Amount' className={styles.inputs}/>
                    <button type="submit" onClick={closeModal} className={styles.addButton}>Add Balance</button>
                    <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default AddModal;