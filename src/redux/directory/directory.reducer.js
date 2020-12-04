import { sections } from '../../utils/dummyData'

const INITIAL_STATE = {
  sections: sections
}

function useReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default useReducer
