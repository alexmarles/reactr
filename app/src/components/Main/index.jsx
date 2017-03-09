import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'
import MessagesList from '../MessagesList'
import ProfileBar from '../ProfileBar'
import InputText from '../InputText'

const propTypes = {
  user: PropTypes.object.isRequired
}

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: Object.assign({}, this.props.user, { replies: [] }, { retweets: [] }, { favorites: [] }),
      openText: false,
      usernameToReply: '',
      msgToReply: 0,
      messages: [
        {
          id: uuid.v4(),
          text: 'Call me Stuart',
          picture: 'http://placehold.it/150/00f/fff?text=hamster',
          displayName: 'Stuart Little',
          username: 'hamster',
          date: Date.now() - (30*60*1000),
          replies: 0,
          retweets: 0,
          favorites: 0
        },
        {
          id: uuid.v4(),
          text: 'I don\'t know my name',
          picture: 'http://placehold.it/150/0f0/fff?text=unknown',
          displayName: 'John Doe',
          username: 'unknown',
          date: Date.now() - (4*60*1000),
          replies: 0,
          retweets: 0,
          favorites: 0
        },
        {
          id: uuid.v4(),
          text: 'I am Charlie',
          picture: 'http://placehold.it/150/f00/fff?text=charlie',
          displayName: 'Carl Elias',
          username: 'charlie',
          date: Date.now() - (3*60*1000),
          replies: 0,
          retweets: 0,
          favorites: 0
        }
      ]
    }

    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleSendText = this.handleSendText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.afterReply = this.afterReply.bind(this)
    this.handleReply = this.handleReply.bind(this)
  }

  handleOpenText (event) {
    event.preventDefault()
    this.setState({ openText: true })
  }

  handleCloseText (event) {
    event.preventDefault()
    this.setState({ openText: false })
  }

  handleSendText (event) {
    event.preventDefault()
    let newMessage = {
      id: uuid.v4(),
      text: event.target.text.value,
      picture: this.props.user.photoURL,
      displayName: this.props.user.displayName,
      username: this.props.user.username,
      date: Date.now(),
      replies: 0,
      retweets: 0,
      favorites: 0
    }

    this.afterReply(this.state.msgToReply)

    this.setState({
      messages: this.state.messages.concat([newMessage]),
      openText: false,
      usernameToReply: '',
      msgToReply: 0
    })
  }

  renderOpenText () {
    if (this.state.openText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          usernameToReply={this.state.usernameToReply}
        />
      )
    }
  }

  handleRetweet (msgId) {
    let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)
    let messages = this.state.messages
    let user = Object.assign({}, this.state.user)

    if (alreadyRetweeted.length === 0) {
      messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets++
        }

        return msg
      })

      user.retweets.push(msgId)
    } else {
      messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets--
        }

        return msg
      })

      let index = user.retweets.indexOf(msgId)
      user.retweets.splice(index, 1)
    }

    this.setState({
      messages: messages,
      user: user
    })
  }

  handleFavorite (msgId) {
    let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId)
    let messages = this.state.messages
    let user = Object.assign({}, this.state.user)

    if (alreadyFavorited.length === 0) {
      messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favorites++
        }

        return msg
      })

      user.favorites.push(msgId)
    } else {
      messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favorites--
        }

        return msg
      })

      let index = user.favorites.indexOf(msgId)
      user.favorites.splice(index, 1)
    }

    this.setState({
      messages: messages,
      user: user
    })
  }

  afterReply (msgId) {
    let messages = this.state.messages.map(msg => {
      if (msg.id === msgId) {
        msg.replies++
      }

      return msg
    })

    let user = Object.assign({}, this.state.user)
    user.replies.push(msgId)

    this.setState({
      messages: messages,
      user: user
    })
  }

  handleReply (msgId, usernameToReply) {
    this.setState({
      openText: true,
      usernameToReply: usernameToReply,
      msgToReply: msgId
    })
  }

  render () {
    return (
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.username}
          onOpenText={this.handleOpenText}
        />
        {this.renderOpenText()}
        <MessagesList
          messages={this.state.messages}
          onReply={this.handleReply}
          onRetweet={this.handleRetweet}
          onFavorite={this.handleFavorite}
        />
      </div>
    )
  }
}

Main.propTypes = propTypes

export default Main
