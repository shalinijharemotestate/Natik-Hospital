import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd, MdSearch, MdFilterList, MdCalendarToday,
  MdAccessTime, MdPerson, MdEdit, MdClose, MdCheckCircle
} from 'react-icons/md';

const appointments = [
  { id: 'APT-001', patient: 'Ravi Kumar', patientId: 'PAT-001', doctor: 'Dr. Sharma', dept: 'General', date: '18 Apr 2026', time: '10:15 AM', type: 'OPD', status: 'Confirmed', token: 'T-001' },
  { id: 'APT-002', patient: 'Priya Singh', patientId: 'PAT-002', doctor: 'Dr. Mehta', dept: 'Gynecology', date: '18 Apr 2026', time: '10:30 AM', type: 'OPD', status: 'Waiting', token: 'T-002' },
  { id: 'APT-003', patient: 'Mohan Das', patientId: 'PAT-003', doctor: 'Dr. Verma', dept: 'Cardiology', date: '18 Apr 2026', time: '10:45 AM', type: 'OPD', status: 'Consulting', token: 'T-003' },
  { id: 'APT-004', patient: 'Sunita Gupta', patientId: 'PAT-004', doctor: 'Dr. Sharma', dept: 'General', date: '18 Apr 2026', time: '09:00 AM', type: 'OPD', status: 'Done', token: 'T-004' },
  { id: 'APT-005', patient: 'Arjun Yadav', patientId: 'PAT-005', doctor: 'Dr. Mehta', dept: 'Orthopedics', date: '19 Apr 2026', time: '11:00 AM', type: 'OPD', status: 'Confirmed', token: 'T-005' },
  { id: 'APT-006', patient: 'Meena Tiwari', patientId: 'PAT-006', doctor: 'Dr. Verma', dept: 'Cardiology', date: '19 Apr 2026', time: '11:30 AM', type: 'OPD', status: 'Confirmed', token: 'T-006' },
  { id: 'APT-007', patient: 'Rajesh Sharma', patientId: 'PAT-007', doctor: 'Dr. Rao', dept: 'Orthopedics', date: '17 Apr 2026', time: '09:30 AM', type: 'OPD', status: 'Done', token: 'T-007' },
  { id: 'APT-008', patient: 'Kavita Verma', patientId: 'PAT-008', doctor: 'Dr. Khan', dept: 'ENT', date: '17 Apr 2026', time: '10:00 AM', type: 'OPD', status: 'Cancelled', token: 'T-008' },
];

const STATUS_STYLE = {
  Confirmed:  { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  Waiting:    { bg: '#fef9c3', text: '#854d0e', dot: '#eab308' },
  Consulting: { bg: '#dcfce7', text: '#14532d', dot: '#22c55e' },
  Done:       { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
  Cancelled:  { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
};

export default function AppointmentList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Confirmed', 'Waiting', 'Consulting', 'Done', 'Cancelled'];

  const filtered = appointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.token.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
            <p className="text-xs text-gray-500 mt-0.5">{appointments.length} total appointments</p>
          </div>
          <button onClick={() => navigate('/dashboard/reception/appointments/book')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
            <MdAdd className="w-4 h-4" /> Book Appointment
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {filters.slice(1).map(f => {
            const count = appointments.filter(a => a.status === f).length;
            const s = STATUS_STYLE[f];
            return (
              <button key={f} onClick={() => setFilter(f === filter ? 'All' : f)}
                className={`p-3 rounded-xl border-2 text-left transition ${filter === f ? 'border-current shadow-sm' : 'border-transparent'}`}
                style={{ background: s.bg }}>
                <p className="text-xl font-bold" style={{ color: s.text }}>{count}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: s.text }}>{f}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search patient, token or doctor..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <MdFilterList className="w-4 h-4 text-gray-400" />
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={{ background: filter === f ? '#1d4ed8' : '#f1f5f9', color: filter === f ? '#fff' : '#64748b' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Token', 'Patient', 'Doctor', 'Dept', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(a => {
                  const s = STATUS_STYLE[a.status];
                  return (
                    <tr key={a.id} className="hover:bg-blue-50/30 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{a.token}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800 text-sm">{a.patient}</p>
                        <p className="text-xs text-gray-400">{a.patientId}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{a.doctor}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{a.dept}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MdCalendarToday className="w-3 h-3" />{a.date}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MdAccessTime className="w-3 h-3" />{a.time}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                          style={{ background: s.bg, color: s.text }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {a.status !== 'Done' && a.status !== 'Cancelled' && (
                            <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition" title="Mark Done">
                              <MdCheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="Edit">
                            <MdEdit className="w-4 h-4" />
                          </button>
                          {a.status !== 'Done' && (
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition" title="Cancel">
                              <MdClose className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <MdCalendarToday className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
