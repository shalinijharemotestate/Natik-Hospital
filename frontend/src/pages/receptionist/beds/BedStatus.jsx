import { useState } from 'react';
import { MdBed, MdPerson, MdRefresh, MdFilterList } from 'react-icons/md';

const allBeds = [
  { id: 'G-01', ward: 'General', status: 'occupied', patient: 'Sunita Gupta', since: '15 Apr' },
  { id: 'G-02', ward: 'General', status: 'available', patient: null },
  { id: 'G-03', ward: 'General', status: 'occupied', patient: 'Ram S.', since: '17 Apr' },
  { id: 'G-04', ward: 'General', status: 'available', patient: null },
  { id: 'G-05', ward: 'General', status: 'occupied', patient: 'Lata D.', since: '16 Apr' },
  { id: 'G-06', ward: 'General', status: 'available', patient: null },
  { id: 'G-07', ward: 'General', status: 'maintenance', patient: null },
  { id: 'G-08', ward: 'General', status: 'available', patient: null },
  { id: 'I-01', ward: 'ICU', status: 'occupied', patient: 'Mohan Das', since: '16 Apr' },
  { id: 'I-02', ward: 'ICU', status: 'occupied', patient: 'Asha R.', since: '14 Apr' },
  { id: 'I-03', ward: 'ICU', status: 'available', patient: null },
  { id: 'I-04', ward: 'ICU', status: 'maintenance', patient: null },
  { id: 'P-01', ward: 'Private', status: 'available', patient: null },
  { id: 'P-02', ward: 'Private', status: 'occupied', patient: 'Vijay Kumar', since: '14 Apr' },
  { id: 'P-03', ward: 'Private', status: 'available', patient: null },
  { id: 'M-01', ward: 'Maternity', status: 'occupied', patient: 'Lata Devi', since: '17 Apr' },
  { id: 'M-02', ward: 'Maternity', status: 'available', patient: null },
  { id: 'M-03', ward: 'Maternity', status: 'available', patient: null },
];

const BED_STYLE = {
  occupied:    { bg: '#fee2e2', border: '#fca5a5', color: '#dc2626', label: 'Occupied' },
  available:   { bg: '#dcfce7', border: '#86efac', color: '#16a34a', label: 'Available' },
  maintenance: { bg: '#f1f5f9', border: '#cbd5e1', color: '#94a3b8', label: 'Maintenance' },
};

const WARD_COLOR = { General: '#1d4ed8', ICU: '#991b1b', Private: '#065f46', Maternity: '#6b21a8' };

export default function BedStatus() {
  const [activeWard, setActiveWard] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const wards = ['All', 'General', 'ICU', 'Private', 'Maternity'];
  const statuses = ['All', 'available', 'occupied', 'maintenance'];

  const filtered = allBeds.filter(b => {
    const matchWard = activeWard === 'All' || b.ward === activeWard;
    const matchStatus = activeStatus === 'All' || b.status === activeStatus;
    return matchWard && matchStatus;
  });

  const occupied = allBeds.filter(b => b.status === 'occupied').length;
  const available = allBeds.filter(b => b.status === 'available').length;
  const maintenance = allBeds.filter(b => b.status === 'maintenance').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Bed Status</h1>
            <p className="text-xs text-gray-500 mt-0.5">{allBeds.length} total beds across all wards</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
            <MdRefresh className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Occupied', value: occupied, ...BED_STYLE.occupied },
            { label: 'Available', value: available, ...BED_STYLE.available },
            { label: 'Maintenance', value: maintenance, ...BED_STYLE.maintenance },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 border-2 text-center"
              style={{ background: s.bg, borderColor: s.border }}>
              <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Ward capacity bars */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-4">Ward Capacity</h2>
          <div className="space-y-3">
            {wards.slice(1).map(w => {
              const wBeds = allBeds.filter(b => b.ward === w);
              const wOcc = wBeds.filter(b => b.status === 'occupied').length;
              const pct = Math.round((wOcc / wBeds.length) * 100);
              return (
                <div key={w}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold" style={{ color: WARD_COLOR[w] }}>{w}</span>
                    <span className="text-xs text-gray-500">{wOcc}/{wBeds.length} occupied ({pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: WARD_COLOR[w] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-gray-500 font-medium">Ward:</span>
            {wards.map(w => (
              <button key={w} onClick={() => setActiveWard(w)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                style={{ background: activeWard === w ? '#1d4ed8' : '#f1f5f9', color: activeWard === w ? '#fff' : '#64748b' }}>
                {w}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            {statuses.map(s => (
              <button key={s} onClick={() => setActiveStatus(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize"
                style={{ background: activeStatus === s ? '#1d4ed8' : '#f1f5f9', color: activeStatus === s ? '#fff' : '#64748b' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bed Grid */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Bed Map</h2>
            <div className="flex items-center gap-4 text-xs">
              {Object.entries(BED_STYLE).map(([k, v]) => (
                <span key={k} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm border" style={{ background: v.bg, borderColor: v.border }} />
                  {v.label}
                </span>
              ))}
            </div>
          </div>

          {/* Group by ward */}
          {(activeWard === 'All' ? wards.slice(1) : [activeWard]).map(w => {
            const wBeds = filtered.filter(b => b.ward === w);
            if (wBeds.length === 0) return null;
            return (
              <div key={w} className="mb-5">
                <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: WARD_COLOR[w] }}>
                  {w} Ward
                </p>
                <div className="flex flex-wrap gap-2">
                  {wBeds.map(bed => {
                    const style = BED_STYLE[bed.status];
                    return (
                      <div key={bed.id}
                        title={bed.patient ? `${bed.id} — ${bed.patient} (since ${bed.since})` : `${bed.id} — ${style.label}`}
                        className="w-14 h-14 rounded-xl flex flex-col items-center justify-center cursor-pointer transition hover:scale-110 hover:shadow-md border-2"
                        style={{ background: style.bg, borderColor: style.border }}>
                        <MdBed className="w-5 h-5 mb-0.5" style={{ color: style.color }} />
                        <span className="text-xs font-bold" style={{ color: style.color }}>
                          {bed.id.split('-')[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
