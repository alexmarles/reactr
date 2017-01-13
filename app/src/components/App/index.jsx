import React, { Component } from 'react'
import { HashRouter, Match } from 'react-router'
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
      user: {
        photoURL: 'http://placehold.it/150/ff0/000?text=god',
        email: 'god@reactr.com',
        displayName: 'Alex Marles',
        username: 'god',
        location: 'Barcelona',
        onOpenText: false
      }
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
  }

  handleOnAuth () {
    console.log('Auth')
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Header />

          <Match exactly pattern='/' render={() => {
            if (this.state.user) {
              return (
                <Main user={this.state.user} />
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
              username={this.state.user.username}
              displayName={this.state.user.displayName}
              emailAddress={this.state.user.email}
              location={this.state.user.location}
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
