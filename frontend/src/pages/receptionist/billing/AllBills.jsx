import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd, MdSearch, MdFilterList, MdReceiptLong,
  MdCalendarToday, MdPerson, MdVisibility, MdPrint
} from 'react-icons/md';

const bills = [
  { id: 'INV-2401', patient: 'Ravi Kumar', patientId: 'PAT-001', type: 'OPD', date: '18 Apr 2026', amount: 1200, paid: 1200, status: 'Paid' },
  { id: 'INV-2402', patient: 'Priya Singh', patientId: 'PAT-002', type: 'OPD', date: '17 Apr 2026', amount: 800, paid: 800, status: 'Paid' },
  { id: 'INV-2403', patient: 'Mohan Das', patientId: 'PAT-003', type: 'IPD', date: '16 Apr 2026', amount: 18500, paid: 10000, status: 'Partial' },
  { id: 'INV-2404', patient: 'Sunita Gupta', patientId: 'PAT-004', type: 'IPD', date: '15 Apr 2026', amount: 24000, paid: 0, status: 'Pending' },
  { id: 'INV-2405', patient: 'Arjun Yadav', patientId: 'PAT-005', type: 'OPD', date: '15 Apr 2026', amount: 1500, paid: 1500, status: 'Paid' },
  { id: 'INV-2406', patient: 'Meena Tiwari', patientId: 'PAT-006', type: 'OPD', date: '18 Apr 2026', amount: 950, paid: 950, status: 'Paid' },
  { id: 'INV-2407', patient: 'Vijay Kumar', patientId: 'PAT-010', type: 'IPD', date: '14 Apr 2026', amount: 35000, paid: 20000, status: 'Partial' },
];

const STATUS_STYLE = {
  Paid:    { bg: '#dcfce7', text: '#14532d' },
  Partial: { bg: '#fef9c3', text: '#854d0e' },
  Pending: { bg: '#fee2e2', text: '#991b1b' },
};

export default function AllBills() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Paid', 'Partial', 'Pending'];

  const filtered = bills.filter(b => {
    const matchSearch = b.patient.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const totalRevenue = bills.reduce((s, b) => s + b.paid, 0);
  const totalDues = bills.reduce((s, b) => s + (b.amount - b.paid), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">All Bills</h1>
            <p className="text-xs text-gray-500 mt-0.5">{bills.length} total invoices</p>
          </div>
          <button onClick={() => navigate('/dashboard/reception/billing/generate')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
            <MdAdd className="w-4 h-4" /> Generate Bill
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Bills', value: bills.length, sub: 'all time', color: '#1d4ed8', bg: '#dbeafe' },
            { label: 'Revenue Collected', value: `₹${(totalRevenue / 1000).toFixed(1)}k`, sub: 'paid amount', color: '#14532d', bg: '#dcfce7' },
            { label: 'Pending Dues', value: `₹${(totalDues / 1000).toFixed(1)}k`, sub: 'outstanding', color: '#991b1b', bg: '#fee2e2' },
            { label: 'Partial Payments', value: bills.filter(b => b.status === 'Partial').length, sub: 'invoices', color: '#854d0e', bg: '#fef9c3' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4 border border-gray-100 shadow-sm" style={{ background: s.bg }}>
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.label}</p>
              <p className="text-xs opacity-60 mt-0.5" style={{ color: s.color }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by patient or invoice ID..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <MdFilterList className="w-4 h-4 text-gray-400" />
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={{ background: filter === f ? '#1d4ed8' : '#f1f5f9', color: filter === f ? '#fff' : '#64748b' }}>
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
                  {['Invoice', 'Patient', 'Type', 'Date', 'Amount', 'Paid', 'Balance', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(b => {
                  const s = STATUS_STYLE[b.status];
                  const balance = b.amount - b.paid;
                  return (
                    <tr key={b.id} className="hover:bg-blue-50/30 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{b.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800 text-sm">{b.patient}</p>
                        <p className="text-xs text-gray-400">{b.patientId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.type === 'IPD' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {b.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <MdCalendarToday className="w-3 h-3" />{b.date}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{b.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-700">₹{b.paid.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-semibold" style={{ color: balance > 0 ? '#dc2626' : '#16a34a' }}>
                        {balance > 0 ? `₹${balance.toLocaleString()}` : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={s}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition" title="View">
                            <MdVisibility className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition" title="Print">
                            <MdPrint className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <MdReceiptLong className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No bills found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
