import React from 'react';
import { PiPizza } from "react-icons/pi";
import CurrentDate from '../Date/Date';
import { GoPencil } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import styles from './SubContent.module.css';

function Content(){
    return (
        <div>
          <div className={styles.details}>
            <div className={styles.detailsLeft}>
              <PiPizza className={styles.logo}/>
              <div className={styles.leftPart}>
                <p className={styles.expenseTitle}>Samosa</p>
                <CurrentDate/>
              </div>
            </div>
            <div className={styles.detailsRight}>
              <p className={styles.expenseRupee}>₹500</p>
              <div className={styles.buttons}>
                <button className={styles.cancelButton}><MdOutlineCancel /></button>
                <button className={styles.editButton}><GoPencil/></button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Content;