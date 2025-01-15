'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Meet from '../components/dashboard/Meet';
import PreviousMeets from '../components/dashboard/PreviousMeets';
import Friends from '../components/dashboard/Friends';
import IncomingRequests from '../components/dashboard/IncomingRequests';
import UserSearch from '../components/dashboard/UserSearch';

export default function Dashboard() {
  const { data: session } = useSession();
  const [activeComponent, setActiveComponent] = useState('meet');

  const handleLogout = async () => {
    try {
      await fetch('/api/users/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'offline' }),
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
    await signOut({ callbackUrl: '/' });
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'meet':
        return <Meet />;
      case 'friends':
        return <Friends />;
      case 'requests':
        return <IncomingRequests />;
      case 'search':
        return <UserSearch />;
      case 'previous':
        return <PreviousMeets />;
      default:
        return <Meet />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 h-full p-4 flex flex-col">
        <div className="mb-8 flex items-center space-x-3">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-white text-lg">
                {session?.user?.name?.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-gray-300 text-lg truncate">
              {session?.user?.name}
            </span>
            <span className="text-gray-400 text-sm truncate">
              {session?.user?.email}
            </span>
          </div>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveComponent('meet')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeComponent === 'meet' ? 'bg-blue-600' : 'hover:bg-gray-700'
                } text-white`}
              >
                New Meeting
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('friends')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeComponent === 'friends' ? 'bg-blue-600' : 'hover:bg-gray-700'
                } text-white`}
              >
                Friends
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('search')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeComponent === 'search' ? 'bg-blue-600' : 'hover:bg-gray-700'
                } text-white`}
              >
                Add Friends
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('requests')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeComponent === 'requests' ? 'bg-blue-600' : 'hover:bg-gray-700'
                } text-white`}
              >
                Friend Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('previous')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeComponent === 'previous' ? 'bg-blue-600' : 'hover:bg-gray-700'
                } text-white`}
              >
                Previous Meetings
              </button>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderComponent()}
      </div>
    </div>
  );
}
