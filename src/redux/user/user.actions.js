export const USER_ACTIONS = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const setCurrentUser = (user) => ({
  type: USER_ACTIONS.SET_CURRENT_USER,
  payload: user
})
