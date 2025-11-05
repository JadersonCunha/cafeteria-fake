import React from 'react';

const Menu = ({ onAddToCart }) => {
  const menuItems = [
    { id: 1, name: 'Café coado', price: 15.99, oldPrice: 19.50, image: './Assets/menu-1.png' },
    { id: 2, name: 'Café coado', price: 15.50, oldPrice: 18.90, image: './Assets/menu-2.png' },
    { id: 3, name: 'Café coado', price: 13.60, oldPrice: 14.50, image: './Assets/menu-3.png' },
    { id: 4, name: 'Café coado', price: 12.50, oldPrice: 15.90, image: './Assets/menu-4.png' },
    { id: 5, name: 'Café coado', price: 14.50, oldPrice: 18.90, image: './Assets/menu-5.png' },
    { id: 6, name: 'Café coado', price: 11.20, oldPrice: 15.00, image: './Assets/menu-6.png' }
  ];

  return (
    <section className="menu" id="menu">
      <h2 className="title">Nosso <span>Menu</span></h2>
      <div className="box-container">
        {menuItems.map(item => (
          <div key={item.id} className="box">
            <img src={item.image} alt={`item-${item.id}`} />
            <h3>{item.name}</h3>
            <div className="price">
              R$ {item.price.toFixed(2)} <span>R$ {item.oldPrice.toFixed(2)}</span>
            </div>
            <button 
              className="btn add-to-cart" 
              onClick={() => onAddToCart(item)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;