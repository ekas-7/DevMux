'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Meeting {
  id: string;
  roomId: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  host: {
    name: string;
  };
  participants: {
    name: string;
  }[];
}

export default function PreviousMeets() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('/api/meetings');
        if (!response.ok) throw new Error('Failed to fetch meetings');
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Previous Meetings</h2>
      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-300">
                  Date: {format(new Date(meeting.startTime), 'PPP')}
                </p>
                <p className="text-gray-300">
                  Duration: {meeting.duration ? `${meeting.duration} minutes` : 'Ongoing'}
                </p>
                <div className="mt-2">
                  <p className="text-gray-400">Host: {meeting.host.name}</p>
                  <p className="text-gray-400">Participants:</p>
                  <ul className="list-disc list-inside">
                    {meeting.participants.map((participant, index) => (
                      <li key={index} className="text-gray-300">{participant.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 