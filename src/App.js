import React, { useState } from 'react';
import { useCart } from './hooks/useCart';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Review from './components/Review';
import Address from './components/Address';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();
  
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div className="App">
      <Header 
        cartCount={getTotalItems()} 
        onCartClick={handleCartClick}
      />
      <Home />
      <About />
      <Menu onAddToCart={handleAddToCart} />
      <Review />
      <Address />
      <Footer />
      <ScrollToTop />
      
      <Cart
        isOpen={showCart}
        onClose={handleCloseCart}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}

export default App;