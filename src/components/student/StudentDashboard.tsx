import React, { useState } from 'react';
import { User, Home, DollarSign, AlertTriangle, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StudentProfile from './StudentProfile';
import StudentRoom from './StudentRoom';
import StudentMessFees from './StudentMessFees';
import StudentFines from './StudentFines';
import StudentComplaints from './StudentComplaints';

type Tab = 'profile' | 'room' | 'mess' | 'fines' | 'complaints';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'profile' as Tab, name: 'Profile', icon: User },
    { id: 'room' as Tab, name: 'My Room', icon: Home },
    { id: 'mess' as Tab, name: 'Mess Fees', icon: DollarSign },
    { id: 'fines' as Tab, name: 'Fines', icon: AlertTriangle },
    { id: 'complaints' as Tab, name: 'Complaints', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <StudentProfile />;
      case 'room':
        return <StudentRoom />;
      case 'mess':
        return <StudentMessFees />;
      case 'fines':
        return <StudentFines />;
      case 'complaints':
        return <StudentComplaints />;
      default:
        return <StudentProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Student Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`bg-white w-64 shadow-sm border-r border-gray-200 fixed inset-y-0 left-0 z-50 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out lg:static lg:inset-0`}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 px-4 py-6 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}