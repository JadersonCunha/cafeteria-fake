import React, { useState } from 'react';
import Modal from './Modal';

const About = () => {
  const [showModal, setShowModal] = useState(false);

  const aboutContent = (
    <>
      <img 
        id="logo-modal" 
        src="./Assets/logo.jpg" 
        width="150" 
        height="150" 
        alt="logo" 
      />
      <h2 className="title-box">A Essência do Café em Cada Grão</h2>
      <h3 className="subtitulo-box">The Coffee Barista Supply: Uma História de Paixão e Tradição</h3>
      <p>
        Desde 1923, o nome The Coffee Barista Supply é sinônimo de excelência e dedicação ao mundo do café.
        Nossas raízes profundas na história da cafeicultura nos tornaram mais do que apenas fornecedores; somos
        guardiões de uma tradição que valoriza a qualidade e a arte de uma bebida perfeita.<br/><br/>
        Tudo começou com a visão de uma família apaixonada por café, que se dedicou a selecionar os grãos mais
        raros e de alta qualidade. Nosso compromisso era simples: fornecer aos baristas, a verdadeira alma por
        trás da xícara, os melhores ingredientes para que pudessem criar obras-primas. Ao longo das décadas,
        mantivemos essa promessa, estabelecendo parcerias com fazendas sustentáveis e investindo em métodos de
        torra que realçam o perfil único de cada grão.<br/><br/>
        Hoje, quase um século depois, o The Coffee Barista Supply continua a ser o refúgio dos amantes de café.
        Além de sermos a fonte de confiança para baristas que buscam excelência, abrimos as portas de nossa
        própria casa: um espaço café onde a nossa história ganha vida. Aqui, cada cliente pode saborear o
        resultado de nossa paixão e tradição. Nossos grãos, cuidadosamente selecionados e torrados, são
        preparados por nossos próprios baristas, oferecendo uma experiência única e inesquecível.<br/><br/>
        Seja você um profissional em busca do grão perfeito ou um entusiasta que simplesmente quer desfrutar de
        uma xícara excepcional, o The Coffee Barista Supply é o seu destino. Venha nos visitar e faça parte de
        uma história que começou em 1923 e continua a ser escrita, um gole de cada vez.
      </p>
    </>
  );

  return (
    <>
      <section className="about" id="about">
        <h2 className="title">Sobre <span>Nós</span></h2>
        <div className="row">
          <div className="container-img">
            <img src="./Assets/about-img.jpg" width="400" height="400" alt="sobre nós" />
          </div>
          <div className="content">
            <h3>Quem somos nós?</h3>
            <p>Somos uma cafeteria apaixonada por café, oferecendo uma experiência única em cada xícara.</p>
            <p>Venha nos visitar e descubra o seu novo café favorito!</p>
            <button 
              className="btn" 
              onClick={() => setShowModal(true)}
            >
              Saiba mais
            </button>
          </div>
        </div>
      </section>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        content={aboutContent}
      />
    </>
  );
};

export default About;