import React, { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormating } from "../utils/formating.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../Store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";


/**
 * Cart component
 * @returns {JSX.Element} Cart component
 */
export default function Cart() {
  const cartCtx = useContext(CartContext); // Accessing cart context for items
  const userProgressCtx = useContext(UserProgressContext); // Accessing user progress context

  // Calculate total price of items in the cart
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Function to handle closing the cart modal
  function handleCloseCart() {
    userProgressCtx.hideCart(); // Call to context to hide the cart
  }

  // Function to handle navigating to checkout
  function handleGoToCheckout() {
    userProgressCtx.showCheckout(); // Call to context to show checkout
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"} // Show modal only if progress is 'cart'
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null} // Close modal action
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)} // Function to add item
            onDecrease={() => cartCtx.removeItem(item.id)} // Function to remove item
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormating.format(cartTotal)}</p> {/* Display total cart value */}
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button> {/* Close button */}
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>GO to Checkout</Button> // Checkout button if items in cart
        )}
      </p>
    </Modal>
  );
}