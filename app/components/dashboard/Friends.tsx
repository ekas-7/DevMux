'use client';

import { useEffect, useState } from 'react';
import UserSearch from './UserSearch';

interface Friend {
  id: string;
  name: string;
  email: string;
  status: string;
}

export default function Friends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends');
        if (!response.ok) throw new Error('Failed to fetch friends');
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const sendMeetingInvite = async (friendId: string) => {
    try {
      const newRoomId = Math.random().toString(36).substring(7);
      
      // Create the meeting
      const meetingResponse = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: newRoomId }),
      });

      if (!meetingResponse.ok) throw new Error('Failed to create meeting');
      const meeting = await meetingResponse.json();

      // Send the invitation
      const inviteResponse = await fetch('/api/meetings/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: meeting.id,
          friendId,
        }),
      });

      if (!inviteResponse.ok) throw new Error('Failed to send invitation');
      
      // Redirect to the meeting room
      window.location.href = `/meeting/${newRoomId}`;
    } catch (error) {
      console.error('Error sending meeting invite:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Friends</h2>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {showSearch ? 'Hide Search' : 'Add Friends'}
        </button>
      </div>

      {showSearch && (
        <div className="mb-6">
          <UserSearch />
        </div>
      )}

      <div className="grid gap-4">
        {friends.map((friend) => (
          <div key={friend.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
              }`} />
              <div>
                <p className="text-white">{friend.name}</p>
                <p className="text-gray-400 text-sm">{friend.email}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => sendMeetingInvite(friend.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Invite to Meet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}