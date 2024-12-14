import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Server } from '../types';
import { ChartCard } from './metrics/ChartCard';

interface MetricsProps {
  servers: Server[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#a4de6c',
  '#d0ed57',
];

export const Metrics: React.FC<MetricsProps> = ({ servers }) => {
  const pieData = servers.map((server) => ({
    name: `Server ${server.id}`,
    value: server.requestsHandled,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartCard title="CPU Usage by Server">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={servers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" name="Server" />
            <YAxis name="CPU Usage (%)" />
            <Tooltip />
            <Bar dataKey="cpuUsage" fill="#0088FE" name="CPU Usage" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Request Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};