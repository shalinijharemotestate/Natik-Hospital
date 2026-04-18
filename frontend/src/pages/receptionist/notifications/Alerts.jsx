import { useState } from 'react';
import {
  MdNotifications, MdWarning, MdInfo, MdCheckCircle,
  MdClose, MdBed, MdPerson, MdLocalHospital
} from 'react-icons/md';

const initialAlerts = [
  { id: 1, type: 'critical', icon: MdWarning, title: 'ICU Capacity Warning', desc: 'ICU is at 75% capacity (3 of 4 beds occupied). Consider transfers.', time: '10 min ago', read: false },
  { id: 2, type: 'critical', icon: MdBed, title: 'No Available Beds — General Ward', desc: 'General ward has only 2 beds left. Alert nursing staff.', time: '30 min ago', read: false },
  { id: 3, type: 'warning', icon: MdPerson, title: 'Patient Waiting > 1 Hour', desc: 'Token T-004 (Meena Tiwari) has been waiting for over 60 minutes.', time: '1 hr ago', read: false },
  { id: 4, type: 'warning', icon: MdLocalHospital, title: 'Follow-up Appointments Due', desc: '5 patients have follow-up appointments due today that haven\'t been scheduled.', time: '2 hrs ago', read: true },
  { id: 5, type: 'info', icon: MdInfo, title: 'System Maintenance Tonight', desc: 'Scheduled maintenance from 2:00 AM – 4:00 AM. Plan accordingly.', time: '3 hrs ago', read: true },
  { id: 6, type: 'success', icon: MdCheckCircle, title: 'Backup Completed', desc: 'Daily patient data backup completed successfully.', time: '5 hrs ago', read: true },
];

const ALERT_STYLE = {
  critical: { bg: '#fee2e2', border: '#fca5a5', icon: '#dc2626', badge: '#991b1b', badgeBg: '#fee2e2', label: 'Critical' },
  warning:  { bg: '#fef9c3', border: '#fde68a', icon: '#d97706', badge: '#854d0e', badgeBg: '#fef9c3', label: 'Warning' },
  info:     { bg: '#dbeafe', border: '#93c5fd', icon: '#2563eb', badge: '#1e40af', badgeBg: '#dbeafe', label: 'Info' },
  success:  { bg: '#dcfce7', border: '#86efac', icon: '#16a34a', badge: '#14532d', badgeBg: '#dcfce7', label: 'Success' },
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'critical', 'warning', 'info', 'success'];

  const filtered = alerts.filter(a =>
    filter === 'All' || a.type === filter
  );

  const unreadCount = alerts.filter(a => !a.read).length;

  const markRead = id => setAlerts(a => a.map(x => x.id === id ? { ...x, read: true } : x));
  const dismiss = id => setAlerts(a => a.filter(x => x.id !== id));
  const markAllRead = () => setAlerts(a => a.map(x => ({ ...x, read: true })));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">Alerts</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Type filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition"
              style={{ background: filter === f ? '#1d4ed8' : '#f1f5f9', color: filter === f ? '#fff' : '#64748b' }}>
              {f === 'All' ? 'All' : ALERT_STYLE[f].label}
              {f !== 'All' && (
                <span className="ml-1.5 bg-white bg-opacity-30 rounded-full px-1">
                  {alerts.filter(a => a.type === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Alert list */}
        <div className="space-y-3">
          {filtered.map(a => {
            const style = ALERT_STYLE[a.type];
            const Icon = a.icon;
            return (
              <div key={a.id}
                onClick={() => markRead(a.id)}
                className={`bg-white rounded-2xl border shadow-sm p-5 transition cursor-pointer hover:shadow-md ${!a.read ? 'border-l-4' : 'border border-gray-100'}`}
                style={!a.read ? { borderLeftColor: style.icon } : {}}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: style.bg }}>
                    <Icon className="w-5 h-5" style={{ color: style.icon }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className={`font-semibold text-gray-900 ${!a.read ? '' : 'opacity-70'}`}>{a.title}</p>
                          {!a.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                        </div>
                        <p className={`text-xs text-gray-500 ${!a.read ? '' : 'opacity-60'}`}>{a.desc}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); dismiss(a.id); }}
                        className="text-gray-300 hover:text-gray-500 transition shrink-0">
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
                        style={{ background: style.badgeBg, color: style.badge }}>
                        {style.label}
                      </span>
                      <span className="text-xs text-gray-400">{a.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
            <MdNotifications className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-semibold text-gray-500">No alerts</p>
            <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
