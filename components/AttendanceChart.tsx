'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface AttendanceRecord {
  _id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent';
  class: string;
}

interface AttendanceChartProps {
  attendance: AttendanceRecord[];
}

export default function AttendanceChart({ attendance }: AttendanceChartProps) {
  const presentCount = attendance.filter(record => record.status === 'present').length;
  const absentCount = attendance.filter(record => record.status === 'absent').length;

  const data = [
    { name: 'Present', value: presentCount, color: '#10B981' },
    { name: 'Absent', value: absentCount, color: '#EF4444' },
  ];

  return (
    <div className="h-64">
      {attendance.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No attendance data available
        </div>
      )}
    </div>
  );
}