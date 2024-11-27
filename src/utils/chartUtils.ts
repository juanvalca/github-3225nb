// Colores optimizados para ECharts GL
export const getChartColors = () => [
  'rgba(255, 100, 100, 0.8)', // Rojo suave
  'rgba(100, 100, 255, 0.8)', // Azul suave
  'rgba(255, 255, 100, 0.8)', // Amarillo suave
  'rgba(100, 255, 100, 0.8)', // Verde suave
  'rgba(255, 100, 255, 0.8)', // Magenta suave
  'rgba(100, 255, 255, 0.8)'  // Cian suave
];

export const getValueBasedOpacity = (value: number) => {
  // Valor mínimo de opacidad 0.6, máximo 0.95
  return 0.6 + (value / 100) * 0.35;
};