export interface Server {
  id: number;
  cpuUsage: number;
  memoryUsage: number;
  requestsHandled: number;
  responseTime: number;
}

export interface SimulationSettings {
  serverCount: number;
  requestCount: number;
  speed: 'Fast' | 'Normal' | 'Slow';
}

export interface Request {
  id: number;
  timestamp: number;
  serverId: number;
}