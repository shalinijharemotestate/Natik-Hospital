import { useState } from 'react';
import { MdBed, MdPerson, MdSearch, MdCheckCircle, MdSave } from 'react-icons/md';

const admittedPatients = [
  { ipdNo: 'IPD-001', patient: 'Sunita Gupta', ward: 'General', bed: 'G-01' },
  { ipdNo: 'IPD-003', patient: 'Lata Devi', ward: 'Maternity', bed: 'M-01' },
  { ipdNo: 'IPD-004', patient: 'Vijay Kumar', ward: 'Private', bed: 'P-02' },
];

const availableBeds = {
  General:   [{ id: 'G-02', type: 'Standard' }, { id: 'G-04', type: 'Standard' }, { id: 'G-06', type: 'Standard' }, { id: 'G-08', type: 'Standard' }],
  ICU:       [{ id: 'I-03', type: 'ICU' }],
  Private:   [{ id: 'P-01', type: 'AC Private' }, { id: 'P-03', type: 'AC Private' }],
  Maternity: [{ id: 'M-02', type: 'Maternity' }, { id: 'M-03', type: 'Maternity' }],
};

const WARD_COLOR = { General: '#1d4ed8', ICU: '#991b1b', Private: '#065f46', Maternity: '#6b21a8' };

export default function AllocateBed() {
  const [query, setQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedBed, setSelectedBed] = useState('');
  const [done, setDone] = useState(false);

  const results = query.length >= 2
    ? admittedPatients.filter(p => p.patient.toLowerCase().includes(query.toLowerCase()) || p.ipdNo.toLowerCase().includes(query.toLowerCase()))
    : admittedPatients;

  const beds = selectedWard ? availableBeds[selectedWard] || [] : [];

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-sm w-full text-center border border-gray-100">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Bed Allocated!</h2>
          <p className="text-gray-500 text-sm mb-4">
            {selectedBed} ({selectedWard} Ward) allocated to {selectedPatient?.patient}
          </p>
          <div className="flex gap-3">
            <button onClick={() => { setDone(false); setSelectedPatient(null); setSelectedWard(''); setSelectedBed(''); setQuery(''); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
              Allocate Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Allocate Bed</h1>
        <p className="text-xs text-gray-500 mt-0.5">Assign an available bed to an admitted patient</p>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-5">
        {/* Patient Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <MdPerson className="w-5 h-5 text-blue-600" /> Select Patient
          </h2>
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={query} onChange={e => { setQuery(e.target.value); setSelectedPatient(null); }}
              placeholder="Search admitted patient..."
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            {results.map(p => (
              <button key={p.ipdNo} onClick={() => setSelectedPatient(p)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition text-left ${selectedPatient?.ipdNo === p.ipdNo ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <MdPerson className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{p.patient}</p>
                  <p className="text-xs text-gray-500">{p.ipdNo} · Currently: {p.ward} {p.bed}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bed Selection */}
        {selectedPatient && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MdBed className="w-5 h-5 text-blue-600" /> Select New Bed
            </h2>

            {/* Ward Tabs */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Ward</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(availableBeds).map(w => (
                  <button key={w} onClick={() => { setSelectedWard(w); setSelectedBed(''); }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border-2 transition"
                    style={{
                      borderColor: selectedWard === w ? WARD_COLOR[w] : '#e5e7eb',
                      background: selectedWard === w ? WARD_COLOR[w] + '18' : '#f9fafb',
                      color: selectedWard === w ? WARD_COLOR[w] : '#64748b',
                    }}>
                    {w} ({availableBeds[w].length} available)
                  </button>
                ))}
              </div>
            </div>

            {/* Beds */}
            {selectedWard && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Available Beds in {selectedWard}</p>
                <div className="flex flex-wrap gap-3">
                  {beds.map(bed => (
                    <button key={bed.id} onClick={() => setSelectedBed(bed.id)}
                      className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition hover:scale-105"
                      style={{
                        borderColor: selectedBed === bed.id ? WARD_COLOR[selectedWard] : '#86efac',
                        background: selectedBed === bed.id ? WARD_COLOR[selectedWard] + '18' : '#dcfce7',
                      }}>
                      <MdBed className="w-6 h-6 mb-1" style={{ color: selectedBed === bed.id ? WARD_COLOR[selectedWard] : '#16a34a' }} />
                      <span className="text-sm font-bold" style={{ color: selectedBed === bed.id ? WARD_COLOR[selectedWard] : '#16a34a' }}>{bed.id}</span>
                      <span className="text-xs text-gray-500">{bed.type}</span>
                    </button>
                  ))}
                  {beds.length === 0 && <p className="text-xs text-gray-400">No available beds in this ward</p>}
                </div>
              </div>
            )}

            {selectedBed && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-700">
                  Allocating <span className="font-bold">{selectedBed}</span> ({selectedWard} Ward) to{' '}
                  <span className="font-bold">{selectedPatient.patient}</span>
                </p>
              </div>
            )}

            <button disabled={!selectedBed}
              onClick={() => setDone(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white shadow disabled:opacity-50 hover:shadow-md transition hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
              <MdSave className="w-4 h-4" /> Confirm Allocation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
