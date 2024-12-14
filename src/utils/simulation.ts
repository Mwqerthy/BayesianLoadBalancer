export const SPEED_MAP = {
  Fast: 100,
  Normal: 500,
  Slow: 1000,
} as const;

export const generateRandomMetrics = () => ({
  cpuUsage: Math.floor(Math.random() * 30),
  memoryUsage: Math.floor(Math.random() * 40),
  responseTime: Math.floor(Math.random() * 100) + 50,
});