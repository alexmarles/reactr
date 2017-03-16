import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'
import firebase from 'firebase'
import MessagesList from '../MessagesList'
import ProfileBar from '../ProfileBar'
import InputText from '../InputText'

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: Object.assign({}, this.props.user, { replies: [] }, { retweets: [] }, { favorites: [] }),
      openText: false,
      usernameToReply: '',
      msgToReply: 0,
      messages: []
    }

    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleSendText = this.handleSendText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.afterReply = this.afterReply.bind(this)
    this.handleReply = this.handleReply.bind(this)
    this.updateMsgRetweets = this.updateMsgRetweets.bind(this)
  }

  componentWillMount () {
    const messagesRef = firebase.database().ref().child('messages')

    messagesRef.on('child_added', snapshot => {
      this.setState({
        messages: this.state.messages.concat(snapshot.val()),
        openText: false,
        usernameToReply: '',
        msgToReply: 0
      })
    })
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

    const messagesRef = firebase.database().ref().child('messages')
    const messageID = messagesRef.push()
    let newMessage = {
      id: messageID.key,
      text: event.target.text.value,
      picture: this.props.user.photoURL,
      displayName: this.props.user.displayName,
      username: this.props.user.email.split('@')[0],
      date: Date.now(),
      replies: 0,
      retweets: 0,
      favorites: 0
    }

    messageID.set(newMessage)

    this.afterReply(this.state.msgToReply)
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

  updateMsgRetweets (msgId, movement) {
    let messageRef = firebase.database().ref(`messages/${msgId}`)
    messageRef.transaction(message => {
      if (message.retweets > 0 && movement < 0) {
        message.retweets--
      } else if (movement > 0) {
        message.retweets++
      }

      return message
    })
  }

  handleRetweet (msgId) {
    let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)
    let messages = this.state.messages
    let user = Object.assign({}, this.state.user)

    if (alreadyRetweeted.length === 0) {
      messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets++
          this.updateMsgRetweets(msg.id, 1)
        }

        return msg
      })

      user.retweets.push(msgId)
    } else {
      messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets--
          this.updateMsgRetweets(msg.id, -1)
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
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
          onLogout={this.props.onLogout}
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
