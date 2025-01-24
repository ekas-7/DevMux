'use client';

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Users,
  UserPlus,
  UserCheck,
  History,
  LogOut,
  User,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import Meet from '../components/dashboard/Meet';
import PreviousMeets from '../components/dashboard/PreviousMeets';
import Friends from '../components/dashboard/Friends';
import IncomingRequests from '../components/dashboard/IncomingRequests';
import UserSearch from '../components/dashboard/UserSearch';

type NavigationItem = {
  id: string;
  label: string;
  icon: FC;
  description: string;
};

const navigationItems: NavigationItem[] = [
  { 
    id: 'meet', 
    label: 'New Meeting', 
    icon: Video,
    description: 'Start or join a video meeting'
  },
  { 
    id: 'friends', 
    label: 'Friends', 
    icon: Users,
    description: 'Manage your connections'
  },
  { 
    id: 'search', 
    label: 'Add Friends', 
    icon: UserPlus,
    description: 'Find and connect with others'
  },
  { 
    id: 'requests', 
    label: 'Friend Requests', 
    icon: UserCheck,
    description: 'Review pending invitations'
  },
  { 
    id: 'previous', 
    label: 'Previous Meetings', 
    icon: History,
    description: 'Access your meeting history'
  },
];

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

  const renderComponent = () => {
    const components = {
      meet: Meet,
      friends: Friends,
      requests: IncomingRequests,
      search: UserSearch,
      previous: PreviousMeets,
    };
    
    const Component = components[activeComponent as keyof typeof components] || Meet;
    return <Component />;
  };

  const Sidebar: FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col h-full ${isMobile ? '' : 'justify-between'}`}
    >
      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex items-center space-x-4 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 backdrop-blur-xl">
          {session?.user?.image ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={session.user.image}
              alt="Profile"
              className="w-14 h-14 rounded-full ring-2 ring-purple-500/50 shadow-lg"
            />
          ) : (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center ring-2 ring-purple-500/50 shadow-lg"
            >
              <User className="w-7 h-7 text-white" />
            </motion.div>
          )}
          <div className="flex flex-col truncate">
            <span className="text-white text-lg font-semibold truncate">
              {session?.user?.name}
            </span>
            <span className="text-purple-200/70 text-sm truncate">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation */}
      <nav className="flex-1 ">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                onClick={() => {
                  setActiveComponent(item.id);
                  if (isMobile) setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeComponent === item.id
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white shadow-lg scale-[1.02] font-medium border border-purple-500/20'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:scale-[1.01]'
                }`}
              >
                <div className={`flex items-center space-x-3 relative z-10 ${
                  activeComponent === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}>
                  <item.icon  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300">
                      {item.description}
                    </span>
                  </div>
                </div>
                {activeComponent === item.id && (
                  <ChevronRight className="w-5 h-5 ml-auto text-purple-400 animate-pulse" />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mt-4"
      >
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 text-red-400 px-4 py-3.5 rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/30 group"
        >
          <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-medium">Logout</span>
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 bg-black/40 backdrop-blur-xl h-full p-6 flex-shrink-0 border-r border-gray-800/50">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-xl z-50 border-b border-gray-800/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-9 h-9 rounded-xl shadow-lg" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <span className="text-white font-medium">{session?.user?.name}</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-xl pt-16"
          >
            <div className="h-full p-6">
              <Sidebar isMobile />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 md:p-8 p-4 overflow-y-auto bg-black/20 md:mt-0 mt-16"
      >
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-800/50">
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {renderComponent()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}