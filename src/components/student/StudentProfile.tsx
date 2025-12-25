import React from 'react';
import { User, Mail, Phone, Book, Calendar, Home, Users, Contact } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudents } from '../../data/mockData';

export default function StudentProfile() {
  const { user } = useAuth();
  
  const student = mockStudents.find(s => s.id === user?.studentId);

  if (!student) {
    return <div className="text-center py-8">Student profile not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-600">View and manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">{student.name}</h3>
              <p className="text-blue-100">{student.course} - Year {student.year}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{student.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Book className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Course</p>
                    <p className="text-gray-900">{student.course}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Admission Date</p>
                    <p className="text-gray-900">{new Date(student.admissionDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accommodation & Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Accommodation & Contact</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Room Number</p>
                    <p className="text-gray-900">
                      {student.roomNumber ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {student.roomNumber}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          Not Assigned
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mess Facility</p>
                    <p className="text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        student.messOptedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.messOptedIn ? 'Opted In' : 'Not Opted'}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Contact className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Parent Contact</p>
                    <p className="text-gray-900">{student.parentContact}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                    <p className="text-gray-900">{student.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Address</h4>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{student.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}