import React, { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import { currencyFormating } from "../utils/formating.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../Store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Checkout component for handling the checkout process.
 * Uses modal to display checkout form and handles order submission.
 * @returns {JSX.Element} Checkout component
 */
export default function CheckOut() {
  const cartCtx = useContext(CartContext); // Accessing cart context for items
  const userProgressCtx = useContext(UserProgressContext); // Accessing user progress context

  // HTTP request hook for sending order data
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  // Calculate total amount of the cart items
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Function to close the checkout modal
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  // Function to handle finishing the checkout process
  function handleFinish() {
    userProgressCtx.hideCheckout(); // Hide the checkout modal
    cartCtx.clearCart(); // Clear the cart items
    clearData(); // Clear any data from the HTTP request
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.target);
    const customData = Object.fromEntries(formData.entries()); // Convert FormData to plain object

    // Send HTTP request to submit the order
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customData,
        },
      })
    );
  }

  // Actions to be rendered based on the state of order submission
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // Display loading message while sending order data
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // Display success message when order is successfully submitted
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email and SMS within
          the next few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  // Render checkout form if order submission is not completed
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormating.format(cartTotal)}</p>

        {/* Input fields for customer information */}
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Contact #" type="text" id="contact" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {/* Display error message if order submission fails */}
        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">
          {/* Render actions based on the current state */}
          {actions}
        </p>
      </form>
    </Modal>
  );
}
