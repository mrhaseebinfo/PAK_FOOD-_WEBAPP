import { createContext, useState } from 'react';

// Context initialization with default values and action functions
const UserProgressContext = createContext({
  progress: '', // Current progress state ("cart", "checkout")
  showCart: () => {}, // Function to show cart progress
  hideCart: () => {}, // Function to hide cart progress
  showCheckout: () => {}, // Function to show checkout progress
  hideCheckout: () => {}, // Function to hide checkout progress
});

// Provider component to wrap around other components and provide user progress context
export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState(''); // State to track user progress

  // Function to set progress to 'cart'
  function showCart() {
    setUserProgress('cart');
  }

  // Function to reset progress state
  function hideCart() {
    setUserProgress('');
  }

  // Function to set progress to 'checkout'
  function showCheckout() {
    setUserProgress('checkout');
  }

  // Function to reset progress state
  function hideCheckout() {
    setUserProgress('');
  }

  // Context value to be provided to consumers
  const userProgressCtx = {
    progress: userProgress, // Current progress state
    showCart, // Function to show cart progress
    hideCart, // Function to hide cart progress
    showCheckout, // Function to show checkout progress
    hideCheckout, // Function to hide checkout progress
  };

  // Providing context value to children components
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext; // Exporting UserProgressContext for use in other components
