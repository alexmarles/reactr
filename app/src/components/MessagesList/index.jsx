import React, { Component } from 'react'
import Message from '../Message'
import styles from './messages-list.css'

class MessagesList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={styles.root}>
        {this.props.messages.map( (msg) => {
          return (
            <Message
              key={msg.id}
              text={msg.text}
              picture={msg.picture}
              displayName={msg.displayName}
              username={msg.username}
              date={msg.date}
              numReplies={msg.replies}
              numRetweets={msg.retweets}
              numFavorites={msg.favorites}
              onReply={() => this.props.onReply(msg.id, msg.username)}
              onRetweet={() => this.props.onRetweet(msg.id)}
              onFavorite={() => this.props.onFavorite(msg.id)}
            />
          )
        }).reverse()}
      </div>
    )
  }
}

export default MessagesList
