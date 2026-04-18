import { useState } from 'react';
import {
  MdSearch, MdPerson, MdPhone, MdCalendarToday,
  MdBed, MdReceiptLong, MdArrowForward, MdClose
} from 'react-icons/md';

const allPatients = [
  { id: 'PAT-001', name: 'Ravi Kumar', age: 34, gender: 'Male', phone: '9876543210', blood: 'B+', lastVisit: '18 Apr 2026', type: 'OPD', status: 'Active', doctor: 'Dr. Sharma', dept: 'General' },
  { id: 'PAT-002', name: 'Priya Singh', age: 28, gender: 'Female', phone: '9123456780', blood: 'A+', lastVisit: '17 Apr 2026', type: 'OPD', status: 'Active', doctor: 'Dr. Mehta', dept: 'Gynecology' },
  { id: 'PAT-003', name: 'Mohan Das', age: 52, gender: 'Male', phone: '9988776655', blood: 'O+', lastVisit: '16 Apr 2026', type: 'IPD', status: 'Admitted', doctor: 'Dr. Verma', dept: 'Cardiology' },
  { id: 'PAT-004', name: 'Sunita Gupta', age: 45, gender: 'Female', phone: '8877665544', blood: 'AB+', lastVisit: '18 Apr 2026', type: 'IPD', status: 'Admitted', doctor: 'Dr. Sharma', dept: 'General' },
  { id: 'PAT-005', name: 'Arjun Yadav', age: 29, gender: 'Male', phone: '7766554433', blood: 'A-', lastVisit: '15 Apr 2026', type: 'OPD', status: 'Discharged', doctor: 'Dr. Mehta', dept: 'Orthopedics' },
];

const STATUS_STYLE = {
  Active:     { bg: '#dcfce7', text: '#14532d' },
  Admitted:   { bg: '#ffedd5', text: '#9a3412' },
  Discharged: { bg: '#f1f5f9', text: '#475569' },
};

export default function SearchPatient() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const results = query.trim().length >= 2
    ? allPatients.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.phone.includes(query)
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Search Patient</h1>
        <p className="text-xs text-gray-500 mt-0.5">Search by name, patient ID, or phone number</p>
      </div>

      <div className="p-6 max-w-3xl mx-auto space-y-5">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(null); }}
              placeholder="Type name, patient ID or phone number..."
              className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {query && (
              <button onClick={() => { setQuery(''); setSelected(null); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <MdClose className="w-5 h-5" />
              </button>
            )}
          </div>
          {query.length > 0 && query.length < 2 && (
            <p className="text-xs text-gray-400 mt-2 pl-1">Type at least 2 characters to search</p>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && !selected && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
            </div>
            {results.map(p => (
              <button key={p.id} onClick={() => setSelected(p)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50/40 transition text-left border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <MdPerson className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.id} · {p.age} yrs · {p.gender} · {p.phone}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                  style={STATUS_STYLE[p.status]}>{p.status}</span>
                <MdArrowForward className="w-4 h-4 text-gray-300 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-12 text-center">
            <MdSearch className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-500">No patient found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different name, ID, or phone number</p>
          </div>
        )}

        {/* Patient Detail Card */}
        {selected && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #1e3a8a08, #1e40af05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MdPerson className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{selected.id}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                {[
                  { icon: MdPerson, label: 'Age / Gender', value: `${selected.age} yrs / ${selected.gender}` },
                  { icon: MdPhone, label: 'Phone', value: selected.phone },
                  { icon: MdCalendarToday, label: 'Last Visit', value: selected.lastVisit },
                  { icon: MdBed, label: 'Type', value: selected.type },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-xs">{item.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
                  <MdCalendarToday className="w-4 h-4" /> Book Appointment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #065f46, #059669)' }}>
                  <MdBed className="w-4 h-4" /> Admit to IPD
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #92400e, #d97706)' }}>
                  <MdReceiptLong className="w-4 h-4" /> Generate Bill
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {!query && (
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="text-sm font-semibold text-blue-700 mb-2">Search Tips</p>
            <ul className="space-y-1 text-xs text-blue-600">
              <li>• Search by full or partial patient name</li>
              <li>• Use Patient ID like <span className="font-mono bg-blue-100 px-1 rounded">PAT-001</span></li>
              <li>• Enter 10-digit mobile number</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
