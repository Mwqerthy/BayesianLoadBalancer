import React from 'react';
import { motion } from 'framer-motion';

interface MetricBarProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'red' | 'blue' | 'green';
}

const colorMap = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
};

export const MetricBar: React.FC<MetricBarProps> = ({ icon, value, label, color }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex-1">
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            className={`h-full rounded-full ${colorMap[color]}`}
            style={{ width: `${value}%` }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-sm text-gray-600">{value}% {label}</span>
      </div>
    </div>
  );
};