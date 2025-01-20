'use client';

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  Video,
  Users,
  UserPlus,
  UserCheck,
  History,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";
import Meet from '../components/dashboard/Meet';
import PreviousMeets from '../components/dashboard/PreviousMeets';
import Friends from '../components/dashboard/Friends';
import IncomingRequests from '../components/dashboard/IncomingRequests';
import UserSearch from '../components/dashboard/UserSearch';

export default function Dashboard() {
  const { data: session } = useSession();
  const [activeComponent, setActiveComponent] = useState('meet');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navigationItems = [
    { id: 'meet', label: 'New Meeting', icon: Video },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'search', label: 'Add Friends', icon: UserPlus },
    { id: 'requests', label: 'Friend Requests', icon: UserCheck },
    { id: 'previous', label: 'Previous Meetings', icon: History },
  ];

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

  const Sidebar = ({ isMobile = false }) => (
    <div className={`flex flex-col h-full ${isMobile ? '' : 'justify-between'}`}>
      {/* Profile Section */}
      <div className="mb-8 flex items-center space-x-4 bg-gray-800/50 p-4 rounded-xl">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-12 h-12 rounded-full ring-2 ring-purple-500"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center ring-2 ring-purple-500">
            <User className="w-6 h-6 text-purple-200" />
          </div>
        )}
        <div className="flex flex-col truncate">
          <span className="text-purple-50 text-lg font-medium truncate">
            {session?.user?.name}
          </span>
          <span className="text-purple-200/70 text-sm truncate">
            {session?.user?.email}
          </span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveComponent(item.id);
                  if (isMobile) setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeComponent === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 scale-[1.02] font-medium'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:scale-[1.01]'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeComponent === item.id ? 'animate-pulse' : ''}`} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-3 rounded-xl transition-colors border border-red-500/20 hover:border-red-500/30"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 bg-black/40 backdrop-blur-md h-full p-6 flex-shrink-0 border-r border-gray-800">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <User className="w-8 h-8 text-purple-200" />
            )}
            <span className="text-purple-50 font-medium">{session?.user?.name}</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-purple-50 hover:bg-gray-800/50 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-md pt-16">
          <div className="h-full p-6">
            <Sidebar isMobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:p-8 p-4 overflow-y-auto bg-black/20 md:mt-0 mt-16">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl border border-gray-800">
          <div className="text-purple-50">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}
