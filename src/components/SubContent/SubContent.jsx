import React from 'react';
import { PiPizza } from "react-icons/pi";
import { GoGift } from "react-icons/go";
import { BsSuitcase2 } from "react-icons/bs";
import CurrentDate from '../Date/Date';
import { GoPencil } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import styles from './SubContent.module.css';

function Content({ transactions, onEdit, onDelete }) {
  
  // Function to get the correct icon based on the category

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'food':
        return <PiPizza className={styles.logo} />;
      case 'entertainment':
        return <GoGift className={styles.logo} />;
      case 'travel':
        return <BsSuitcase2 className={styles.logo} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {transactions.map((transaction, index) => (
        <div>
        <div key={index} className={styles.details}>
          <div className={styles.detailsLeft}>
            {getCategoryIcon(transaction.category)}
            <div className={styles.leftPart}>
              <p className={styles.expenseTitle}>{transaction.title}</p>
              <CurrentDate date={transaction.date} />
            </div>
          </div>
          <div className={styles.detailsRight}>
            <p className={styles.expenseRupee}>₹{transaction.amount}</p>
            <div className={styles.buttons}>
              <button className={styles.cancelButton} onClick={() => onDelete(index)}>
                <MdOutlineCancel />
              </button>
              <button className={styles.editButton} onClick={() => onEdit(index)}>
                <GoPencil />
              </button>
            </div>
          </div>
        </div>
        <hr />
        </div>
      ))}
    </div>
  );
}

export default Content;
