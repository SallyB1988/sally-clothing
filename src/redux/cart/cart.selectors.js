import { createSelector } from 'reselect';

// input selectors return a piece of the state. (Not usually this big of a piece..)
const selectCart = state => state.cart;
// could also have others 
// const selectUsers = state => state.users;

export const selectCartItems = createSelector(
  // [selectCart, selectUsers]
  [selectCart],
  (cart) => cart.cartItems    // runs this function on the array
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],    // this is cartItems
  cartItems =>
    cartItems.reduce(
      (total, cartItem) =>
        (total + cartItem.quantity),
      0
    )
)

// when calling selectCartItemsCount (as seen in cart-icon.jsx) it looks like:
// selectCartItemsCount(state)
//   this calls the selectCartItemsCount selector which calls the
//       selectCartItems which then uses selectCart which finally
//       uses the whole state to return state.cart