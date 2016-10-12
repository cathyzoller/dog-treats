import { ADD_TREAT } from '../actions'
import { SET_LOCALE } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_TREAT:
      return { ...state, apollo: { data: { ROOT_QUERY: { allTreats: action.treats } } } }
    case SET_LOCALE:
      return { ...state, intl: { messages: action.messages, locale: action.locale } }
    default:
      return state
  }
}
