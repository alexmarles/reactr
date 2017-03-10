import React, { Component } from 'react'
import { HashRouter, Match } from 'react-router'
import firebase from 'firebase'
import 'normalize-css'

import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'
import styles from './app.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      user2: {
        photoURL: 'http://placehold.it/150/ff0/000?text=god',
        email: 'god@reactr.com',
        displayName: 'Alex Marles',
        username: 'god',
        location: 'Barcelona',
        onOpenText: false
      }
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} logged in`))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(() => console.log('Logged out'))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Header />

          <Match exactly pattern='/' render={() => {
            if (this.state.user) {
              return (
                <Main
                  user={this.state.user}
                  onLogout={this.handleLogout}
                />
              )
            } else {
              return (
                <Login onAuth={this.handleOnAuth} />
              )
            }
          }} />

          <Match pattern='/profile' render={() => (
            <Profile
              picture={this.state.user.photoURL}
              username={this.state.user.email.split('@')[0]}
              displayName={this.state.user.displayName}
              emailAddress={this.state.user.email}
              location={this.state.user.location || 'Unknown'}
            />
          )} />

          <Match pattern='/user/:username' render={({ params }) => {
            // TODO
            // Render <Profile /> with params.username
          }} />
        </div>
      </HashRouter>
    )
  }
}

export default App
