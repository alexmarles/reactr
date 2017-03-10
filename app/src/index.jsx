import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import keys from './keys'

firebase.initializeApp({
  apiKey: keys.firebase.apiKey,
  authDomain: keys.firebase.authDomain,
  databaseURL: keys.firebase.databaseURL,
  storageBucket: keys.firebase.signInWithPopup,
  messagingSenderId: keys.firebase.messagingSenderId
})

import App from './components/App'

render(<App />, document.getElementById('root'))
