import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd, MdSearch, MdBed, MdPerson, MdCalendarToday,
  MdAccessTime, MdArrowForward, MdFilterList
} from 'react-icons/md';

const admissions = [
  { ipdNo: 'IPD-001', patientId: 'PAT-004', patient: 'Sunita Gupta', age: 45, gender: 'Female', blood: 'AB+', doctor: 'Dr. Sharma', dept: 'General', ward: 'General', bed: 'G-01', admitDate: '15 Apr 2026', days: 3, reason: 'Post-op recovery', status: 'Stable' },
  { ipdNo: 'IPD-002', patientId: 'PAT-003', patient: 'Mohan Das', age: 52, gender: 'Male', blood: 'O+', doctor: 'Dr. Verma', dept: 'Cardiology', ward: 'ICU', bed: 'I-01', admitDate: '16 Apr 2026', days: 2, reason: 'Chest pain, monitoring', status: 'Critical' },
  { ipdNo: 'IPD-003', patientId: 'PAT-009', patient: 'Lata Devi', age: 38, gender: 'Female', blood: 'A+', doctor: 'Dr. Mehta', dept: 'Gynecology', ward: 'Maternity', bed: 'M-01', admitDate: '17 Apr 2026', days: 1, reason: 'Labour', status: 'Stable' },
  { ipdNo: 'IPD-004', patientId: 'PAT-010', patient: 'Vijay Kumar', age: 60, gender: 'Male', blood: 'B+', doctor: 'Dr. Rao', dept: 'Orthopedics', ward: 'Private', bed: 'P-02', admitDate: '14 Apr 2026', days: 4, reason: 'Hip replacement surgery', status: 'Recovering' },
];

const STATUS_STYLE = {
  Stable:     { bg: '#dcfce7', text: '#14532d' },
  Critical:   { bg: '#fee2e2', text: '#991b1b' },
  Recovering: { bg: '#dbeafe', text: '#1e40af' },
};

const WARD_COLOR = {
  General:   '#1d4ed8',
  ICU:       '#991b1b',
  Maternity: '#6b21a8',
  Private:   '#065f46',
};

export default function ActiveAdmissions() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [ward, setWard] = useState('All');

  const wards = ['All', 'General', 'ICU', 'Maternity', 'Private'];

  const filtered = admissions.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.ipdNo.toLowerCase().includes(search.toLowerCase());
    const matchWard = ward === 'All' || a.ward === ward;
    return matchSearch && matchWard;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Active Admissions</h1>
            <p className="text-xs text-gray-500 mt-0.5">{admissions.length} patients currently admitted</p>
          </div>
          <button onClick={() => navigate('/dashboard/reception/ipd/admit')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #065f46, #059669)' }}>
            <MdAdd className="w-4 h-4" /> Admit Patient
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Ward summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {wards.slice(1).map(w => {
            const count = admissions.filter(a => a.ward === w).length;
            return (
              <button key={w} onClick={() => setWard(w === ward ? 'All' : w)}
                className={`p-4 rounded-2xl border-2 text-left transition ${ward === w ? 'border-current shadow-sm' : 'border-transparent'}`}
                style={{ background: WARD_COLOR[w] + '12' }}>
                <p className="text-2xl font-bold" style={{ color: WARD_COLOR[w] }}>{count}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: WARD_COLOR[w] }}>{w} Ward</p>
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
                placeholder="Search patient or IPD number..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <MdFilterList className="w-4 h-4 text-gray-400" />
              {wards.map(w => (
                <button key={w} onClick={() => setWard(w)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={{ background: ward === w ? '#1d4ed8' : '#f1f5f9', color: ward === w ? '#fff' : '#64748b' }}>
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(a => {
            const ss = STATUS_STYLE[a.status];
            return (
              <div key={a.ipdNo} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{a.ipdNo}</span>
                    <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={ss}>{a.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: WARD_COLOR[a.ward] + '18', color: WARD_COLOR[a.ward] }}>
                      {a.ward} · {a.bed}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <MdPerson className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{a.patient}</p>
                    <p className="text-xs text-gray-500">{a.age} yrs · {a.gender} · <span className="text-red-600 font-semibold">{a.blood}</span></p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-500 border-t border-gray-50 pt-3">
                  <p className="flex items-center gap-1.5"><MdPerson className="w-3.5 h-3.5 text-blue-400" /> {a.doctor} · {a.dept}</p>
                  <p className="flex items-center gap-1.5"><MdCalendarToday className="w-3.5 h-3.5 text-blue-400" /> Admitted: {a.admitDate}</p>
                  <p className="flex items-center gap-1.5"><MdAccessTime className="w-3.5 h-3.5 text-blue-400" /> {a.days} day{a.days !== 1 ? 's' : ''} admitted</p>
                  <p className="text-gray-600 italic">"{a.reason}"</p>
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition">
                    View <MdArrowForward className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition">
                    Discharge
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16 text-gray-400">
            <MdBed className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No active admissions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
