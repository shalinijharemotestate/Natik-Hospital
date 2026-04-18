import { useState } from 'react';
import { MdSwapHoriz, MdBed, MdPerson, MdCalendarToday, MdCheckCircle, MdAdd, MdSave } from 'react-icons/md';

const transfers = [
  { id: 'TRF-001', patient: 'Mohan Das', ipdNo: 'IPD-002', from: 'General · G-03', to: 'ICU · I-01', doctor: 'Dr. Verma', date: '16 Apr 2026', reason: 'Deteriorating condition', status: 'Completed' },
  { id: 'TRF-002', patient: 'Sunita Gupta', ipdNo: 'IPD-001', from: 'ICU · I-02', to: 'General · G-01', doctor: 'Dr. Sharma', date: '17 Apr 2026', reason: 'Condition stabilized', status: 'Completed' },
];

const STATUS_STYLE = {
  Completed: { bg: '#dcfce7', text: '#14532d' },
  Pending:   { bg: '#fef9c3', text: '#854d0e' },
};

const admissions = [
  { ipdNo: 'IPD-001', patient: 'Sunita Gupta', ward: 'General', bed: 'G-01' },
  { ipdNo: 'IPD-002', patient: 'Mohan Das', ward: 'ICU', bed: 'I-01' },
  { ipdNo: 'IPD-003', patient: 'Lata Devi', ward: 'Maternity', bed: 'M-01' },
  { ipdNo: 'IPD-004', patient: 'Vijay Kumar', ward: 'Private', bed: 'P-02' },
];

const availableBeds = { General: ['G-04', 'G-06'], Private: ['P-01', 'P-03'], ICU: ['I-03'], Maternity: ['M-02'] };

export default function Transfers() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ipd: '', toWard: '', toBed: '', reason: '' });
  const [done, setDone] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const beds = form.toWard ? availableBeds[form.toWard] || [] : [];
  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-sm w-full text-center border border-gray-100">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Transfer Initiated!</h2>
          <p className="text-gray-500 text-sm mb-5">Patient has been transferred to {form.toWard} · {form.toBed}</p>
          <div className="flex gap-3">
            <button onClick={() => setDone(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Back</button>
            <button onClick={() => { setDone(false); setShowForm(false); setForm({ ipd: '', toWard: '', toBed: '', reason: '' }); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
              New Transfer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Transfers</h1>
            <p className="text-xs text-gray-500 mt-0.5">Ward and bed transfer records</p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
            <MdAdd className="w-4 h-4" /> New Transfer
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* New Transfer Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MdSwapHoriz className="w-5 h-5 text-blue-600" /> Initiate Transfer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Patient (IPD) *</label>
                <select value={form.ipd} onChange={set('ipd')} className={inputCls}>
                  <option value="">Select admitted patient</option>
                  {admissions.map(a => <option key={a.ipdNo} value={a.ipdNo}>{a.patient} ({a.ipdNo}) — {a.ward} {a.bed}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Transfer To — Ward *</label>
                <select value={form.toWard} onChange={e => { set('toWard')(e); setForm(f => ({ ...f, toBed: '' })); }} className={inputCls}>
                  <option value="">Select ward</option>
                  {Object.keys(availableBeds).map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Bed *</label>
                <select value={form.toBed} onChange={set('toBed')} disabled={!form.toWard} className={inputCls}>
                  <option value="">Select bed</option>
                  {beds.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reason *</label>
                <input value={form.reason} onChange={set('reason')} placeholder="Reason for transfer" className={inputCls} />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button disabled={!form.ipd || !form.toWard || !form.toBed || !form.reason}
                onClick={() => setDone(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 shadow hover:shadow-md transition"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
                <MdSave className="w-4 h-4" /> Confirm Transfer
              </button>
            </div>
          </div>
        )}

        {/* Transfer History */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#f8faff' }}>
            <h2 className="font-bold text-gray-800">Transfer History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Transfer ID', 'Patient', 'From', 'To', 'Doctor', 'Date', 'Reason', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transfers.map(t => (
                  <tr key={t.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{t.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800 text-sm">{t.patient}</p>
                      <p className="text-xs text-gray-400">{t.ipdNo}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{t.from}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
                        <MdBed className="w-3.5 h-3.5" />{t.to}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{t.doctor}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MdCalendarToday className="w-3 h-3" />{t.date}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-32 truncate">{t.reason}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={STATUS_STYLE[t.status]}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
