export const getEmoji = (value: number): string => {
  if (value >= 90) return '😁';
  if (value >= 70) return '😊';
  if (value >= 50) return '😐';
  if (value >= 30) return '😕';
  return '😢';
};

export const getBackgroundColor = (value: number): string => {
  if (value >= 90) return 'bg-green-500';
  if (value >= 70) return 'bg-lime-500';
  if (value >= 50) return 'bg-yellow-500';
  if (value >= 30) return 'bg-orange-500';
  return 'bg-red-500';
};

export const calculateAverages = (data: any[], metrics: string[]) => {
  const columnAverages = metrics.map(metric => {
    const sum = data.reduce((acc, row) => {
      const value = parseInt(row[metric] || '0', 10);
      return acc + value;
    }, 0);
    return Math.round(sum / data.length);
  });

  const rowAverages = data.map(row => {
    const sum = metrics.reduce((acc, metric) => {
      const value = parseInt(row[metric] || '0', 10);
      return acc + value;
    }, 0);
    return Math.round(sum / metrics.length);
  });

  return { columnAverages, rowAverages };
};