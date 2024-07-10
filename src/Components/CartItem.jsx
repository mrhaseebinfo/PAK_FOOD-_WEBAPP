import React from "react";
import { currencyFormating } from "../utils/formating";

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      {/* Displaying item details with formatted price */}
      <p>
        {name} - {quantity} x {currencyFormating.format(price)}
      </p>
      {/* Actions for the item (increase, decrease, and display current quantity) */}
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button> {/* Button to decrease quantity */}
        <button>{quantity}</button> {/* Display current quantity */}
        <button onClick={onIncrease}>+</button> {/* Button to increase quantity */}
      </p>
    </li>
  );
}

