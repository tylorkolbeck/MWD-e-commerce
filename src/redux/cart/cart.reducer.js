import { addItem } from './cart.actions'
import { CartActionTypes } from './cart.types'
import { addItemToCart } from './cart.utils'

const INITIAL_STATE = {
  cartIsShown: false,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        cartIsShown: !state.cartIsShown
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    default:
      return state
  }
}

export default cartReducer
