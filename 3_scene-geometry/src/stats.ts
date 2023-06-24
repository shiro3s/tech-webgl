import Stats from 'stats.js';

export const initStats = () => {
  const stats = new Stats();
  stats.showPanel(0);

  document.body.appendChild(stats.dom);

  return {
    stats,
  };
};
