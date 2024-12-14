import React from 'react';
import { Brain, Cpu, Workflow, Rocket, GitBranch } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-blue-600" />,
    title: "Bayesian Load Balancing",
    description: "Our core algorithm uses Bayesian inference to make intelligent server selection decisions. By maintaining a probabilistic model of server performance, we can optimally distribute requests while adapting to changing conditions."
  },
  {
    icon: <Workflow className="w-8 h-8 text-green-600" />,
    title: "Real-time Adaptation",
    description: "The system continuously learns from request outcomes, updating its probability distributions to reflect the current state of each server. This enables dynamic load balancing that improves over time."
  },
  {
    icon: <Cpu className="w-8 h-8 text-purple-600" />,
    title: "Performance Metrics",
    description: "Comprehensive monitoring of CPU usage, memory utilization, and response times helps identify potential bottlenecks and ensures optimal resource allocation."
  }
];

const futurePlans = [
  {
    title: "Reinforcement Learning Integration",
    description: "Future versions will incorporate deep reinforcement learning to handle more complex scenarios and optimize for multiple objectives simultaneously."
  },
  {
    title: "Advanced Prediction Models",
    description: "Implementation of time-series forecasting to predict server load patterns and proactively adjust distribution strategies."
  },
  {
    title: "Multi-region Support",
    description: "Extended functionality to handle geographic distribution of requests and optimize for latency across different regions."
  }
];

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Intelligent Load Balancing with Bayesian Learning
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A next-generation load balancer that combines Bayesian inference with real-time adaptation 
          to optimize request distribution across your server infrastructure.
        </p>
      </div>

      {/* Technical Overview */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Overview</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Our load balancer implements Thompson Sampling, a Bayesian approach that maintains 
            probability distributions over server performance metrics. This enables:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
  <li><strong>Better Adaptation to Changing Conditions:</strong> Unlike <strong>round-robin</strong> or <strong>least-connections</strong>, it updates server performance based on real-time data.</li>
  <li><strong>Effective Exploration and Exploitation:</strong> It balances exploration and exploitation, unlike <strong>fixed-weight</strong> methods that may favor a few servers.</li>
  <li><strong>Superior Uncertainty Handling:</strong> Unlike <strong>threshold-based</strong> methods, it accounts for uncertainty in server performance.</li>
  <li><strong>Comprehensive Health Metrics:</strong> It integrates metrics like CPU usage and response time, unlike methods like <strong>least response time</strong> that focus on a single factor.</li>
  <li><strong>Data-Driven Decisions:</strong> It uses <strong>Bayesian inference</strong> to make decisions based on historical data, unlike <strong>static rules</strong> which rely on predefined conditions.</li>
</ul>

        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Development */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Future Development</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futurePlans.map((plan) => (
            <div key={plan.title} className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
              <p className="text-gray-600">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Details */}
      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <GitBranch className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Implementation Details</h2>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            The current implementation uses a Beta-Bernoulli conjugate prior model to track 
            server success rates. Each server's performance is modeled using a Beta distribution, 
            which is updated based on request outcomes. The load balancer uses Thompson Sampling 
            to make routing decisions, providing an optimal balance between exploring server 
            performance and exploiting known good servers.
          </p>
        </div>
      </div>
    </div>
  );
};