import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MdPeople, MdBed, MdReceiptLong, MdCalendarToday,
  MdAdd, MdSearch, MdNotifications, MdTrendingUp,
  MdAccessTime, MdCheckCircle, MdWarning, MdPersonAdd,
  MdLocalHospital, MdArrowForward, MdRefresh
} from 'react-icons/md';

const stats = [
  { label: 'Total Patients Today', value: '87', sub: '+12 vs yesterday', icon: MdPeople, bg: '#1e40af', light: '#dbeafe' },
  { label: 'OPD Registered', value: '54', sub: '6 waiting', icon: MdCalendarToday, bg: '#065f46', light: '#d1fae5' },
  { label: 'IPD Admitted', value: '8', sub: '2 new today', icon: MdBed, bg: '#92400e', light: '#fef3c7' },
  { label: 'Pending Billing', value: '12', sub: '₹24,500 dues', icon: MdReceiptLong, bg: '#991b1b', light: '#fee2e2' },
];

const queue = [
  { token: 'T-001', name: 'Ravi Kumar', age: 34, type: 'OPD', doctor: 'Dr. Sharma', dept: 'General', status: 'Consulting', time: '10:15 AM' },
  { token: 'T-002', name: 'Priya Singh', age: 28, type: 'OPD', doctor: 'Dr. Mehta', dept: 'Gynecology', status: 'Waiting', time: '10:30 AM' },
  { token: 'T-003', name: 'Mohan Das', age: 52, type: 'OPD', doctor: 'Dr. Verma', dept: 'Cardiology', status: 'Waiting', time: '10:45 AM' },
  { token: 'T-004', name: 'Sunita Gupta', age: 45, type: 'IPD', doctor: 'Dr. Sharma', dept: 'General', status: 'Admitted', time: '09:00 AM' },
  { token: 'T-005', name: 'Arjun Yadav', age: 29, type: 'OPD', doctor: 'Dr. Mehta', dept: 'Orthopedics', status: 'Done', time: '09:30 AM' },
  { token: 'T-006', name: 'Meena Tiwari', age: 61, type: 'OPD', doctor: 'Dr. Verma', dept: 'Cardiology', status: 'Waiting', time: '11:00 AM' },
];

const beds = [
  { id: 'G-01', ward: 'General', status: 'occupied', patient: 'Sunita G.' },
  { id: 'G-02', ward: 'General', status: 'available', patient: null },
  { id: 'G-03', ward: 'General', status: 'occupied', patient: 'Ram S.' },
  { id: 'G-04', ward: 'General', status: 'available', patient: null },
  { id: 'G-05', ward: 'General', status: 'occupied', patient: 'Lata D.' },
  { id: 'G-06', ward: 'General', status: 'available', patient: null },
  { id: 'I-01', ward: 'ICU', status: 'occupied', patient: 'Mohan L.' },
  { id: 'I-02', ward: 'ICU', status: 'occupied', patient: 'Asha R.' },
  { id: 'I-03', ward: 'ICU', status: 'available', patient: null },
  { id: 'P-01', ward: 'Private', status: 'available', patient: null },
  { id: 'P-02', ward: 'Private', status: 'occupied', patient: 'Vijay K.' },
  { id: 'P-03', ward: 'Private', status: 'available', patient: null },
];

const recentActivity = [
  { text: 'Ravi Kumar registered as OPD patient', time: '2 min ago', icon: MdPersonAdd, color: '#1d4ed8' },
  { text: 'Bed G-04 allocated to Sunita Gupta', time: '15 min ago', icon: MdBed, color: '#065f46' },
  { text: 'Bill #INV-2401 generated — ₹3,200', time: '32 min ago', icon: MdReceiptLong, color: '#92400e' },
  { text: 'Priya Singh appointment confirmed', time: '1 hr ago', icon: MdCheckCircle, color: '#065f46' },
  { text: 'Pending due alert — Arjun Yadav', time: '2 hrs ago', icon: MdWarning, color: '#991b1b' },
];

