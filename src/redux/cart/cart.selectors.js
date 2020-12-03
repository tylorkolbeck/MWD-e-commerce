import { createSelector } from 'reselect'

const selectCart = (state) => {
  return state.cart
}

// memoized selector for all cart items
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

// Memoized selector for cart item quantity
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
)
