import React from 'react'
import { browserHistory } from 'react-router'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottom: '1px grey solid',
    fontSize: '18px',
    height: '45px',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%'
  },
  dropdown: {
    float: 'right',
    paddingRight: '30px'
  }
})

export default function App({ children }) {
  const handleEnglishRedirect = () => {
    browserHistory.push('/dog-treats?language=en')
    window.location.href = window.location.href
  }
  const handleFrenchRedirect = () => {
    browserHistory.push('/dog-treats?language=fr')
    window.location.href = window.location.href
  }
  return (
    <div>
      <div className={css(styles.navBar)}>
        <h2>Dog Treats</h2>
        <button className={css(styles.dropdown)} onClick={handleEnglishRedirect}>english </button>
        <button className={css(styles.dropdown)} onClick={handleFrenchRedirect}>french </button>
      </div>
      {children}
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.object
}
