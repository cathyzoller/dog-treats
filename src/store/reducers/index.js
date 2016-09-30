import { ADD_COUNT } from '../actions'
import { ADD_TREAT } from '../actions'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_COUNT:
    return { ...state, count: action.count };
  case ADD_TREAT:
    return { ...state, apollo: { data: { ROOT_QUERY: { allTreats: action.treats } } } };
  default:
    return state;
  }
}
