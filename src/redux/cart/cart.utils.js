/**
 *
 * @param {*} cartItems
 * @param {*} cartItemToAdd
 * @return {array}
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
