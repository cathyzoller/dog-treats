import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottom: '1px grey solid',
    fontSize: '18px',
    height: '45px',
    paddingTop: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%'
  }
})

export default function App({ children }) {
  console.log('children', children);
  return (
    <div>
      <div className={css(styles.navBar)}>
        Dog Treats
      </div>
      {children}
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.object
}
