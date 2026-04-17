import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_MENUS = {
  super_admin: [
    { label: 'Dashboard', path: '/dashboard/admin', icon: '📊' },
    { label: 'Users', path: '/dashboard/admin/users', icon: '👤' },
    { label: 'Reception', path: '/dashboard/reception', icon: '🏥' },
    { label: 'Doctors', path: '/dashboard/admin/doctors', icon: '🩺' },
    { label: 'OPD', path: '/dashboard/opd', icon: '🗂️' },
    { label: 'IPD', path: '/dashboard/ipd', icon: '🛏️' },
    { label: 'Lab', path: '/dashboard/lab', icon: '🔬' },
    { label: 'Pharmacy', path: '/dashboard/pharmacy', icon: '💊' },
    { label: 'HR', path: '/dashboard/hr', icon: '👥' },
    { label: 'Finance', path: '/dashboard/finance', icon: '💰' },
  ],
  receptionist: [
    { label: 'Dashboard', path: '/dashboard/reception', icon: '📊' },
    { label: 'Register Patient', path: '/dashboard/reception/register', icon: '➕' },
    { label: 'Patient List', path: '/dashboard/reception/patients', icon: '🗂️' },
    { label: 'Appointments', path: '/dashboard/reception/appointments', icon: '📅' },
    { label: 'Billing', path: '/dashboard/reception/billing', icon: '🧾' },
    { label: 'Bed Management', path: '/dashboard/reception/beds', icon: '🛏️' },
  ],
  doctor: [
    { label: 'Dashboard', path: '/dashboard/doctor', icon: '📊' },
    { label: 'My Patients', path: '/dashboard/doctor/patients', icon: '🗂️' },
    { label: 'Appointments', path: '/dashboard/doctor/appointments', icon: '📅' },
    { label: 'Prescriptions', path: '/dashboard/doctor/prescriptions', icon: '📝' },
  ],
  nurse: [
    { label: 'Dashboard', path: '/dashboard/nurse', icon: '📊' },
    { label: 'IPD Patients', path: '/dashboard/nurse/ipd', icon: '🛏️' },
    { label: 'Nursing Notes', path: '/dashboard/nurse/notes', icon: '📝' },
  ],
  lab_technician: [
    { label: 'Dashboard', path: '/dashboard/lab', icon: '📊' },
    { label: 'Test Orders', path: '/dashboard/lab/orders', icon: '🧪' },
    { label: 'Reports', path: '/dashboard/lab/reports', icon: '📄' },
  ],
  pharmacist: [
    { label: 'Dashboard', path: '/dashboard/pharmacy', icon: '📊' },
    { label: 'Inventory', path: '/dashboard/pharmacy/inventory', icon: '📦' },
    { label: 'Dispensing', path: '/dashboard/pharmacy/dispense', icon: '💊' },
    { label: 'Purchase Orders', path: '/dashboard/pharmacy/orders', icon: '🛒' },
  ],
  hr_manager: [
    { label: 'Dashboard', path: '/dashboard/hr', icon: '📊' },
    { label: 'Staff', path: '/dashboard/hr/staff', icon: '👥' },
    { label: 'Attendance', path: '/dashboard/hr/attendance', icon: '✅' },
    { label: 'Payroll', path: '/dashboard/hr/payroll', icon: '💰' },
  ],
};

const ROLE_LABELS = {
  super_admin: 'Super Admin',
  receptionist: 'Receptionist',
  doctor: 'Doctor',
  nurse: 'Nurse',
  lab_technician: 'Lab Technician',
  pharmacist: 'Pharmacist',
  hr_manager: 'HR Manager',
};

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = ROLE_MENUS[user?.role] || [];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className="flex flex-col h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300"
      style={{ width: collapsed ? '72px' : '240px', minWidth: collapsed ? '72px' : '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow"
          style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-800 truncate">Natik Hospital</p>
            <p className="text-xs text-gray-400 truncate">HIMS</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-gray-400 hover:text-blue-600 transition shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
          </svg>
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-2 p-3 rounded-2xl" style={{ background: '#eff6ff' }}>
          <p className="text-xs font-bold text-blue-800 truncate">{user?.name}</p>
          <p className="text-xs text-blue-500 mt-0.5">{ROLE_LABELS[user?.role]}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`
            }
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition w-full"
        >
          <span className="text-lg shrink-0">🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
