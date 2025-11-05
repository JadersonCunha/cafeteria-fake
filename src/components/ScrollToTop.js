import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ScrollToTop = () => {
  const { showButton, scrollToTop } = useScrollToTop();

  if (!showButton) return null;

  return (
    <button id="btn-top" onClick={scrollToTop}>
      Voltar ao topo ⇧
    </button>
  );
};

export default ScrollToTop;