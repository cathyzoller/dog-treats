import { updateIntl } from 'react-intl-redux'
import { localeData } from '../../locales/data.js'

export const SET_LOCALE = 'SET_LOCALE'
export const ADD_TREAT = 'ADD_TREAT'


export const setLocale = (locale) => (
  (dispatch) => {
    const messages = localeData[locale] || localeData['en'] // english fallback
    dispatch(updateIntl({
      locale,
      messages
    }))
    return { type: SET_LOCALE, locale, messages }
  }
)

export const setTreat = (name) => (
  (dispatch, getState) => {
    console.log('name', name);
    console.log('state', getState().apollo.data);
    //const { treats } = getState().apollo.data.ROOT_QUERY.allTreats;
    //const newTreats = treats.push({ name: name });
    //return { type: ADD_TREAT, newTreats };
  }
);
