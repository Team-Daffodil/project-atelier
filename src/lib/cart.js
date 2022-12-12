export const totalPrice = (items) => {
  return items.reduce(
    (acc, item) => (acc += item.product.price * item.quantity),
    0
  )
}
