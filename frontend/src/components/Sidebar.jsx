import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const normalizeRoleKey = (role) => {
  if (!role) return role;
  return String(role).trim().toLowerCase().replace(/[\s-]+/g, '_');
};

const ROLE_MENUS = {
  super_admin: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/admin' },
        { label: 'Daily Summary', path: '/dashboard/admin/daily-summary' },
        { label: 'Revenue Snapshot', path: '/dashboard/admin/revenue-snapshot' },
        { label: 'Bed Occupancy', path: '/dashboard/admin/bed-occupancy' },
      ],
    },
    {
      label: 'User & Access Control', icon: '🔐', children: [
        { label: 'All Users', path: '/dashboard/admin/users' },
        { label: 'Create User', path: '/dashboard/admin/users/create' },
        { label: 'Roles & Permissions', path: '/dashboard/admin/roles' },
        { label: 'Activity Logs', path: '/dashboard/admin/logs' },
      ],
    },
    {
      label: 'Doctor Management', icon: '🩺', children: [
        { label: 'All Doctors', path: '/dashboard/admin/doctors' },
        { label: 'Add Doctor', path: '/dashboard/admin/doctors/add' },
        { label: 'Availability', path: '/dashboard/admin/doctors/availability' },
        { label: 'Doctor Performance', path: '/dashboard/admin/doctors/performance' },
      ],
    },
    {
      label: 'Patient Intelligence', icon: '🧑‍⚕️', children: [
        { label: 'All Patients', path: '/dashboard/admin/patients' },
        { label: 'Patient History', path: '/dashboard/admin/patients/history' },
        { label: 'Patient Analytics', path: '/dashboard/admin/patients/analytics' },
      ],
    },
    {
      label: 'Appointment & OPD Control', icon: '🗂️', children: [
        { label: 'All Appointments', path: '/dashboard/admin/appointments' },
        { label: 'Book Appointment', path: '/dashboard/admin/appointments/book' },
        { label: 'OPD Records', path: '/dashboard/admin/opd' },
        { label: 'Queue / Token Status', path: '/dashboard/admin/opd/queue' },
        { label: 'OPD Analytics', path: '/dashboard/admin/opd/analytics' },
      ],
    },
    {
      label: 'IPD & Admission Control', icon: '🛏️', children: [
        { label: 'Active Admissions', path: '/dashboard/admin/ipd' },
        { label: 'Admit Patient', path: '/dashboard/admin/ipd/admit' },
        { label: 'Transfers Tracking', path: '/dashboard/admin/ipd/transfers' },
        { label: 'Discharge Overview', path: '/dashboard/admin/ipd/discharge' },
        { label: 'IPD Analytics', path: '/dashboard/admin/ipd/analytics' },
      ],
    },
    {
      label: 'Bed & Resource Management', icon: '🏨', children: [
        { label: 'Bed Status', path: '/dashboard/admin/beds' },
        { label: 'Add / Edit Beds', path: '/dashboard/admin/beds/manage' },
        { label: 'Allocate / Deallocate', path: '/dashboard/admin/beds/allocate' },
        { label: 'Occupancy Analytics', path: '/dashboard/admin/beds/analytics' },
      ],
    },
    {
      label: 'Financial Management', icon: '💰', children: [
        { label: 'All Bills', path: '/dashboard/admin/finance/bills' },
        { label: 'Generate Bill', path: '/dashboard/admin/finance/bills/generate' },
        { label: 'Payments', path: '/dashboard/admin/finance/payments' },
        { label: 'Pending Dues', path: '/dashboard/admin/finance/dues' },
        { label: 'Revenue Analytics', path: '/dashboard/admin/finance/analytics' },
      ],
    },
    {
      label: 'Reports & Analytics', icon: '📈', children: [
        { label: 'Revenue Reports', path: '/dashboard/admin/reports/revenue' },
        { label: 'Patient Reports', path: '/dashboard/admin/reports/patients' },
        { label: 'Doctor Reports', path: '/dashboard/admin/reports/doctors' },
        { label: 'Bed Utilization', path: '/dashboard/admin/reports/beds' },
        { label: 'Daily Reports', path: '/dashboard/admin/reports/daily' },
        { label: 'Monthly Reports', path: '/dashboard/admin/reports/monthly' },
      ],
    },
    {
      label: 'Alerts & Notifications', icon: '🔔', children: [
        { label: 'Pending Actions', path: '/dashboard/admin/alerts/pending' },
        { label: 'Critical Alerts', path: '/dashboard/admin/alerts/critical' },
        { label: 'System Notifications', path: '/dashboard/admin/alerts/system' },
      ],
    },
  ],

  receptionist: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/reception' },
        { label: 'Today Summary', path: '/dashboard/reception/summary' },
      ],
    },
    {
      label: 'Patients', icon: '🧑‍⚕️', children: [
        { label: 'Register Patient', path: '/dashboard/reception/patients/register' },
        { label: 'Patient List', path: '/dashboard/reception/patients' },
        { label: 'Search Patient', path: '/dashboard/reception/patients/search' },
      ],
    },
    {
      label: 'Appointments', icon: '📅', children: [
        { label: 'Book Appointment', path: '/dashboard/reception/appointments/book' },
        { label: 'Appointment List', path: '/dashboard/reception/appointments' },
        { label: 'Token / Queue', path: '/dashboard/reception/queue' },
      ],
    },
    {
      label: 'OPD', icon: '🗂️', children: [
        { label: "Today's OPD Patients", path: '/dashboard/reception/opd' },
        { label: 'Consultation History', path: '/dashboard/reception/opd/history' },
      ],
    },
    {
      label: 'IPD', icon: '🛏️', children: [
        { label: 'Admit Patient', path: '/dashboard/reception/ipd/admit' },
        { label: 'Active Admissions', path: '/dashboard/reception/ipd' },
        { label: 'Transfers', path: '/dashboard/reception/ipd/transfers' },
      ],
    },
    {
      label: 'Bed Management', icon: '🏨', children: [
        { label: 'Bed Status', path: '/dashboard/reception/beds' },
        { label: 'Allocate Bed', path: '/dashboard/reception/beds/allocate' },
      ],
    },
    {
      label: 'Billing', icon: '🧾', children: [
        { label: 'Generate Bill', path: '/dashboard/reception/billing/generate' },
        { label: 'All Bills', path: '/dashboard/reception/billing' },
        { label: 'Payments', path: '/dashboard/reception/billing/payments' },
        { label: 'Pending Dues', path: '/dashboard/reception/billing/dues' },
      ],
    },
    {
      label: 'Notifications', icon: '🔔', children: [
        { label: 'Pending Actions', path: '/dashboard/reception/notifications/pending' },
        { label: 'Alerts', path: '/dashboard/reception/notifications/alerts' },
      ],
    },
    {
      label: 'Profile', icon: '👤', children: [
        { label: 'Profile', path: '/dashboard/reception/profile' },
      ],
    },
  ],

  doctor: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/doctor' },
        { label: 'Today Summary', path: '/dashboard/doctor/summary' },
      ],
    },
    {
      label: 'Appointments', icon: '📅', children: [
        { label: 'Today Appointments', path: '/dashboard/doctor/appointments/today' },
        { label: 'Appointment List', path: '/dashboard/doctor/appointments' },
      ],
    },
    {
      label: 'OPD', icon: '🗂️', children: [
        { label: 'Assigned Patients', path: '/dashboard/doctor/opd' },
        { label: 'Consultation', path: '/dashboard/doctor/opd/consultation' },
        { label: 'Prescription', path: '/dashboard/doctor/opd/prescription' },
        { label: 'Follow-up', path: '/dashboard/doctor/opd/followup' },
      ],
    },
    {
      label: 'IPD', icon: '🛏️', children: [
        { label: 'My Patients', path: '/dashboard/doctor/ipd' },
        { label: 'Patient Details', path: '/dashboard/doctor/ipd/details' },
        { label: 'Daily Notes', path: '/dashboard/doctor/ipd/notes' },
        { label: 'Treatment Plan', path: '/dashboard/doctor/ipd/treatment' },
      ],
    },
    {
      label: 'Lab Requests', icon: '🔬', children: [
        { label: 'Create Request', path: '/dashboard/doctor/lab/request' },
        { label: 'View Reports', path: '/dashboard/doctor/lab/reports' },
      ],
    },
    {
      label: 'Patient History', icon: '📋', children: [
        { label: 'Search Patient', path: '/dashboard/doctor/history/search' },
        { label: 'Full Medical History', path: '/dashboard/doctor/history' },
      ],
    },
    {
      label: 'Notifications', icon: '🔔', children: [
        { label: 'Alerts', path: '/dashboard/doctor/notifications/alerts' },
        { label: 'Updates', path: '/dashboard/doctor/notifications/updates' },
      ],
    },
    {
      label: 'Profile', icon: '👤', children: [
        { label: 'Profile', path: '/dashboard/doctor/profile' },
      ],
    },
  ],

  nurse: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/nurse' },
        { label: "Today's Patients", path: '/dashboard/nurse/summary' },
      ],
    },
    {
      label: 'IPD Patients', icon: '🛏️', children: [
        { label: 'Assigned Patients', path: '/dashboard/nurse/ipd' },
        { label: 'Patient Details', path: '/dashboard/nurse/ipd/details' },
      ],
    },
    {
      label: 'Nursing Notes', icon: '📝', children: [
        { label: 'Add Notes', path: '/dashboard/nurse/notes/add' },
        { label: 'View Notes', path: '/dashboard/nurse/notes' },
      ],
    },
    {
      label: 'Notifications', icon: '🔔', children: [
        { label: 'Alerts', path: '/dashboard/nurse/notifications' },
      ],
    },
    {
      label: 'Profile', icon: '👤', children: [
        { label: 'Profile', path: '/dashboard/nurse/profile' },
      ],
    },
  ],

  lab_technician: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/lab' },
      ],
    },
    {
      label: 'Test Orders', icon: '🧪', children: [
        { label: 'All Orders', path: '/dashboard/lab/orders' },
        { label: 'Sample Collection', path: '/dashboard/lab/samples' },
        { label: 'Result Entry', path: '/dashboard/lab/results' },
      ],
    },
    {
      label: 'Reports', icon: '📄', children: [
        { label: 'Generate Report', path: '/dashboard/lab/reports/generate' },
        { label: 'All Reports', path: '/dashboard/lab/reports' },
      ],
    },
    {
      label: 'Profile', icon: '👤', children: [
        { label: 'Profile', path: '/dashboard/lab/profile' },
      ],
    },
  ],

  pharmacist: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/pharmacy' },
      ],
    },
    {
      label: 'Inventory', icon: '📦', children: [
        { label: 'All Medicines', path: '/dashboard/pharmacy/inventory' },
        { label: 'Low Stock Alerts', path: '/dashboard/pharmacy/inventory/alerts' },
        { label: 'Expiry Tracking', path: '/dashboard/pharmacy/inventory/expiry' },
      ],
    },
    {
      label: 'Dispensing', icon: '💊', children: [
        { label: 'Dispense Medicine', path: '/dashboard/pharmacy/dispense' },
        { label: 'Dispensing History', path: '/dashboard/pharmacy/dispense/history' },
      ],
    },
    {
      label: 'Purchase Orders', icon: '🛒', children: [
        { label: 'All Orders', path: '/dashboard/pharmacy/orders' },
        { label: 'Create Order', path: '/dashboard/pharmacy/orders/create' },
        { label: 'Supplier Management', path: '/dashboard/pharmacy/suppliers' },
      ],
    },
    {
      label: 'Profile', icon: '👤', children: [
        { label: 'Profile', path: '/dashboard/pharmacy/profile' },
      ],
    },
  ],

  hr_manager: [
    {
      label: 'Dashboard', icon: '📊', children: [
        { label: 'Overview', path: '/dashboard/hr' },
      ],
    },
    {
      label: 'Staff', icon: '👥', children: [
        { label: 'All Staff', path: '/dashboard/hr/staff' },
        { label: 'Add Staff', path: '/dashboard/hr/staff/add' },
      ],
    },
    {
      label: 'Attendance', icon: '✅', children: [
        { label: 'Today Attendance', path: '/dashboard/hr/attendance' },
        { label: 'Attendance Report', path: '/dashboard/hr/attendance/report' },
      ],
    },
    {
      label: 'Payroll', icon: '💰', children: [
        { label: 'Process Payroll', path: '/dashboard/hr/payroll' },
        { label: 'Payroll History', path: '/dashboard/hr/payroll/history' },
      ],
    },
    {
      label: 'Profile', icon: '👤', children: [
        { label: 'Profile', path: '/dashboard/hr/profile' },
      ],
    },
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

function MenuItem({ item, collapsed, open, onToggle, onNavigate }) {
  const activeChild = useMemo(() => item.children.some((c) => window.location.pathname === c.path), [item.children]);

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        title={collapsed ? item.label : undefined}
        className={[
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150',
          activeChild ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700',
        ].join(' ')}
      >
        <span className="text-lg shrink-0">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            <svg
              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {open && !collapsed && (
        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-blue-100 pl-3">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end
              onClick={onNavigate}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roleKey = normalizeRoleKey(user?.role);
  const menuItems = ROLE_MENUS[roleKey] || [];
  const [openMap, setOpenMap] = useState({});

  useEffect(() => {
    if (collapsed) return;
    // Auto-open the group that contains the current route.
    const match = menuItems.find((g) => g.children.some((c) => location.pathname === c.path));
    if (!match) return;
    setOpenMap((prev) => ({ ...prev, [match.label]: true }));
  }, [collapsed, location.pathname, menuItems]);

  const filteredMenuItems = menuItems;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className="flex flex-col h-screen border-r border-gray-100 shadow-sm transition-all duration-300"
      style={{ width: collapsed ? '72px' : '256px', minWidth: collapsed ? '72px' : '256px' }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-blue-50" />
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-gray-800 truncate">Natik Hospital</p>
            <p className="text-xs text-gray-400 truncate">HIMS</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-blue-600 transition shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        {filteredMenuItems.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            collapsed={collapsed}
            open={!!openMap[item.label]}
            onToggle={() => setOpenMap((prev) => ({ ...prev, [item.label]: !prev[item.label] }))}
            onNavigate={() => {
              if (window.innerWidth < 1024) setCollapsed(true);
            }}
          />
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
