import React, { PropTypes } from 'react'
import styles from './input-text.css'

const propTypes = {
  usernameToReply: PropTypes.string.isRequired,
  onSendText: PropTypes.func.isRequired,
  onCloseText: PropTypes.func.isRequired
}

function InputText ({ onSendText, usernameToReply, onCloseText }) {
  return (
    <form className={styles.form} method='post' onSubmit={onSendText}>
      <textarea className={styles.text} defaultValue={(usernameToReply) ? `@${usernameToReply} ` : ''} name='text'></textarea>
      <div className={styles.buttons}>
        <button className={styles.close} onClick={onCloseText}>Close</button>
        <button className={styles.send} type='submit'>Send</button>
      </div>
    </form>
  )
}

InputText.propTypes = propTypes

export default InputText
