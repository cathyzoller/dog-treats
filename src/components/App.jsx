import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottom: '1px grey solid',
    height: '40px',
    width: '100%'
  }
})

export default function App({ children }) {
  return (
    <div>
      <div className={css(styles.navBar)}>
        DogTreats
      </div>
      {children}
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.object
}
