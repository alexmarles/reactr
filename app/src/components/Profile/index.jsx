import React from 'react'
import styles from './profile.css'

function Profile ({ picture, displayName, username, emailAddress, location }) {
  return (
    <div className={styles.root}>
      <figure className={styles.avatar}>
        <img src={picture} />
      </figure>
      <span className={styles.name}>{displayName}</span>
      <ul className={styles.data}>
        <li>
          <span className="fa fa-user"></span> {username}
        </li>
        <li>
          <span className="fa fa-envelope"></span> {emailAddress}
        </li>
        <li>
          <span className="fa fa-map-marker"></span> {location}
        </li>
      </ul>
    </div>
  )
}

export default Profile
