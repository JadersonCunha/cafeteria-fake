import React, { useState } from 'react';

const Cart = ({ isOpen, onClose, cart, onRemoveFromCart, onClearCart, totalPrice }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    nomeCartao: '',
    numeroCartao: '',
    validade: '',
    cvv: ''
  });

  const handlePayment = () => {
    onClose();
    setShowPayment(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowPayment(false);
    onClearCart();
    alert('Pagamento processado com sucesso!');
  };

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const cartContent = (
    <div className="cart-content">
      <span 
        className="fechar-modal" 
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '15px',
          top: '10px',
          fontSize: '3rem',
          color: 'var(--br)',
          cursor: 'pointer'
        }}
      >
        ×
      </span>
      <h2>Seu Carrinho</h2>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-info">
              <span>{item.name}</span>
              <span> x{item.quantity}</span>
            </div>
            <div className="cart-item-price">
              R$ {(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              className="remove-from-cart" 
              onClick={() => onRemoveFromCart(index)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <span>Total:</span>
        <span>R$ {totalPrice.toFixed(2)}</span>
      </div>
      <button className="btn" onClick={handlePayment}>
        Pagar
      </button>
    </div>
  );

  const paymentContent = (
    <div className="pagamento-content">
      <span 
        className="fechar-pagamento-modal"
        onClick={() => setShowPayment(false)}
      >
        ×
      </span>
      <h2>Informações de Pagamento</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="nomeCartao">Nome no Cartão:</label>
          <input
            type="text"
            name="nomeCartao"
            value={paymentData.nomeCartao}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroCartao">Número do Cartão:</label>
          <input
            type="text"
            name="numeroCartao"
            value={paymentData.numeroCartao}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="validade">Validade (MM/AA):</label>
          <input
            type="text"
            name="validade"
            value={paymentData.validade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Confirmar Pagamento
        </button>
      </form>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div 
          className="cart-modal" 
          style={{display: 'flex'}}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {cartContent}
        </div>
      )}
      
      {showPayment && (
        <div 
          className="pagamento-modal" 
          style={{display: 'flex'}}
          onClick={(e) => e.target === e.currentTarget && setShowPayment(false)}
        >
          {paymentContent}
        </div>
      )}
    </>
  );
};

export default Cart;