'use client';
import { useState } from 'react';

interface Student {
  _id: string;
  name: string;
  studentId: string;
  className: string;
}

interface AttendanceFormProps {
  students: Student[];
  onSubmit: () => void;
}

export default function AttendanceForm({ students, onSubmit }: AttendanceFormProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>({});

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      for (const [studentId, status] of Object.entries(attendanceData)) {
        const student = students.find(s => s.studentId === studentId);
        if (student) {
          const response = await fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId,
              date: selectedDate,
              status,
              className: student.className,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to submit attendance');
          }
        }
      }
      
      setAttendanceData({});
      onSubmit();
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        {students.map((student) => (
          <div key={student._id} className="flex items-center justify-between p-2 border rounded">
            <span className="font-medium">{student.name} ({student.studentId})</span>
            <div className="space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={student.studentId}
                  value="present"
                  onChange={() => handleStatusChange(student.studentId, 'present')}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span className="ml-1 text-green-600">Present</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={student.studentId}
                  value="absent"
                  onChange={() => handleStatusChange(student.studentId, 'absent')}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="ml-1 text-red-600">Absent</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Submit Attendance
      </button>
    </form>
  );
}