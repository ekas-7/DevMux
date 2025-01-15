'use client';

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage('Please enter a search term');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(searchTerm.trim())}`);
      if (!response.ok) throw new Error('Failed to search users');
      const data = await response.json();
      setSearchResults(data);
      if (data.length === 0) {
        setMessage('No users found');
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setMessage('Failed to search users');
    } finally {
      setIsLoading(false);
    }
  };

  const sendFriendRequest = async (userEmail: string) => {
    try {
      const response = await fetch('/api/friends/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverEmail: userEmail }),
      });
      
      if (!response.ok) throw new Error('Failed to send friend request');
      
      // Remove user from search results and show success message
      setSearchResults(results => results.filter(user => user.email !== userEmail));
      setMessage('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
      setMessage('Failed to send friend request');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search users by name or email"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-2">
          {searchResults.map((user) => (
            <div key={user.email} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <div>
                <p key={`${user.id}-name`} className="text-white">{user.name}</p>
                <p key={`${user.id}-email`} className="text-gray-400 text-sm">{user.email}</p>
              </div>
              <button
                onClick={() => sendFriendRequest(user.email)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
              >
                Add Friend
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 