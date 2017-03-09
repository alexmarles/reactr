import React, { PropTypes } from 'react'
import Message from '../Message'
import styles from './messages-list.css'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onReply: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired
}

function MessagesList ({ messages, onReply, onRetweet, onFavorite }) {
  return (
    <div className={styles.root}>
      {messages.map( (msg) => {
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
            onReply={() => onReply(msg.id, msg.username)}
            onRetweet={() => onRetweet(msg.id)}
            onFavorite={() => onFavorite(msg.id)}
          />
        )
      }).reverse()}
    </div>
  )
}

MessagesList.propTypes = propTypes

export default MessagesList
