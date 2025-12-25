import React, { useState } from 'react';
import { X, Check, Clock, AlertCircle } from 'lucide-react';
import { Attendance } from '../../../types';
import { mockStudents } from '../../../data/mockData';

interface MarkAttendanceModalProps {
  selectedDate: string;
  onClose: () => void;
  onMark: (attendance: Omit<Attendance, 'id'>[]) => void;
}

export default function MarkAttendanceModal({ selectedDate, onClose, onMark }: MarkAttendanceModalProps) {
  const [attendanceData, setAttendanceData] = useState<Record<string, {
    status: 'present' | 'absent' | 'late';
    checkInTime: string;
    checkOutTime: string;
    remarks: string;
  }>>(
    mockStudents.reduce((acc, student) => ({
      ...acc,
      [student.id]: {
        status: 'present',
        checkInTime: '',
        checkOutTime: '',
        remarks: '',
      }
    }), {})
  );

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      }
    }));
  };

  const handleFieldChange = (studentId: string, field: string, value: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      }
    }));
  };

  const handleSubmit = () => {
    const records: Omit<Attendance, 'id'>[] = mockStudents.map(student => ({
      studentId: student.id,
      date: selectedDate,
      status: attendanceData[student.id].status,
      checkInTime: attendanceData[student.id].checkInTime || undefined,
      checkOutTime: attendanceData[student.id].checkOutTime || undefined,
      remarks: attendanceData[student.id].remarks || undefined,
    }));

    onMark(records);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <X className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Mark Attendance - {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.roomNumber || 'No Room'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {(['present', 'absent', 'late'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(student.id, status)}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              attendanceData[student.id].status === status
                                ? status === 'present' ? 'bg-green-100 text-green-800' :
                                  status === 'absent' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {getStatusIcon(status)}
                            <span className="capitalize">{status}</span>
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="time"
                        value={attendanceData[student.id].checkInTime}
                        onChange={(e) => handleFieldChange(student.id, 'checkInTime', e.target.value)}
                        disabled={attendanceData[student.id].status === 'absent'}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="time"
                        value={attendanceData[student.id].checkOutTime}
                        onChange={(e) => handleFieldChange(student.id, 'checkOutTime', e.target.value)}
                        disabled={attendanceData[student.id].status === 'absent'}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={attendanceData[student.id].remarks}
                        onChange={(e) => handleFieldChange(student.id, 'remarks', e.target.value)}
                        placeholder="Optional remarks..."
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}