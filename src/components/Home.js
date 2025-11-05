import React from 'react';
import backgroundImage from '../assets/xicaras_back.png';

const Home = () => {
  return (
    <div 
      className="home-container" 
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      <section id="home">
        <div className="content">
          <h3>O melhor café da região</h3>
          <p>Venha experimentar o nosso café especial, feito com grãos selecionados e um toque de amor.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;