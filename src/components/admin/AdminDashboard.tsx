import React, { useState } from 'react';
import { Users, Home, DollarSign, AlertTriangle, MessageSquare, Calendar, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StudentManagement from './StudentManagement';
import RoomManagement from './RoomManagement';
import MessFeeManagement from './MessFeeManagement';
import FineManagement from './FineManagement';
import ComplaintManagement from './ComplaintManagement';
import AttendanceManagement from './AttendanceManagement';
import { mockStudents, mockRooms, mockMessFees, mockFines, mockComplaints } from '../../data/mockData';

type Tab = 'students' | 'rooms' | 'mess' | 'fines' | 'complaints' | 'attendance';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('students');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'students' as Tab, name: 'Students', icon: Users, count: mockStudents.length },
    { id: 'rooms' as Tab, name: 'Rooms', icon: Home, count: mockRooms.length },
    { id: 'mess' as Tab, name: 'Mess Fees', icon: DollarSign, count: mockMessFees.filter(f => !f.paid).length },
    { id: 'fines' as Tab, name: 'Fines', icon: AlertTriangle, count: mockFines.filter(f => !f.paid).length },
    { id: 'complaints' as Tab, name: 'Complaints', icon: MessageSquare, count: mockComplaints.filter(c => c.status === 'pending').length },
    { id: 'attendance' as Tab, name: 'Attendance', icon: Calendar, count: 0 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagement />;
      case 'rooms':
        return <RoomManagement />;
      case 'mess':
        return <MessFeeManagement />;
      case 'fines':
        return <FineManagement />;
      case 'complaints':
        return <ComplaintManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      default:
        return <StudentManagement />;
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
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </div>
                    {tab.count > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {tab.count}
                      </span>
                    )}
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