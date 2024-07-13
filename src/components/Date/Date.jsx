import React from 'react';
import styles from './Date.module.css';

function CurrentDate({ date }) {
  const now = new Date(date);

  const year = now.getFullYear();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[now.getMonth()]; 
  const day = now.getDate().toString().padStart(2, '0');

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div>
      <p className={styles.currentDate}>{formattedDate}</p>
    </div>
  );
}

export default CurrentDate;
