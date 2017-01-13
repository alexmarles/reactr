import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './profile-bar.css'

class ProfileBar extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className={styles.root}>
        <Link to='/profile'>
          <figure>
            <img className={styles.avatar} src={this.props.picture} />
          </figure>
        </Link>
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
