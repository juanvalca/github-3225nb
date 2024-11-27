import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ControlsProps {
  onToggleCompact: () => void;
  isCompact: boolean;
  onHighlightChange: (type: 'high' | 'low' | 'none') => void;
  highlightType: 'high' | 'low' | 'none';
  onFilterChange: (minValue: number) => void;
  filterValue: number;
}

export const Controls: React.FC<ControlsProps> = ({
  onToggleCompact,
  isCompact,
  onHighlightChange,
  highlightType,
  onFilterChange,
  filterValue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-800 rounded-lg"
    >
      <Button
        onClick={onToggleCompact}
        variant="secondary"
        icon={isCompact ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
      >
        {isCompact ? 'Vista Expandida' : 'Vista Compacta'}
      </Button>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
          className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm"
          value={highlightType}
          onChange={(e) => onHighlightChange(e.target.value as 'high' | 'low' | 'none')}
        >
          <option value="none">Sin destacar</option>
          <option value="high">Destacar altos</option>
          <option value="low">Destacar bajos</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Filtrar ≥</span>
        <input
          type="range"
          min="0"
          max="100"
          value={filterValue}
          onChange={(e) => onFilterChange(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-sm text-white">{filterValue}%</span>
      </div>
    </motion.div>
  );
};