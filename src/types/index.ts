export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: number;
  roomNumber?: string;
  admissionDate: string;
  parentContact: string;
  address: string;
  emergencyContact: string;
  messOptedIn: boolean;
}

export interface Room {
  id: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  floor: number;
  type: 'single' | 'double' | 'triple' | 'quad';
  students: string[];
  items: RoomItem[];
}

export interface RoomItem {
  id: string;
  name: string;
  quantity: number;
  condition: 'good' | 'fair' | 'poor';
  lastChecked: string;
}

export interface MessFee {
  id: string;
  studentId: string;
  month: string;
  year: number;
  amount: number;
  paid: boolean;
  dueDate: string;
  paidDate?: string;
}

export interface Fine {
  id: string;
  studentId: string;
  reason: string;
  amount: number;
  dateIssued: string;
  paid: boolean;
  paidDate?: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'student';
  name: string;
  studentId?: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  title: string;
  description: string;
  category: 'maintenance' | 'food' | 'cleanliness' | 'noise' | 'security' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  dateSubmitted: string;
  dateResolved?: string;
  adminResponse?: string;
  adminId?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}