'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });

  const [activeSection, setActiveSection] = useState('dashboard');

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>;
      case 'meet':
        return <h2 className="text-2xl font-bold">Meet Section</h2>;
      case 'previousMeets':
        return <h2 className="text-2xl font-bold">Previous Meets</h2>;
      case 'friends':
        return <h2 className="text-2xl font-bold">Friends List</h2>;
      case 'requests':
        return <h2 className="text-2xl font-bold">Incoming Requests</h2>;
      default:
        return <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      {/* Left Sidebar Navigation */}
      <div className="w-64 min-h-screen bg-gray-800 border-r border-gray-700 p-6">
        <div className="flex flex-col items-center mb-8">
          <img 
            src={session.user?.image ?? ''} 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2 border-gray-700 shadow-lg mb-3"
          />
          <span className="text-sm font-medium text-gray-300">{session.user?.email}</span>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'dashboard' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection('meet')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'meet' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Meet
          </button>
          <button
            onClick={() => setActiveSection('previousMeets')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'previousMeets' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Previous Meets
          </button>
          <button
            onClick={() => setActiveSection('friends')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'friends' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveSection('requests')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'requests' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Incoming Requests
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>

      {/* Right Sidebar */}
      
    </div>
  );
}
