import React, { useState } from 'react';
import { X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Complaint } from '../../../types';
import { mockStudents } from '../../../data/mockData';

interface ComplaintDetailsModalProps {
  complaint: Complaint;
  onClose: () => void;
  onUpdate: (complaint: Complaint) => void;
}

export default function ComplaintDetailsModal({ complaint, onClose, onUpdate }: ComplaintDetailsModalProps) {
  const [status, setStatus] = useState(complaint.status);
  const [adminResponse, setAdminResponse] = useState(complaint.adminResponse || '');

  const student = mockStudents.find(s => s.id === complaint.studentId);

  const handleUpdate = () => {
    const updatedComplaint: Complaint = {
      ...complaint,
      status,
      adminResponse: adminResponse.trim() || undefined,
      adminId: status !== 'pending' ? 'admin-1' : undefined,
      dateResolved: status === 'resolved' ? new Date().toISOString().split('T')[0] : complaint.dateResolved,
    };
    
    onUpdate(updatedComplaint);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'in-progress':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'closed':
        return <X className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Complaint Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Student Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name: </span>
                <span className="font-medium">{student?.name || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-gray-600">Email: </span>
                <span className="font-medium">{student?.email || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-gray-600">Room: </span>
                <span className="font-medium">{student?.roomNumber || 'Not Assigned'}</span>
              </div>
              <div>
                <span className="text-gray-600">Course: </span>
                <span className="font-medium">{student?.course || 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* Complaint Details */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{complaint.title}</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority} priority
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                  {complaint.category}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">{complaint.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
              <div>
                <span className="font-medium">Submitted: </span>
                {new Date(complaint.dateSubmitted).toLocaleDateString()}
              </div>
              {complaint.dateResolved && (
                <div>
                  <span className="font-medium">Resolved: </span>
                  {new Date(complaint.dateResolved).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center space-x-3">
              {getStatusIcon(status)}
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Admin Response */}
          <div>
            <label htmlFor="adminResponse" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Response
            </label>
            <textarea
              id="adminResponse"
              rows={4}
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide response or update to the student..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}