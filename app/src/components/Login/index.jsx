import React, { Component } from 'react'
import styles from './login.css'

class Login extends Component {
  render () {
    return (
      <div className={styles.root}>
        <p className={styles.text}>
          Please, log in with your Github account
        </p>
        <button
          className={styles.button}
          onClick={this.props.onAuth}
        >
          <span className="fa fa-github"></span> Login with Github
        </button>
      </div>
    )
  }
}

export default Login
