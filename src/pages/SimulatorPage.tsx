import React from 'react';
import { ControlPanel } from '../components/ControlPanel';
import { ServerCard } from '../components/ServerCard';
import { RequestLog } from '../components/RequestLog';
import { Metrics } from '../components/Metrics';
import { useSimulation } from '../hooks/useSimulation';

export const SimulatorPage: React.FC = () => {
  const {
    servers,
    requests,
    settings,
    isRunning,
    setSettings,
    startSimulation,
    pauseSimulation,
  } = useSimulation();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <ControlPanel
        settings={settings}
        onSettingsChange={setSettings}
        onStart={startSimulation}
        onPause={pauseSimulation}
        isRunning={isRunning}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {servers.map((server) => (
          <ServerCard
            key={server.id}
            server={server}
            isOverloaded={server.cpuUsage > 80}
          />
        ))}
      </div>

      <Metrics servers={servers} />
      
      <RequestLog requests={requests} />
    </div>
  );
};