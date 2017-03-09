import React, { PropTypes } from 'react'
import styles from './login.css'

const propTypes = {
  onAuth: PropTypes.func.isRequired
}

function Login ({ onAuth }) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        Please, log in with your Github account
      </p>
      <button
        className={styles.button}
        onClick={onAuth}
      >
        <span className="fa fa-github"></span> Login with Github
      </button>
    </div>
  )
}

Login.propTypes = propTypes

export default Login
