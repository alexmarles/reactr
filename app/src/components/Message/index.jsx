import React, { Component } from 'react'
import moment from 'moment'
import styles from './message.css'

class Message extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pressRetweet: false,
      pressFavorite: false
    }

    this.onPressRetweet = this.onPressRetweet.bind(this)
    this.onPressFavorite = this.onPressFavorite.bind(this)
  }

  onPressRetweet () {
    this.props.onRetweet()
    this.setState({
      pressRetweet: !this.state.pressRetweet
    })
  }

  onPressFavorite () {
    this.props.onFavorite()
    this.setState({
      pressFavorite: !this.state.pressFavorite
    })
  }

  render () {
    let dateFormat = moment(this.props.date).fromNow()

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <figure>
            <img className={styles.avatar} src={this.props.picture} />
          </figure>
          <span className={styles.displayName}>{this.props.displayName}</span>
          <span className={styles.username}>@{this.props.username}</span>
          <span className={styles.date}>{dateFormat}</span>
        </div>
        <h3 className={styles.text}>{this.props.text}</h3>
        <div className={styles.buttons}>
          <div
            className={styles.icon}
            onClick={this.props.onReply}
          >
            <span className='fa fa-reply'></span>
            <span className={styles.num}>{this.props.numReplies}</span>
          </div>
          <div
            className={(this.state.pressRetweet) ? styles.rtGreen : styles.icon}
            onClick={this.onPressRetweet}
          >
            <span className='fa fa-retweet'></span>
            <span className={styles.num}>{this.props.numRetweets}</span>
          </div>
          <div
            className={(this.state.pressFavorite) ? styles.favYellow : styles.icon}
            onClick={this.onPressFavorite}
          >
            <span className='fa fa-star'></span>
            <span className={styles.num}>{this.props.numFavorites}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
