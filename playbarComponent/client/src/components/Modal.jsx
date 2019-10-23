import React from 'react';
import styles from '../styles/Modal.module.css';

var Modal = props => {
  const { closePopup } = props;
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span>Next Up</span>
        <button className={styles.clearBtn}>Clear</button>
        <span className={styles.closeBtn} onClick={closePopup}>
          &times;
        </span>
        <hr />
      </div>
    </div>
  );
};

export default Modal;
