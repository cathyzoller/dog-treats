export const ADD_COUNT = 'ADD_COUNT'
export const ADD_TREAT = 'ADD_TREAT'

export const addCount = (amount) => {
  return { type: ADD_COUNT, amount }
}

export const setTreat = (name) => (
  (dispatch, getState) => {
    console.log('name', name);
    console.log('state', getState().apollo.data);
    //const { treats } = getState().apollo.data.ROOT_QUERY.allTreats;
    //const newTreats = treats.push({ name: name });
    //return { type: ADD_TREAT, newTreats };
  }
);
