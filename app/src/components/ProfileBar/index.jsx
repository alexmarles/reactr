import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './profile-bar.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onOpenText: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

function ProfileBar ({ picture, username, onOpenText, onLogout }) {
  return (
    <div className={styles.root}>
      <Link to='/profile'>
        <figure>
          <img className={styles.avatar} src={picture} />
        </figure>
      </Link>
      <span className={styles.username}>Hi @{username}!</span>
      <button className={styles.button} onClick={onOpenText}>
        <span className='fa fa-edit fa-lg'></span>
        Tweet!
      </button>
      <button className={styles.button} onClick={onLogout}>
        <span className='fa fa-sign-out'></span>
        Logout
      </button>
    </div>
  )
}

ProfileBar.propTypes = propTypes

export default ProfileBar
