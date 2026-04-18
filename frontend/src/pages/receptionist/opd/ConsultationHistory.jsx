import { useState } from 'react';
import {
  MdSearch, MdCalendarToday, MdPerson, MdLocalHospital,
  MdFilterList, MdExpandMore, MdExpandLess, MdReceiptLong
} from 'react-icons/md';

const history = [
  { id: 'CONS-001', patientId: 'PAT-001', patient: 'Ravi Kumar', age: 34, date: '18 Apr 2026', doctor: 'Dr. Sharma', dept: 'General', chief: 'Fever & cough', diagnosis: 'Viral fever', rx: 'Paracetamol 500mg, Cough syrup', followUp: '25 Apr 2026', type: 'New' },
  { id: 'CONS-002', patientId: 'PAT-002', patient: 'Priya Singh', age: 28, date: '17 Apr 2026', doctor: 'Dr. Mehta', dept: 'Gynecology', chief: 'Routine checkup', diagnosis: 'Normal', rx: 'Iron supplements', followUp: '—', type: 'Follow-up' },
  { id: 'CONS-003', patientId: 'PAT-005', patient: 'Arjun Yadav', age: 29, date: '15 Apr 2026', doctor: 'Dr. Rao', dept: 'Orthopedics', chief: 'Knee pain', diagnosis: 'Ligament strain', rx: 'Diclofenac gel, Rest', followUp: '22 Apr 2026', type: 'New' },
  { id: 'CONS-004', patientId: 'PAT-006', patient: 'Meena Tiwari', age: 61, date: '18 Apr 2026', doctor: 'Dr. Verma', dept: 'Cardiology', chief: 'BP monitoring', diagnosis: 'Hypertension controlled', rx: 'Amlodipine 5mg continue', followUp: '2 May 2026', type: 'Follow-up' },
  { id: 'CONS-005', patientId: 'PAT-008', patient: 'Kavita Verma', age: 33, date: '17 Apr 2026', doctor: 'Dr. Khan', dept: 'ENT', chief: 'Ear infection', diagnosis: 'Otitis media', rx: 'Amoxicillin 500mg, Ear drops', followUp: '24 Apr 2026', type: 'New' },
];

export default function ConsultationHistory() {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const depts = ['All', ...new Set(history.map(h => h.dept))];
  const filtered = history.filter(h => {
    const matchSearch = h.patient.toLowerCase().includes(search.toLowerCase()) ||
      h.patientId.toLowerCase().includes(search.toLowerCase()) ||
      h.doctor.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'All' || h.dept === dept;
    return matchSearch && matchDept;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Consultation History</h1>
        <p className="text-xs text-gray-500 mt-0.5">Past OPD consultation records</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search patient, ID or doctor..."
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

        {/* Records */}
        <div className="space-y-3">
          {filtered.map(h => (
            <div key={h.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === h.id ? null : h.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <MdPerson className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{h.patient}</p>
                    <p className="text-xs text-gray-500">{h.patientId} · {h.age} yrs</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-semibold text-gray-700">{h.doctor}</p>
                    <p className="text-xs text-gray-500">{h.dept}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:block ${h.type === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {h.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MdCalendarToday className="w-3 h-3" />{h.date}
                  </span>
                  {expanded === h.id ? <MdExpandLess className="w-5 h-5 text-gray-400" /> : <MdExpandMore className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              {expanded === h.id && (
                <div className="px-6 pb-5 border-t border-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                        <MdLocalHospital className="w-3.5 h-3.5" /> Chief Complaint
                      </p>
                      <p className="text-sm text-gray-800">{h.chief}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-blue-500 mb-1">Diagnosis</p>
                      <p className="text-sm font-semibold text-blue-800">{h.diagnosis}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-green-600 mb-1 flex items-center gap-1">
                        <MdReceiptLong className="w-3.5 h-3.5" /> Prescription
                      </p>
                      <p className="text-sm text-green-800">{h.rx}</p>
                    </div>
                  </div>
                  {h.followUp !== '—' && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Follow-up:</span>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">{h.followUp}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16 text-gray-400">
            <MdLocalHospital className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No consultation records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