const STATUS = {
  Consulting: { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  Waiting:    { bg: '#fef9c3', text: '#854d0e', dot: '#eab308' },
  Admitted:   { bg: '#ffedd5', text: '#9a3412', dot: '#f97316' },
  Done:       { bg: '#dcfce7', text: '#14532d', dot: '#22c55e' },
};

export default function ReceptionDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeWard, setActiveWard] = useState('All');
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const filteredQueue = queue.filter(q =>
    q.name.toLowerCase().includes(search.toLowerCase()) ||
    q.token.toLowerCase().includes(search.toLowerCase())
  );

  const wards = ['All', 'General', 'ICU', 'Private'];
  const filteredBeds = activeWard === 'All' ? beds : beds.filter(b => b.ward === activeWard);
  const occupiedCount = beds.filter(b => b.status === 'occupied').length;
  const availableCount = beds.filter(b => b.status === 'available').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Reception Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MdAccessTime className="w-3.5 h-3.5" /> {today}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
              <MdRefresh className="w-4 h-4" /> Refresh
            </button>
            <button className="relative p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
              <MdNotifications className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}
            >
              <MdAdd className="w-4 h-4" /> Register Patient
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: s.light }}>
                    <Icon className="w-5 h-5" style={{ color: s.bg }} />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium" style={{ color: s.bg }}>
                    <MdTrendingUp className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Queue Table */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100"
              style={{ background: 'linear-gradient(135deg, #1e3a8a08, #1e40af05)' }}>
              <div>
                <h2 className="font-bold text-gray-800">Today's Queue</h2>
                <p className="text-xs text-gray-400 mt-0.5">{queue.length} patients in queue</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <MdSearch className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 w-40"
                  />
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  View All <MdArrowForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#f8faff' }}>
                    {['Token', 'Patient', 'Type', 'Doctor', 'Dept', 'Status', 'Time', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredQueue.map((q) => (
                    <tr key={q.token} className="hover:bg-blue-50/30 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{q.token}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800 text-sm">{q.name}</p>
                        <p className="text-xs text-gray-400">{q.age} yrs</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${q.type === 'IPD' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {q.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{q.doctor}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{q.dept}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                          style={{ background: STATUS[q.status]?.bg, color: STATUS[q.status]?.text }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS[q.status]?.dot }} />
                          {q.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 flex items-center gap-1">
                        <MdAccessTime className="w-3 h-3" />{q.time}
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-semibold border border-blue-200 hover:border-blue-400 px-2 py-1 rounded-lg transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Bed Occupancy */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100"
                style={{ background: 'linear-gradient(135deg, #1e3a8a08, #1e40af05)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                      <MdBed className="w-4 h-4 text-blue-600" /> Bed Occupancy
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">{occupiedCount} occupied · {availableCount} available</p>
                  </div>
                </div>
                {/* Ward filter */}
                <div className="flex gap-1.5 mt-3">
                  {wards.map(w => (
                    <button key={w} onClick={() => setActiveWard(w)}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium transition"
                      style={{
                        background: activeWard === w ? '#1d4ed8' : '#f1f5f9',
                        color: activeWard === w ? '#fff' : '#64748b'
                      }}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-red-400" />
                    <span className="text-xs text-gray-500">Occupied</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                    <span className="text-xs text-gray-500">Available</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredBeds.map((bed) => (
                    <div key={bed.id} title={bed.patient ? `${bed.id} — ${bed.patient}` : `${bed.id} — Available`}
                      className="w-11 h-11 rounded-xl flex flex-col items-center justify-center cursor-pointer transition hover:scale-110 hover:shadow-md"
                      style={{
                        background: bed.status === 'occupied' ? '#fee2e2' : '#dcfce7',
                        border: `1.5px solid ${bed.status === 'occupied' ? '#fca5a5' : '#86efac'}`,
                      }}>
                      <MdBed className="w-4 h-4" style={{ color: bed.status === 'occupied' ? '#dc2626' : '#16a34a' }} />
                      <span className="text-xs font-bold" style={{ color: bed.status === 'occupied' ? '#dc2626' : '#16a34a' }}>
                        {bed.id.split('-')[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100"
                style={{ background: 'linear-gradient(135deg, #1e3a8a08, #1e40af05)' }}>
                <h2 className="font-bold text-gray-800">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {recentActivity.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: a.color + '18' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <MdAccessTime className="w-3 h-3" />{a.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdLocalHospital className="w-4 h-4 text-blue-600" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Register Patient', icon: MdPersonAdd, color: '#1d4ed8', bg: '#dbeafe' },
              { label: 'Book Appointment', icon: MdCalendarToday, color: '#065f46', bg: '#d1fae5' },
              { label: 'Generate Bill', icon: MdReceiptLong, color: '#92400e', bg: '#fef3c7' },
              { label: 'Allocate Bed', icon: MdBed, color: '#6b21a8', bg: '#f3e8ff' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-transparent hover:border-current transition group text-left"
                  style={{ background: action.bg }}>
                  <Icon className="w-5 h-5 shrink-0" style={{ color: action.color }} />
                  <span className="text-sm font-semibold" style={{ color: action.color }}>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
