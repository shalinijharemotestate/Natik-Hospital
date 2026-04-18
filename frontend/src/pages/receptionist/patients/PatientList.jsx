import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch, MdAdd, MdFilterList, MdPerson, MdPhone,
  MdCalendarToday, MdArrowForward, MdEdit, MdVisibility
} from 'react-icons/md';

const patients = [
  { id: 'PAT-001', name: 'Ravi Kumar', age: 34, gender: 'Male', phone: '9876543210', blood: 'B+', lastVisit: '18 Apr 2026', type: 'OPD', status: 'Active' },
  { id: 'PAT-002', name: 'Priya Singh', age: 28, gender: 'Female', phone: '9123456780', blood: 'A+', lastVisit: '17 Apr 2026', type: 'OPD', status: 'Active' },
  { id: 'PAT-003', name: 'Mohan Das', age: 52, gender: 'Male', phone: '9988776655', blood: 'O+', lastVisit: '16 Apr 2026', type: 'IPD', status: 'Admitted' },
  { id: 'PAT-004', name: 'Sunita Gupta', age: 45, gender: 'Female', phone: '8877665544', blood: 'AB+', lastVisit: '18 Apr 2026', type: 'IPD', status: 'Admitted' },
  { id: 'PAT-005', name: 'Arjun Yadav', age: 29, gender: 'Male', phone: '7766554433', blood: 'A-', lastVisit: '15 Apr 2026', type: 'OPD', status: 'Discharged' },
  { id: 'PAT-006', name: 'Meena Tiwari', age: 61, gender: 'Female', phone: '6655443322', blood: 'B-', lastVisit: '18 Apr 2026', type: 'OPD', status: 'Active' },
  { id: 'PAT-007', name: 'Rajesh Sharma', age: 40, gender: 'Male', phone: '9001122334', blood: 'O-', lastVisit: '14 Apr 2026', type: 'OPD', status: 'Active' },
  { id: 'PAT-008', name: 'Kavita Verma', age: 33, gender: 'Female', phone: '8001234567', blood: 'B+', lastVisit: '13 Apr 2026', type: 'OPD', status: 'Discharged' },
];

const STATUS_STYLE = {
  Active:     { bg: '#dcfce7', text: '#14532d' },
  Admitted:   { bg: '#ffedd5', text: '#9a3412' },
  Discharged: { bg: '#f1f5f9', text: '#475569' },
};

export default function PatientList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'OPD', 'IPD', 'Active', 'Admitted', 'Discharged'];

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchFilter = filter === 'All' || p.type === filter || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Patient List</h1>
            <p className="text-xs text-gray-500 mt-0.5">{patients.length} total registered patients</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/reception/patients/register')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}
          >
            <MdAdd className="w-4 h-4" /> Register Patient
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Filters + Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, ID or phone..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <MdFilterList className="w-4 h-4 text-gray-400" />
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={{
                    background: filter === f ? '#1d4ed8' : '#f1f5f9',
                    color: filter === f ? '#fff' : '#64748b',
                  }}>
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
                  {['Patient ID', 'Name', 'Age / Gender', 'Phone', 'Blood', 'Last Visit', 'Type', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{p.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <MdPerson className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.age} yrs / {p.gender}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-gray-600">
                        <MdPhone className="w-3 h-3" />{p.phone}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-md">{p.blood}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MdCalendarToday className="w-3 h-3" />{p.lastVisit}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.type === 'IPD' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={STATUS_STYLE[p.status]}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition" title="View">
                          <MdVisibility className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="Edit">
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition" title="Appointment">
                          <MdArrowForward className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <MdPerson className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No patients found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
