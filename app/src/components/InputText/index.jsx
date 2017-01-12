import React, { Component } from 'react'
import styles from './input-text.css'

class InputText extends Component {
  constructor () {
    super()
  }

  render () {
    return(
      <form className={styles.form} onSubmit={this.props.onSendText}>
        <textarea className={styles.text} defaultValue={(this.props.usernameToReply) ? `@${this.props.usernameToReply} ` : ''} name='text'></textarea>
        <div className={styles.buttons}>
          <button className={styles.close} onClick={this.props.onCloseText}>Close</button>
          <button className={styles.send} type='submit'>Send</button>
        </div>
      </form>
    )
  }
}

export default InputText
