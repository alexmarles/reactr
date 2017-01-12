import React, { Component } from 'react'
import styles from './profile-bar.css'

class ProfileBar extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className={styles.root}>
        <figure>
          <img className={styles.avatar} src={this.props.picture} />
        </figure>
        <span className={styles.username}>Hi @{this.props.username}!</span>
        <button className={styles.button} onClick={this.props.onOpenText}>
          <span className='fa fa-edit fa-lg'></span>
          Tweet!
        </button>
      </div>
    )
  }
}

export default ProfileBar
