import { Server } from '../types';

interface ServerStats {
  successCount: number;
  totalRequests: number;
  alpha: number;
  beta: number;
}

/**
 * Bayesian Load Balancer Implementation
 * 
 * This implementation uses a Beta distribution to model the probability of successful request handling
 * for each server. The Beta distribution is conjugate to the Bernoulli distribution, making it
 * ideal for modeling binary outcomes (success/failure) with uncertainty.
 * 
 * Key concepts:
 * - Alpha (α): Represents successful requests + prior
 * - Beta (β): Represents failed requests + prior
 * - The mean of the distribution is α/(α+β)
 * - Higher α+β indicates more certainty in the estimate
 */
export class BayesianLoadBalancer {
  private serverStats: Map<number, ServerStats> = new Map();
  
  // Prior parameters (starting beliefs)
  private readonly PRIOR_ALPHA = 1;
  private readonly PRIOR_BETA = 1;
  
  // Thresholds for health calculation
  private readonly CPU_THRESHOLD = 80;
  private readonly RESPONSE_TIME_THRESHOLD = 200;

  constructor(servers: Server[]) {
    this.initializeStats(servers);
  }

  private initializeStats(servers: Server[]) {
    servers.forEach(server => {
      this.serverStats.set(server.id, {
        successCount: 0,
        totalRequests: 0,
        alpha: this.PRIOR_ALPHA,
        beta: this.PRIOR_BETA
      });
    });
  }

  /**
   * Calculate server health score using Thompson Sampling
   * This gives us an exploration-exploitation trade-off
   */
  private calculateServerScore(server: Server): number {
    const stats = this.serverStats.get(server.id);
    if (!stats) return 0;

    // Sample from beta distribution
    const sample = this.sampleBeta(stats.alpha, stats.beta);
    
    // Adjust score based on current metrics
    const cpuPenalty = server.cpuUsage > this.CPU_THRESHOLD ? 0.5 : 1;
    const responsePenalty = server.responseTime > this.RESPONSE_TIME_THRESHOLD ? 0.8 : 1;
    
    return sample * cpuPenalty * responsePenalty;
  }

  /**
   * Sample from Beta distribution using Inverse Transform Sampling
   * This is a simplified implementation for demonstration
   */
  private sampleBeta(alpha: number, beta: number): number {
    const x = Math.random();
    const y = Math.random();
    
    // Using the ratio of gamma variates
    const gamma1 = -Math.log(1 - x);
    const gamma2 = -Math.log(1 - y);
    
    return gamma1 / (gamma1 + gamma2);
  }

  /**
   * Update server statistics based on request outcome
   */
  public updateStats(serverId: number, success: boolean) {
    const stats = this.serverStats.get(serverId);
    if (!stats) return;

    stats.totalRequests++;
    if (success) {
      stats.successCount++;
      stats.alpha += 1;
    } else {
      stats.beta += 1;
    }
  }

  /**
   * Select the best server using Thompson Sampling
   */
  public selectServer(servers: Server[]): Server {
    let bestScore = -1;
    let selectedServer = servers[0];

    for (const server of servers) {
      const score = this.calculateServerScore(server);
      if (score > bestScore) {
        bestScore = score;
        selectedServer = server;
      }
    }

    return selectedServer;
  }

  /**
   * Get success probability for a server
   */
  public getServerSuccessProbability(serverId: number): number {
    const stats = this.serverStats.get(serverId);
    if (!stats) return 0;
    return stats.alpha / (stats.alpha + stats.beta);
  }
}