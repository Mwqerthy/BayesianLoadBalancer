import React from 'react';
import { ScrollText } from 'lucide-react';
import { Request } from '../types';

interface RequestLogProps {
  requests: Request[];
}

export const RequestLog: React.FC<RequestLogProps> = ({ requests }) => {
  const logRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [requests]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <ScrollText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Request Log</h3>
      </div>
      <div
        ref={logRef}
        className="h-48 overflow-y-auto space-y-1 text-sm font-mono"
      >
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-2 bg-gray-50 rounded flex items-center justify-between"
          >
            <span>Request #{request.id}</span>
            <span className="text-blue-600">→ Server {request.serverId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};