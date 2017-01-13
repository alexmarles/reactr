import React, { Component } from 'react'
import styles from './profile.css'

class Profile extends Component {
  render () {
    return (
      <div className={styles.root}>
        <figure className={styles.avatar}>
          <img src={this.props.picture} />
        </figure>
        <span className={styles.name}>{this.props.displayName}</span>
        <ul className={styles.data}>
          <li>
            <span className="fa fa-user"></span> {this.props.username}
          </li>
          <li>
            <span className="fa fa-envelope"></span> {this.props.emailAddress}
          </li>
          <li>
            <span className="fa fa-map-marker"></span> {this.props.location}
          </li>
        </ul>
      </div>
    )
  }

}

export default Profile
