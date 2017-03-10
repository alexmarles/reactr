import React from 'react'
import { Link } from 'react-router'

import styles from './header.css'

function Header () {
  return (
    <header className={styles.root}>
      <Link to='/' className={styles.link}>
        <h1 className={styles.logo}>Reactr</h1>
      </Link>
    </header>
  )
}

export default Header
