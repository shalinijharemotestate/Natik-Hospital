import { useAuth } from '../../context/AuthContext';

const stats = [
  { label: 'Total Patients', value: '1,284', change: '+12 today', icon: '🧑‍⚕️', color: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  { label: 'OPD Today', value: '87', change: '+5 from yesterday', icon: '🗂️', color: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  { label: 'IPD Admitted', value: '43', change: '3 new today', icon: '🛏️', color: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
  { label: 'Revenue Today', value: '₹48,200', change: '+₹3,400 vs yesterday', icon: '💰', color: '#fdf4ff', border: '#e9d5ff', text: '#7e22ce' },
  { label: 'Doctors Active', value: '18', change: '2 on leave', icon: '🩺', color: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  { label: 'Beds Available', value: '12 / 60', change: '48 occupied', icon: '🛏️', color: '#fef2f2', border: '#fecaca', text: '#dc2626' },
  { label: 'Lab Reports', value: '34', change: '6 pending', icon: '🔬', color: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  { label: 'Pharmacy Orders', value: '56', change: '4 low stock alerts', icon: '💊', color: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
];

const recentPatients = [
  { id: 'OPD-2401', name: 'Ravi Kumar', age: 34, doctor: 'Dr. Sharma', status: 'Consulting', time: '10:15 AM' },
  { id: 'IPD-1023', name: 'Sunita Devi', age: 58, doctor: 'Dr. Mehta', status: 'Admitted', time: '09:40 AM' },
  { id: 'OPD-2402', name: 'Arjun Singh', age: 22, doctor: 'Dr. Verma', status: 'Waiting', time: '10:30 AM' },
  { id: 'IPD-1024', name: 'Meena Gupta', age: 45, doctor: 'Dr. Sharma', status: 'Discharged', time: '08:00 AM' },
  { id: 'OPD-2403', name: 'Rohit Yadav', age: 29, doctor: 'Dr. Mehta', status: 'Consulting', time: '10:45 AM' },
];

const STATUS_STYLE = {
  Consulting: { bg: '#eff6ff', text: '#1d4ed8' },
  Admitted:   { bg: '#fff7ed', text: '#c2410c' },
  Waiting:    { bg: '#fefce8', text: '#a16207' },
  Discharged: { bg: '#f0fdf4', text: '#15803d' },
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.name} &bull; {today}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition"
            style={{ borderColor: s.border }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-medium px-2 py-1 rounded-full"
                style={{ background: s.color, color: s.text }}>{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Patients</h2>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium transition">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-50">
                <th className="px-6 py-3">Patient ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentPatients.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-medium">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                  <td className="px-6 py-4 text-gray-500">{p.age} yrs</td>
                  <td className="px-6 py-4 text-gray-600">{p.doctor}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={STATUS_STYLE[p.status]}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
