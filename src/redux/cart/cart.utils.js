/**
 *
 * Add an item to the cart
 * @param {array} cartItems
 * @param {object} cartItemToAdd
 * @returns {array}
 */
export const addItemToCart = (cartItemsArray, cartItemToAdd) => {
  const existingCartItem = cartItemsArray.find(
    (item) => cartItemToAdd.id === item.id
  )
  if (existingCartItem) {
    return cartItemsArray.map((item) =>
      item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

  return [...cartItemsArray, { ...cartItemToAdd, quantity: 1 }]
}

/**
 *
 * Remove all instances of an item from the cart
 * @param {array} cartItemsArray
 * @param {object} cartItemToRemove
 * @returns {array}
 */
export const clearItemFromCart = (cartItemsArray, cartItemToClear) => {
  return cartItemsArray.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

/**
 * Decrease quantity of an item in the cart by removing one
 * @param {*} cartItemsArray
 * @param {*} cartItemToRemove
 */
export const removeItemFromCart = (cartItemsArray, cartItemToRemove) => {
  const existingCartItem = cartItemsArray.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // If there is only one of this item remove it completely(clear) from the cart
  if (existingCartItem.quantity === 1) {
    return cartItemsArray.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id
    )
  }

  return cartItemsArray.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}
