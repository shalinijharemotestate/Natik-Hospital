import { useState } from 'react';
import {
  MdCheckCircle, MdWarning, MdPerson, MdBed,
  MdReceiptLong, MdCalendarToday, MdClose, MdArrowForward
} from 'react-icons/md';

const initialActions = [
  { id: 1, type: 'billing', title: 'Pending Bill — Sunita Gupta', desc: 'IPD bill of ₹24,000 unpaid for 3 days', priority: 'high', time: '2 hrs ago', path: '/dashboard/reception/billing/dues' },
  { id: 2, type: 'bed', title: 'Bed Allocation Required', desc: 'Newly admitted patient Ravi Kumar (IPD-005) has no bed assigned', priority: 'high', time: '1 hr ago', path: '/dashboard/reception/beds/allocate' },
  { id: 3, type: 'appointment', title: 'Appointment Confirmation Pending', desc: '3 appointments for tomorrow are unconfirmed', priority: 'medium', time: '3 hrs ago', path: '/dashboard/reception/appointments' },
  { id: 4, type: 'patient', title: 'Patient Discharge Pending', desc: 'Arjun Yadav (IPD-006) has been cleared for discharge, billing pending', priority: 'medium', time: '4 hrs ago', path: '/dashboard/reception/billing/generate' },
  { id: 5, type: 'billing', title: 'Partial Payment — Mohan Das', desc: 'Balance of ₹8,500 remaining on INV-2403', priority: 'low', time: '6 hrs ago', path: '/dashboard/reception/billing/dues' },
];

const PRIORITY_STYLE = {
  high:   { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444', label: 'High' },
  medium: { bg: '#fef9c3', text: '#854d0e', dot: '#eab308', label: 'Medium' },
  low:    { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6', label: 'Low' },
};

const TYPE_ICON = { billing: MdReceiptLong, bed: MdBed, appointment: MdCalendarToday, patient: MdPerson };
const TYPE_COLOR = { billing: '#92400e', bed: '#065f46', appointment: '#1d4ed8', patient: '#6b21a8' };
const TYPE_BG = { billing: '#fef3c7', bed: '#d1fae5', appointment: '#dbeafe', patient: '#f3e8ff' };

export default function PendingActions() {
  const [actions, setActions] = useState(initialActions);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'High', 'Medium', 'Low'];

  const filtered = actions.filter(a =>
    filter === 'All' || a.priority === filter.toLowerCase()
  );

  const dismiss = id => setActions(a => a.filter(x => x.id !== id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Pending Actions</h1>
            <p className="text-xs text-gray-500 mt-0.5">{actions.length} items need your attention</p>
          </div>
          <div className="flex items-center gap-2">
            {['High', 'Medium', 'Low'].map(p => {
              const count = actions.filter(a => a.priority === p.toLowerCase()).length;
              const s = PRIORITY_STYLE[p.toLowerCase()];
              return count > 0 ? (
                <span key={p} className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: s.bg, color: s.text }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                  {count} {p}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Filter */}
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
              style={{ background: filter === f ? '#1d4ed8' : '#f1f5f9', color: filter === f ? '#fff' : '#64748b' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Action items */}
        <div className="space-y-3">
          {filtered.map(a => {
            const Icon = TYPE_ICON[a.type];
            const priority = PRIORITY_STYLE[a.priority];
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: TYPE_BG[a.type] }}>
                    <Icon className="w-5 h-5" style={{ color: TYPE_COLOR[a.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{a.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
                      </div>
                      <button onClick={() => dismiss(a.id)}
                        className="text-gray-300 hover:text-gray-500 transition shrink-0">
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: priority.bg, color: priority.text }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: priority.dot }} />
                        {priority.label}
                      </span>
                      <span className="text-xs text-gray-400">{a.time}</span>
                      <a href={a.path}
                        className="ml-auto flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                        Take Action <MdArrowForward className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
            <MdCheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="font-semibold text-gray-600">All clear!</p>
            <p className="text-xs text-gray-400 mt-1">No pending actions at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}
