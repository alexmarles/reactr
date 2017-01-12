import React, { Component } from 'react'
import 'normalize-css'

import Header from '../Header'
import Main from '../Main'
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
        onOpenText: false
      }
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Main user={this.state.user}/>
      </div>
    )
  }
}

export default App
