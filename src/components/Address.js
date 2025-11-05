import React from 'react';

const Address = () => {
  return (
    <section className="address" id="address">
      <h2 className="title">Nosso <span>Endereço</span></h2>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838047.94067776!2d-52.648209097083885!3d-20.046517980366254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce590040ad22df%3A0x3b7c33ab7907293c!2sCaf%C3%A9%20Paulista%20Bar%20e%20Restaurante!5e0!3m2!1spt-BR!2sbr!4v1754938890438!5m2!1spt-BR!2sbr" 
        width="600" 
        height="450" 
        style={{border: 0}} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização da Cafeteria"
      />
    </section>
  );
};

export default Address;