import React from 'react';
import { Server as ServerIcon, Cpu, HardDrive, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Server } from '../types';
import { MetricBar } from './metrics/MetricBar';

interface ServerCardProps {
  server: Server;
  isOverloaded: boolean;
}

export const ServerCard: React.FC<ServerCardProps> = ({ server, isOverloaded }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`p-4 rounded-lg shadow-lg ${
        isOverloaded ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
      } border-2`}
    >
      <div className="flex items-center gap-2 mb-3">
        <ServerIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Server {server.id}</h3>
      </div>
      
      <div className="space-y-3">
        <MetricBar
          icon={<Cpu className="w-4 h-4 text-gray-600" />}
          value={server.cpuUsage}
          label="CPU"
          color={server.cpuUsage > 80 ? 'red' : 'blue'}
        />

        <MetricBar
          icon={<HardDrive className="w-4 h-4 text-gray-600" />}
          value={server.memoryUsage}
          label="Memory"
          color="green"
        />

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">
            Response Time: {server.responseTime}ms
          </span>
        </div>

        <div className="mt-2 text-sm font-medium text-gray-700">
          Requests Handled: {server.requestsHandled}
        </div>
      </div>
    </motion.div>
  );
};