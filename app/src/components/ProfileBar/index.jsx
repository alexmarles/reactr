import React from 'react'
import { Link } from 'react-router'
import styles from './profile-bar.css'

function ProfileBar ({ picture, username, onOpenText }) {
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
    </div>
  )
}

export default ProfileBar
