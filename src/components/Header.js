import React from 'react';
import SearchSection from './SearchSection';

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <section>
        <a href="#home" className="logo">
          <img src="./Assets/logo.jpg" width="150" height="150" alt="logo" />
        </a>
        <SearchSection />
        <nav className="nav-bar">
          <a href="#home">Home</a>
          <a href="#about">Sobre</a>
          <a href="#menu">Menu</a>
          <a href="#review">Avaliações</a>
          <a href="#address">Endereço</a>
        </nav>
        <div className="icons">
          <div className="cart-container">
            <img 
              id="cart-icon" 
              src="./Assets/cart.svg" 
              alt="cart" 
              style={{cursor: 'pointer'}}
              onClick={onCartClick}
            />
            {cartCount > 0 && (
              <span id="cart-count" style={{display: 'block'}}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;