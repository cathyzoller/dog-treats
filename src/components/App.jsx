import React, { PropTypes } from 'react'
import { connect } from 'react-apollo'
import { browserHistory } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { setLocale } from '../store/actions'
import { FormattedMessage, FormattedDate } from 'react-intl'

const EN = 'en'
const FR = 'fr'

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
    marginRight: '15px',
    paddingLeft: '10px',
    paddingRight: '10px',
    textAlign: 'center'
  },
  rightfloat: {
    float: 'right',
    fontSize: '16px',
    marginTop: '20px',
    paddingRight: '30px'
  }
})

function App({ children, onUpdateLocale }) {
  const handleEnglishRedirect = () => {
    browserHistory.push('/dog-treats?language=en')
    onUpdateLocale(EN)
  }
  const handleFrenchRedirect = () => {
    browserHistory.push('/dog-treats?language=fr')
    onUpdateLocale(FR)
  }
  return (
    <div>
      <div className={css(styles.navBar)}>
        <h2>
          <FormattedMessage
            id={'app.title'}
            defaultMessage={'Dog Treats'}
          />
          <span className={css(styles.rightfloat)}>
            <FormattedDate
              value={new Date()}
              year='numeric'
              month='long'
              day='2-digit'
            />
          </span>
        </h2>
        <button className={css(styles.dropdown)} onClick={handleEnglishRedirect}>english </button>
        <button className={css(styles.dropdown)} onClick={handleFrenchRedirect}>french </button>
      </div>
      {children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object,
  onUpdateLocale: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onUpdateLocale: (locale) => dispatch(setLocale(locale))
})

export default connect({
  mapDispatchToProps
})(App)

