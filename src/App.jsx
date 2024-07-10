import Cart from "./Components/Cart.jsx";
import CheckOut from "./Components/CheckOut.jsx";
import Footer from "./Components/Footer.jsx";
import Header from "./Components/Header";
import Meals from "./Components/Meals.jsx";
import { CartContextProvider } from "./Store/CartContext.jsx";
import { UserProgressContextProvider } from "./Store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <CheckOut/>
      </CartContextProvider>
      <Footer />
    </UserProgressContextProvider>
  );
}

export default App;
