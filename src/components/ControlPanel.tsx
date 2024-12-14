import React from 'react';
import { Play, Pause } from 'lucide-react';
import { SimulationSettings } from '../types';

interface ControlPanelProps {
  settings: SimulationSettings;
  onSettingsChange: (settings: SimulationSettings) => void;
  onStart: () => void;
  onPause: () => void;
  isRunning: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onSettingsChange,
  onStart,
  onPause,
  isRunning,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Simulation Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Servers
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={settings.serverCount}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                serverCount: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600">{settings.serverCount}</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Requests
          </label>
          <select
            value={settings.requestCount}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                requestCount: parseInt(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Simulation Speed
          </label>
          <select
            value={settings.speed}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                speed: e.target.value as SimulationSettings['speed'],
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Fast">Fast</option>
            <option value="Normal">Normal</option>
            <option value="Slow">Slow</option>
          </select>
        </div>
      </div>

      <button
        onClick={isRunning ? onPause : onStart}
        className={`mt-4 px-4 py-2 rounded-md text-white flex items-center gap-2 ${
          isRunning
            ? 'bg-yellow-500 hover:bg-yellow-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-4 h-4" /> Pause
          </>
        ) : (
          <>
            <Play className="w-4 h-4" /> Start Simulation
          </>
        )}
      </button>
    </div>
  );
};