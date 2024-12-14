import { useState, useCallback, useRef, useEffect } from 'react';
import { Server, SimulationSettings, Request } from '../types';
import { SPEED_MAP, generateRandomMetrics } from '../utils/simulation';
import { BayesianLoadBalancer } from '../utils/bayesianLoadBalancer';

export const useSimulation = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState<SimulationSettings>({
    serverCount: 3,
    requestCount: 100,
    speed: 'Normal',
  });

  const requestCounter = useRef(0);
  const intervalRef = useRef<number>();
  const loadBalancerRef = useRef<BayesianLoadBalancer | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    initializeServers();
  }, [settings.serverCount]);

  const initializeServers = useCallback(() => {
    const newServers: Server[] = Array.from({ length: settings.serverCount }, (_, i) => ({
      id: i + 1,
      ...generateRandomMetrics(),
      requestsHandled: 0,
    }));
    setServers(newServers);
    setRequests([]);
    requestCounter.current = 0;
    loadBalancerRef.current = new BayesianLoadBalancer(newServers);
  }, [settings.serverCount]);

  const selectServer = useCallback(() => {
    if (!loadBalancerRef.current) return servers[0];
    return loadBalancerRef.current.selectServer(servers);
  }, [servers]);

  const processRequest = useCallback(() => {
    if (requestCounter.current >= settings.requestCount) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const selectedServer = selectServer();
    if (!selectedServer) return;

    requestCounter.current += 1;
    const newRequest: Request = {
      id: requestCounter.current,
      timestamp: Date.now(),
      serverId: selectedServer.id,
    };

    const success = selectedServer.cpuUsage < 80;
    loadBalancerRef.current?.updateStats(selectedServer.id, success);

    setRequests((prev) => [...prev, newRequest]);
    setServers((prev) =>
      prev.map((server) => {
        if (server.id === selectedServer.id) {
          return {
            ...server,
            requestsHandled: server.requestsHandled + 1,
            cpuUsage: Math.min(100, server.cpuUsage + Math.random() * 10),
            responseTime: Math.max(50, server.responseTime + Math.random() * 20 - 10),
          };
        }
        return {
          ...server,
          cpuUsage: Math.max(0, server.cpuUsage - Math.random() * 5),
          responseTime: Math.max(50, server.responseTime + Math.random() * 10 - 5),
        };
      })
    );
  }, [settings.requestCount, selectServer]);

  const startSimulation = useCallback(() => {
    if (isRunning) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only initialize servers if they haven't been initialized yet
    if (servers.length === 0) {
      initializeServers();
    }

    setIsRunning(true);
    intervalRef.current = window.setInterval(
      processRequest,
      SPEED_MAP[settings.speed]
    );
  }, [isRunning, settings.speed, servers.length, initializeServers, processRequest]);

  const pauseSimulation = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  return {
    servers,
    requests,
    settings,
    isRunning,
    setSettings,
    startSimulation,
    pauseSimulation,
  };
};