import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdArrowBack, MdSearch, MdCalendarToday, MdPerson,
  MdAccessTime, MdCheckCircle, MdSave
} from 'react-icons/md';

const doctors = [
  { id: 'D001', name: 'Dr. Sharma', dept: 'General Medicine', slots: ['9:00 AM', '9:30 AM', '10:30 AM', '11:00 AM', '2:00 PM'] },
  { id: 'D002', name: 'Dr. Mehta', dept: 'Gynecology', slots: ['10:00 AM', '10:30 AM', '11:30 AM', '3:00 PM'] },
  { id: 'D003', name: 'Dr. Verma', dept: 'Cardiology', slots: ['9:00 AM', '11:00 AM', '11:30 AM', '4:00 PM'] },
  { id: 'D004', name: 'Dr. Rao', dept: 'Orthopedics', slots: ['10:00 AM', '10:30 AM', '2:30 PM', '3:30 PM'] },
  { id: 'D005', name: 'Dr. Khan', dept: 'ENT', slots: ['9:30 AM', '11:00 AM', '12:00 PM', '3:00 PM'] },
];

const patients = [
  { id: 'PAT-001', name: 'Ravi Kumar', phone: '9876543210' },
  { id: 'PAT-002', name: 'Priya Singh', phone: '9123456780' },
  { id: 'PAT-003', name: 'Mohan Das', phone: '9988776655' },
  { id: 'PAT-004', name: 'Sunita Gupta', phone: '8877665544' },
];

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [patientQuery, setPatientQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [type, setType] = useState('OPD');
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);
  const [tokenNo, setTokenNo] = useState('');

  const patientResults = patientQuery.length >= 2
    ? patients.filter(p => p.name.toLowerCase().includes(patientQuery.toLowerCase()) || p.phone.includes(patientQuery))
    : [];

  const today = new Date().toISOString().split('T')[0];

  const handleConfirm = () => {
    setTokenNo('T-' + String(Math.floor(Math.random() * 900) + 100));
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Appointment Booked!</h2>
          <p className="text-gray-500 text-sm mb-5">
            Appointment confirmed for <span className="font-semibold">{selectedPatient?.name}</span>
          </p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Token</span>
              <span className="font-bold text-blue-700 font-mono">{tokenNo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Doctor</span>
              <span className="font-semibold text-gray-800">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold text-gray-800">{selectedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="font-semibold text-gray-800">{selectedSlot}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard/reception/appointments')}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
              View All
            </button>
            <button onClick={() => { setDone(false); setStep(1); setSelectedPatient(null); setSelectedDoctor(null); setSelectedSlot(''); setPatientQuery(''); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
              Book Another
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
            <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>
            <p className="text-xs text-gray-500 mt-0.5">Step {step} of 3</p>
          </div>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {['Select Patient', 'Choose Doctor & Slot', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-blue-600' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 w-8 ${step > i + 1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-5">
        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-800">Select Patient</h2>
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={patientQuery} onChange={e => setPatientQuery(e.target.value)}
                placeholder="Search patient by name or phone..."
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {patientResults.map(p => (
              <button key={p.id} onClick={() => setSelectedPatient(p)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition text-left ${selectedPatient?.id === p.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <MdPerson className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.id} · {p.phone}</p>
                </div>
              </button>
            ))}
            {selectedPatient && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-sm font-semibold text-blue-700">Selected: {selectedPatient.name}</span>
                <button onClick={() => setStep(2)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                  style={{ background: '#1d4ed8' }}>
                  Next →
                </button>
              </div>
            )}
            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-500 mb-2">Or register a new patient</p>
              <button onClick={() => navigate('/dashboard/reception/patients/register')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                + Register New Patient
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-800">Choose Doctor</h2>
              <div className="grid grid-cols-1 gap-3">
                {doctors.map(d => (
                  <button key={d.id} onClick={() => { setSelectedDoctor(d); setSelectedSlot(''); }}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition text-left ${selectedDoctor?.id === d.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <MdPerson className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.dept}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedDoctor && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-bold text-gray-800">Select Date & Slot</h2>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Date</label>
                  <input type="date" min={today} value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                    className={inputCls} />
                </div>
                {selectedDate && (
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-2">Available Slots</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.slots.map(slot => (
                        <button key={slot} onClick={() => setSelectedSlot(slot)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition"
                          style={{
                            borderColor: selectedSlot === slot ? '#1d4ed8' : '#e5e7eb',
                            background: selectedSlot === slot ? '#dbeafe' : '#f9fafb',
                            color: selectedSlot === slot ? '#1d4ed8' : '#64748b',
                          }}>
                          <MdAccessTime className="w-3.5 h-3.5" /> {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                ← Back
              </button>
              <button disabled={!selectedDoctor || !selectedDate || !selectedSlot}
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-800">Confirm Appointment</h2>
              <div className="space-y-3">
                {[
                  { label: 'Patient', value: `${selectedPatient?.name} (${selectedPatient?.id})` },
                  { label: 'Doctor', value: selectedDoctor?.name },
                  { label: 'Department', value: selectedDoctor?.dept },
                  { label: 'Date', value: selectedDate },
                  { label: 'Time', value: selectedSlot },
                ].map(r => (
                  <div key={r.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-500">{r.label}</span>
                    <span className="text-sm font-semibold text-gray-800">{r.value}</span>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Notes (optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                  placeholder="Chief complaint or notes..."
                  className={inputCls} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:-translate-y-0.5 shadow hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
                <MdSave className="w-4 h-4" /> Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
