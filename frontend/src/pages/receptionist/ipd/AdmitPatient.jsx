import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdSearch, MdBed, MdPerson, MdSave, MdCheckCircle } from 'react-icons/md';

const patients = [
  { id: 'PAT-001', name: 'Ravi Kumar', age: 34, phone: '9876543210', blood: 'B+' },
  { id: 'PAT-002', name: 'Priya Singh', age: 28, phone: '9123456780', blood: 'A+' },
  { id: 'PAT-003', name: 'Mohan Das', age: 52, phone: '9988776655', blood: 'O+' },
];

const doctors = ['Dr. Sharma (General)', 'Dr. Mehta (Gynecology)', 'Dr. Verma (Cardiology)', 'Dr. Rao (Orthopedics)'];
const wards = ['General', 'Private', 'ICU', 'Maternity'];
const availableBeds = {
  General: ['G-02', 'G-04', 'G-06'],
  Private: ['P-01', 'P-03'],
  ICU: ['I-03'],
  Maternity: ['M-01', 'M-02'],
};

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
      {label}{required && <span className="text-red-500"> *</span>}
    </label>
    {children}
  </div>
);

export default function AdmitPatient() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState({ doctor: '', ward: '', bed: '', admitDate: '', reason: '', notes: '' });
  const [done, setDone] = useState(false);
  const [ipdNo, setIpdNo] = useState('');

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const results = query.length >= 2 ? patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.phone.includes(query)) : [];
  const beds = form.ward ? availableBeds[form.ward] || [] : [];

  const handleSubmit = e => {
    e.preventDefault();
    setIpdNo('IPD-' + Date.now().toString().slice(-5));
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Patient Admitted!</h2>
          <p className="text-gray-500 text-sm mb-5">{selectedPatient?.name} admitted to {form.ward} ward</p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">IPD Number</span><span className="font-bold text-blue-700 font-mono">{ipdNo}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Ward</span><span className="font-semibold text-gray-800">{form.ward}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Bed</span><span className="font-semibold text-gray-800">{form.bed}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Doctor</span><span className="font-semibold text-gray-800">{form.doctor}</span></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard/reception/ipd')}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
              View IPD
            </button>
            <button onClick={() => { setDone(false); setSelectedPatient(null); setQuery(''); setForm({ doctor: '', ward: '', bed: '', admitDate: '', reason: '', notes: '' }); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
              Admit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
            <MdArrowBack className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admit Patient (IPD)</h1>
            <p className="text-xs text-gray-500 mt-0.5">Search patient and fill admission details</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-5">
        {/* Patient Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <MdPerson className="w-5 h-5 text-blue-600" /> Select Patient
          </h2>
          {!selectedPatient ? (
            <>
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search patient by name or phone..."
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {results.map(p => (
                <button key={p.id} onClick={() => setSelectedPatient(p)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition text-left">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <MdPerson className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.id} · {p.age} yrs · {p.phone} · <span className="text-red-600 font-semibold">{p.blood}</span></p>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center">
                  <MdPerson className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800">{selectedPatient.name}</p>
                  <p className="text-xs text-blue-600">{selectedPatient.id} · {selectedPatient.age} yrs · Blood: {selectedPatient.blood}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedPatient(null); setQuery(''); }} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Change</button>
            </div>
          )}
        </div>

        {/* Admission Form */}
        {selectedPatient && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <MdBed className="w-5 h-5 text-blue-600" /> Admission Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Admitting Doctor" required>
                  <select required value={form.doctor} onChange={set('doctor')} className={inputCls}>
                    <option value="">Select doctor</option>
                    {doctors.map(d => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Ward" required>
                  <select required value={form.ward} onChange={e => { set('ward')(e); setForm(f => ({ ...f, bed: '' })); }} className={inputCls}>
                    <option value="">Select ward</option>
                    {wards.map(w => <option key={w}>{w}</option>)}
                  </select>
                </Field>
                <Field label="Bed Number" required>
                  <select required value={form.bed} onChange={set('bed')} disabled={!form.ward} className={inputCls}>
                    <option value="">Select bed</option>
                    {beds.map(b => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Admission Date" required>
                  <input required type="date" value={form.admitDate} onChange={set('admitDate')} className={inputCls} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Reason for Admission" required>
                    <input required value={form.reason} onChange={set('reason')} placeholder="Chief complaint / reason" className={inputCls} />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Additional Notes">
                    <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Allergies, previous history, special instructions..." className={inputCls} />
                  </Field>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #065f46, #059669)' }}>
                <MdSave className="w-4 h-4" /> Confirm Admission
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
