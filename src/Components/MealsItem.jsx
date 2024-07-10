import React, { useContext } from "react";
import { currencyFormating } from "../utils/formating.js";
import Button from "./UI/Button.jsx";
import CartContext from "../Store/CartContext.jsx";

export default function MealsItem({ meal }) {
  const cartCtx = useContext(CartContext); // Accessing cart context for adding items to cart

  // Function to handle adding meal to cart
  function handleMealToCart() {
    cartCtx.addItem(meal); // Call to cart context to add the meal to cart
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} /> {/* Meal image */}
        <div>
          <h3>{meal.name}</h3> {/* Meal name */}
          <p className="meal-item-price">{currencyFormating.format(meal.price)}</p> {/* Formatted meal price */}
          <p className="meal-item-description">{meal.description}</p> {/* Meal description */}
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleMealToCart}>Add to Cart</Button> {/* Button to add meal to cart */}
        </p>
      </article>
    </li>
  );
}
