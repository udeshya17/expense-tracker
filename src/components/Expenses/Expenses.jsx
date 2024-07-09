import React from 'react';
import styles from './Expenses.module.css';

function Expenses(){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.head}>Entertainment</p>
                <div className={styles.rectangle} style={{width:'300px'}}></div>
            </div>
            <div className={styles.content}>
                <p className={styles.head} style={{marginTop:'90px', marginBottom:'90px', paddingLeft:'55px'}}>Food</p>
                <div className={styles.rectangle} style={{width:'200px'}}></div>
            </div>
            <div className={styles.content}>
                <p className={styles.head} style={{paddingLeft:'45px'}}>Travel</p>
                <div className={styles.rectangle} style={{width:'100px'}}></div>
            </div>
        </div>
    )
}

export default Expenses;
