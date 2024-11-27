import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEmoji, getBackgroundColor } from './utils';

interface EmojiCardProps {
  value: number;
  metricName: string;
  companyName: string;
  metricAverage: number;
  companyAverage: number;
  highlighted: boolean;
}

export const EmojiCard: React.FC<EmojiCardProps> = ({
  value,
  metricName,
  companyName,
  metricAverage,
  companyAverage,
  highlighted,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative perspective-1000">
      <motion.div
        className={`w-full h-full cursor-pointer transition-all duration-300 transform 
          ${highlighted ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -180 }}
              className={`rounded-lg p-4 text-center ${getBackgroundColor(value)}`}
            >
              <span className="text-2xl">{getEmoji(value)}</span>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -180 }}
              className="rounded-lg p-4 bg-gray-800 text-white"
            >
              <div className="space-y-2">
                <span className="text-2xl">{getEmoji(value)}</span>
                <div className="text-xs space-y-1">
                  <p className="font-semibold">{value}%</p>
                  <p>Media métrica: {metricAverage}%</p>
                  <p>Media empresa: {companyAverage}%</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};