import React from 'react'
import Message from '../Message'
import styles from './messages-list.css'

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

export default MessagesList
