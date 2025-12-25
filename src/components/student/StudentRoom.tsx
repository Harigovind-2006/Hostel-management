import React from 'react';
import { Home, User, Package, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudents, mockRooms } from '../../data/mockData';

export default function StudentRoom() {
  const { user } = useAuth();
  
  const student = mockStudents.find(s => s.id === user?.studentId);
  const room = student?.roomNumber ? mockRooms.find(r => r.roomNumber === student.roomNumber) : null;

  const getStudentName = (studentId: string) => {
    const s = mockStudents.find(student => student.id === studentId);
    return s ? s.name : 'Unknown';
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'fair':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'poor':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!student?.roomNumber) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Home className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Room Assigned</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't been assigned a room yet. Please contact the administration.
          </p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Room Information Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Unable to find information for room {student.roomNumber}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Room</h2>
        <p className="text-gray-600">View your room details and inventory</p>
      </div>

      {/* Room Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">Room {room.roomNumber}</h3>
              <p className="text-blue-100">Floor {room.floor} • {room.type} room</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Room Type</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{room.type}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Capacity</p>
              <p className="text-lg font-bold text-gray-900">{room.capacity} students</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600">Current Occupancy</p>
              <p className="text-lg font-bold text-gray-900">{room.occupied}/{room.capacity}</p>
            </div>
          </div>

          {/* Roommates */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Roommates</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.students.map(studentId => {
                const isCurrentUser = studentId === user?.studentId;
                return (
                  <div key={studentId} className={`rounded-lg p-4 border ${
                    isCurrentUser ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                      {getStudentName(studentId)} {isCurrentUser && '(You)'}
                    </p>
                    <p className={`text-sm ${isCurrentUser ? 'text-blue-600' : 'text-gray-600'}`}>
                      Student ID: {studentId}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Room Inventory */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Room Inventory</span>
            </h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Checked
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {room.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getConditionIcon(item.condition)}
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.lastChecked).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}