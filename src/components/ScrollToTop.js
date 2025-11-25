import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ScrollToTop = () => {
  const { showButton, scrollToTop } = useScrollToTop();

  if (!showButton) return null;

  return (
    <button
      id="btn-top"
      className="btn-top-small"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      TOPO ↑
    </button>
  );
};

export default ScrollToTop;