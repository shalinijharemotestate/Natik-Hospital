import { useState } from 'react';
import {
  MdSearch, MdAccessTime, MdPerson, MdCalendarToday,
  MdArrowForward, MdFilterList, MdLocalHospital
} from 'react-icons/md';

const opdList = [
  { token: 'T-001', name: 'Ravi Kumar', age: 34, gender: 'Male', doctor: 'Dr. Sharma', dept: 'General', time: '10:15 AM', type: 'New', status: 'Consulting', chief: 'Fever & cough' },
  { token: 'T-002', name: 'Priya Singh', age: 28, gender: 'Female', doctor: 'Dr. Mehta', dept: 'Gynecology', time: '10:30 AM', type: 'Follow-up', status: 'Waiting', chief: 'Routine checkup' },
  { token: 'T-003', name: 'Mohan Das', age: 52, gender: 'Male', doctor: 'Dr. Verma', dept: 'Cardiology', time: '10:45 AM', type: 'New', status: 'Waiting', chief: 'Chest pain' },
  { token: 'T-004', name: 'Meena Tiwari', age: 61, gender: 'Female', doctor: 'Dr. Verma', dept: 'Cardiology', time: '11:00 AM', type: 'Follow-up', status: 'Waiting', chief: 'BP monitoring' },
  { token: 'T-005', name: 'Arjun Yadav', age: 29, gender: 'Male', doctor: 'Dr. Mehta', dept: 'Orthopedics', time: '11:15 AM', type: 'New', status: 'Done', chief: 'Knee pain' },
  { token: 'T-006', name: 'Kavita Verma', age: 33, gender: 'Female', doctor: 'Dr. Khan', dept: 'ENT', time: '11:30 AM', type: 'New', status: 'Done', chief: 'Ear infection' },
];

const STATUS_STYLE = {
  Consulting: { bg: '#dcfce7', text: '#14532d', dot: '#22c55e' },
  Waiting:    { bg: '#fef9c3', text: '#854d0e', dot: '#eab308' },
  Done:       { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' },
};

export default function TodayOPD() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');

  const depts = ['All', ...new Set(opdList.map(o => o.dept))];
  const filtered = opdList.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.token.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'All' || o.dept === dept;
    return matchSearch && matchDept;
  });

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Today's OPD</h1>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MdAccessTime className="w-3.5 h-3.5" /> {today}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: 'Total', value: opdList.length, color: '#1d4ed8' },
              { label: 'Waiting', value: opdList.filter(o => o.status === 'Waiting').length, color: '#854d0e' },
              { label: 'Done', value: opdList.filter(o => o.status === 'Done').length, color: '#14532d' },
            ].map(s => (
              <div key={s.label} className="text-center px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search patient or token..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <MdFilterList className="w-4 h-4 text-gray-400" />
              {depts.map(d => (
                <button key={d} onClick={() => setDept(d)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={{ background: dept === d ? '#1d4ed8' : '#f1f5f9', color: dept === d ? '#fff' : '#64748b' }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(o => {
            const s = STATUS_STYLE[o.status];
            return (
              <div key={o.token} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{o.token}</span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: s.bg, color: s.text }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                    {o.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <MdPerson className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{o.name}</p>
                    <p className="text-xs text-gray-500">{o.age} yrs · {o.gender}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-500 border-t border-gray-50 pt-3">
                  <p className="flex items-center gap-1.5"><MdLocalHospital className="w-3.5 h-3.5 text-blue-400" /> {o.doctor} · {o.dept}</p>
                  <p className="flex items-center gap-1.5"><MdAccessTime className="w-3.5 h-3.5 text-blue-400" /> {o.time}</p>
                  <p className="flex items-center gap-1.5"><MdCalendarToday className="w-3.5 h-3.5 text-blue-400" />
                    <span className={`font-medium px-1.5 py-0.5 rounded ${o.type === 'New' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{o.type}</span>
                  </p>
                  {o.chief && <p className="text-gray-600 italic">"{o.chief}"</p>}
                </div>

                <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition">
                  View Details <MdArrowForward className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16 text-gray-400">
            <MdLocalHospital className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No OPD records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
