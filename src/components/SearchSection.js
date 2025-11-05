import React, { useState } from 'react';
import { searchCoffeeInfo } from '../services/aiService';
import Modal from './Modal';

const SearchSection = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setShowModal(true);
    
    try {
      const response = await searchCoffeeInfo(query);
      setResult(response.replace(/\*/g, ''));
    } catch (error) {
      setResult("Erro ao buscar resposta da IA.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowModal(false);
    setResult('');
  };

  const modalContent = isLoading ? (
    <h2 className="title-box">Buscando...</h2>
  ) : (
    <>
      <h2 className="title-box">Resultado da Pesquisa</h2>
      <h3 className="subtitulo-box">
        Sua pergunta: <span style={{fontWeight: 'normal'}}>{query}</span>
      </h3>
      <div style={{textAlign: 'justify', marginTop: '1.5rem'}}>
        {result.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div id="search-cafe">
        <input
          type="text"
          id="input-cafe"
          placeholder="Pesquise sobre café..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div id="search-cafe-buttons">
          <button id="btn-cafe" onClick={handleSearch}>Buscar</button>
          <button id="btn-limpar" onClick={handleClear}>Limpar</button>
        </div>
      </div>
      
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        content={modalContent}
      />
    </>
  );
};

export default SearchSection;