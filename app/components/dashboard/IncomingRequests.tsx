'use client';

import { useEffect, useState } from 'react';

interface Request {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function IncomingRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/friends/requests');
        if (!response.ok) throw new Error('Failed to fetch requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id: string, senderEmail: string) => {
    try {
      const response = await fetch(`/api/friends/requests/${id}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail }),
      });
      if (!response.ok) throw new Error('Failed to accept request');

      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (id: string, senderEmail: string) => {
    try {
      const response = await fetch(`/api/friends/requests/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderEmail }),
      });
      if (!response.ok) throw new Error('Failed to reject request');

      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Incoming Friend Requests</h2>
      {isLoading ? (
        // Skeleton Loader
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-600 rounded-md" />
                  <div className="w-40 h-4 bg-gray-600 rounded-md" />
                  <div className="w-24 h-3 bg-gray-600 rounded-md" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-20 h-10 bg-gray-600 rounded-lg" />
                  <div className="w-20 h-10 bg-gray-600 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">{request.sender.name}</p>
                  <p className="text-gray-400 text-sm">
                    {request.sender.email}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Sent: {request.createdAt}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      handleAccept(request.id, request.sender.email)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleReject(request.id, request.sender.email)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
