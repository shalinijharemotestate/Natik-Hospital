import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const stats = [
  { label: 'Total Patients Today', value: '87', icon: '🧑‍⚕️', color: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  { label: 'OPD Registered', value: '54', icon: '🗂️', color: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  { label: 'IPD Admitted', value: '8', icon: '🛏️', color: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
  { label: 'Pending Billing', value: '12', icon: '🧾', color: '#fef2f2', border: '#fecaca', text: '#dc2626' },
];

const queue = [
  { token: 'T-001', name: 'Ravi Kumar', type: 'OPD', doctor: 'Dr. Sharma', status: 'Consulting' },
  { token: 'T-002', name: 'Priya Singh', type: 'OPD', doctor: 'Dr. Mehta', status: 'Waiting' },
  { token: 'T-003', name: 'Mohan Das', type: 'OPD', doctor: 'Dr. Verma', status: 'Waiting' },
  { token: 'T-004', name: 'Sunita Gupta', type: 'IPD', doctor: 'Dr. Sharma', status: 'Admitted' },
  { token: 'T-005', name: 'Arjun Yadav', type: 'OPD', doctor: 'Dr. Mehta', status: 'Done' },
];

const STATUS_STYLE = {
  Consulting: { bg: '#eff6ff', text: '#1d4ed8' },
  Waiting:    { bg: '#fefce8', text: '#a16207' },
  Admitted:   { bg: '#fff7ed', text: '#c2410c' },
  Done:       { bg: '#f0fdf4', text: '#15803d' },
};

const beds = [
  { id: 'G-01', ward: 'General', status: 'occupied' },
  { id: 'G-02', ward: 'General', status: 'available' },
  { id: 'G-03', ward: 'General', status: 'occupied' },
  { id: 'G-04', ward: 'General', status: 'available' },
  { id: 'I-01', ward: 'ICU', status: 'occupied' },
  { id: 'I-02', ward: 'ICU', status: 'occupied' },
  { id: 'I-03', ward: 'ICU', status: 'available' },
  { id: 'P-01', ward: 'Private', status: 'available' },
  { id: 'P-02', ward: 'Private', status: 'occupied' },
  { id: 'P-03', ward: 'Private', status: 'available' },
];

export default function ReceptionDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reception Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome, {user?.name} &bull; {today}</p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}
        >
          <span className="text-base">➕</span>
          Register New Patient
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border shadow-sm"
            style={{ borderColor: s.border }}>
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-bold text-gray-900 mt-3">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Today's Queue</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-50">
                  <th className="px-6 py-3">Token</th>
                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {queue
                  .filter((q) => q.name.toLowerCase().includes(search.toLowerCase()))
                  .map((q) => (
                    <tr key={q.token} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{q.token}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{q.name}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${q.type === 'IPD' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                          {q.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{q.doctor}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={STATUS_STYLE[q.status]}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bed Occupancy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Bed Occupancy</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-red-400" />
                <span className="text-xs text-gray-500">Occupied</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-green-400" />
                <span className="text-xs text-gray-500">Available</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {['General', 'ICU', 'Private'].map((ward) => (
              <div key={ward} className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{ward} Ward</p>
                <div className="flex flex-wrap gap-2">
                  {beds.filter((b) => b.ward === ward).map((bed) => (
                    <div
                      key={bed.id}
                      title={`${bed.id} - ${bed.status}`}
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition hover:scale-110"
                      style={{
                        background: bed.status === 'occupied' ? '#fee2e2' : '#dcfce7',
                        color: bed.status === 'occupied' ? '#dc2626' : '#16a34a',
                        border: `1.5px solid ${bed.status === 'occupied' ? '#fca5a5' : '#86efac'}`,
                      }}
                    >
                      {bed.id.split('-')[1]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
