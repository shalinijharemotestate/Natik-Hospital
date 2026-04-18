import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdDashboard, MdPeople, MdCalendarToday, MdLocalHospital,
  MdBed, MdReceiptLong, MdNotifications, MdPerson, MdLogout,
  MdExpandMore, MdExpandLess, MdChevronLeft, MdChevronRight,
  MdAdminPanelSettings, MdMedicalServices, MdScience,
  MdLocalPharmacy, MdBarChart, MdSettings, MdVpnKey,
  MdMonitorHeart, MdAttachMoney, MdGroups, MdWarning
} from 'react-icons/md';

const ROLE_MENUS = {
  super_admin: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/admin' },
      { label: 'Daily Summary', path: '/dashboard/admin/daily-summary' },
      { label: 'Revenue Snapshot', path: '/dashboard/admin/revenue-snapshot' },
      { label: 'Bed Occupancy', path: '/dashboard/admin/bed-occupancy' },
    ]},
    { label: 'User & Access', icon: MdVpnKey, children: [
      { label: 'All Users', path: '/dashboard/admin/users' },
      { label: 'Create User', path: '/dashboard/admin/users/create' },
      { label: 'Roles & Permissions', path: '/dashboard/admin/roles' },
      { label: 'Activity Logs', path: '/dashboard/admin/logs' },
    ]},
    { label: 'Doctor Management', icon: MdMedicalServices, children: [
      { label: 'All Doctors', path: '/dashboard/admin/doctors' },
      { label: 'Add Doctor', path: '/dashboard/admin/doctors/add' },
      { label: 'Availability', path: '/dashboard/admin/doctors/availability' },
      { label: 'Doctor Performance', path: '/dashboard/admin/doctors/performance' },
    ]},
    { label: 'Patient Intelligence', icon: MdMonitorHeart, children: [
      { label: 'All Patients', path: '/dashboard/admin/patients' },
      { label: 'Patient History', path: '/dashboard/admin/patients/history' },
      { label: 'Patient Analytics', path: '/dashboard/admin/patients/analytics' },
    ]},
    { label: 'Appointment & OPD', icon: MdCalendarToday, children: [
      { label: 'All Appointments', path: '/dashboard/admin/appointments' },
      { label: 'Book Appointment', path: '/dashboard/admin/appointments/book' },
      { label: 'OPD Records', path: '/dashboard/admin/opd' },
      { label: 'Queue / Token', path: '/dashboard/admin/opd/queue' },
      { label: 'OPD Analytics', path: '/dashboard/admin/opd/analytics' },
    ]},
    { label: 'IPD & Admission', icon: MdBed, children: [
      { label: 'Active Admissions', path: '/dashboard/admin/ipd' },
      { label: 'Admit Patient', path: '/dashboard/admin/ipd/admit' },
      { label: 'Transfers', path: '/dashboard/admin/ipd/transfers' },
      { label: 'Discharge Overview', path: '/dashboard/admin/ipd/discharge' },
      { label: 'IPD Analytics', path: '/dashboard/admin/ipd/analytics' },
    ]},
    { label: 'Bed & Resource', icon: MdLocalHospital, children: [
      { label: 'Bed Status', path: '/dashboard/admin/beds' },
      { label: 'Add / Edit Beds', path: '/dashboard/admin/beds/manage' },
      { label: 'Allocate / Deallocate', path: '/dashboard/admin/beds/allocate' },
      { label: 'Occupancy Analytics', path: '/dashboard/admin/beds/analytics' },
    ]},
    { label: 'Financial', icon: MdAttachMoney, children: [
      { label: 'All Bills', path: '/dashboard/admin/finance/bills' },
      { label: 'Generate Bill', path: '/dashboard/admin/finance/bills/generate' },
      { label: 'Payments', path: '/dashboard/admin/finance/payments' },
      { label: 'Pending Dues', path: '/dashboard/admin/finance/dues' },
      { label: 'Revenue Analytics', path: '/dashboard/admin/finance/analytics' },
    ]},
    { label: 'Reports & Analytics', icon: MdBarChart, children: [
      { label: 'Revenue Reports', path: '/dashboard/admin/reports/revenue' },
      { label: 'Patient Reports', path: '/dashboard/admin/reports/patients' },
      { label: 'Doctor Reports', path: '/dashboard/admin/reports/doctors' },
      { label: 'Bed Utilization', path: '/dashboard/admin/reports/beds' },
      { label: 'Daily Reports', path: '/dashboard/admin/reports/daily' },
      { label: 'Monthly Reports', path: '/dashboard/admin/reports/monthly' },
    ]},
    { label: 'Alerts', icon: MdWarning, children: [
      { label: 'Pending Actions', path: '/dashboard/admin/alerts/pending' },
      { label: 'Critical Alerts', path: '/dashboard/admin/alerts/critical' },
      { label: 'System Notifications', path: '/dashboard/admin/alerts/system' },
    ]},
    { label: 'System Settings', icon: MdSettings, children: [
      { label: 'Hospital Information', path: '/dashboard/admin/settings/hospital' },
      { label: 'Security Settings', path: '/dashboard/admin/settings/security' },
      { label: 'Profile', path: '/dashboard/admin/settings/profile' },
    ]},
  ],

  receptionist: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/reception' },
      { label: 'Today Summary', path: '/dashboard/reception/summary' },
    ]},
    { label: 'Patients', icon: MdPeople, children: [
      { label: 'Register Patient', path: '/dashboard/reception/patients/register' },
      { label: 'Patient List', path: '/dashboard/reception/patients' },
      { label: 'Search Patient', path: '/dashboard/reception/patients/search' },
    ]},
    { label: 'Appointments', icon: MdCalendarToday, children: [
      { label: 'Book Appointment', path: '/dashboard/reception/appointments/book' },
      { label: 'Appointment List', path: '/dashboard/reception/appointments' },
      { label: 'Token / Queue', path: '/dashboard/reception/queue' },
    ]},
    { label: 'OPD', icon: MdMedicalServices, children: [
      { label: "Today's OPD", path: '/dashboard/reception/opd' },
      { label: 'Consultation History', path: '/dashboard/reception/opd/history' },
    ]},
    { label: 'IPD', icon: MdBed, children: [
      { label: 'Admit Patient', path: '/dashboard/reception/ipd/admit' },
      { label: 'Active Admissions', path: '/dashboard/reception/ipd' },
      { label: 'Transfers', path: '/dashboard/reception/ipd/transfers' },
    ]},
    { label: 'Bed Management', icon: MdLocalHospital, children: [
      { label: 'Bed Status', path: '/dashboard/reception/beds' },
      { label: 'Allocate Bed', path: '/dashboard/reception/beds/allocate' },
    ]},
    { label: 'Billing', icon: MdReceiptLong, children: [
      { label: 'Generate Bill', path: '/dashboard/reception/billing/generate' },
      { label: 'All Bills', path: '/dashboard/reception/billing' },
      { label: 'Payments', path: '/dashboard/reception/billing/payments' },
      { label: 'Pending Dues', path: '/dashboard/reception/billing/dues' },
    ]},
    { label: 'Notifications', icon: MdNotifications, children: [
      { label: 'Pending Actions', path: '/dashboard/reception/notifications/pending' },
      { label: 'Alerts', path: '/dashboard/reception/notifications/alerts' },
    ]},
    { label: 'Profile', icon: MdPerson, children: [
      { label: 'My Profile', path: '/dashboard/reception/profile' },
    ]},
  ],

  doctor: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/doctor' },
      { label: 'Today Summary', path: '/dashboard/doctor/summary' },
    ]},
    { label: 'Appointments', icon: MdCalendarToday, children: [
      { label: 'Today Appointments', path: '/dashboard/doctor/appointments/today' },
      { label: 'Appointment List', path: '/dashboard/doctor/appointments' },
    ]},
    { label: 'OPD', icon: MdMedicalServices, children: [
      { label: 'Assigned Patients', path: '/dashboard/doctor/opd' },
      { label: 'Consultation', path: '/dashboard/doctor/opd/consultation' },
      { label: 'Prescription', path: '/dashboard/doctor/opd/prescription' },
      { label: 'Follow-up', path: '/dashboard/doctor/opd/followup' },
    ]},
    { label: 'IPD', icon: MdBed, children: [
      { label: 'My Patients', path: '/dashboard/doctor/ipd' },
      { label: 'Daily Notes', path: '/dashboard/doctor/ipd/notes' },
      { label: 'Treatment Plan', path: '/dashboard/doctor/ipd/treatment' },
    ]},
    { label: 'Lab Requests', icon: MdScience, children: [
      { label: 'Create Request', path: '/dashboard/doctor/lab/request' },
      { label: 'View Reports', path: '/dashboard/doctor/lab/reports' },
    ]},
    { label: 'Patient History', icon: MdMonitorHeart, children: [
      { label: 'Search Patient', path: '/dashboard/doctor/history/search' },
      { label: 'Full Medical History', path: '/dashboard/doctor/history' },
    ]},
    { label: 'Notifications', icon: MdNotifications, children: [
      { label: 'Alerts', path: '/dashboard/doctor/notifications' },
    ]},
    { label: 'Profile', icon: MdPerson, children: [
      { label: 'My Profile', path: '/dashboard/doctor/profile' },
    ]},
  ],

  nurse: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/nurse' },
      { label: "Today's Patients", path: '/dashboard/nurse/summary' },
    ]},
    { label: 'IPD Patients', icon: MdBed, children: [
      { label: 'Assigned Patients', path: '/dashboard/nurse/ipd' },
      { label: 'Patient Details', path: '/dashboard/nurse/ipd/details' },
    ]},
    { label: 'Nursing Notes', icon: MdReceiptLong, children: [
      { label: 'Add Notes', path: '/dashboard/nurse/notes/add' },
      { label: 'View Notes', path: '/dashboard/nurse/notes' },
    ]},
    { label: 'Notifications', icon: MdNotifications, children: [
      { label: 'Alerts', path: '/dashboard/nurse/notifications' },
    ]},
    { label: 'Profile', icon: MdPerson, children: [
      { label: 'My Profile', path: '/dashboard/nurse/profile' },
    ]},
  ],

  lab_technician: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/lab' },
    ]},
    { label: 'Test Orders', icon: MdScience, children: [
      { label: 'All Orders', path: '/dashboard/lab/orders' },
      { label: 'Sample Collection', path: '/dashboard/lab/samples' },
      { label: 'Result Entry', path: '/dashboard/lab/results' },
    ]},
    { label: 'Reports', icon: MdBarChart, children: [
      { label: 'Generate Report', path: '/dashboard/lab/reports/generate' },
      { label: 'All Reports', path: '/dashboard/lab/reports' },
    ]},
    { label: 'Profile', icon: MdPerson, children: [
      { label: 'My Profile', path: '/dashboard/lab/profile' },
    ]},
  ],

  pharmacist: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/pharmacy' },
    ]},
    { label: 'Inventory', icon: MdLocalPharmacy, children: [
      { label: 'All Medicines', path: '/dashboard/pharmacy/inventory' },
      { label: 'Low Stock Alerts', path: '/dashboard/pharmacy/inventory/alerts' },
      { label: 'Expiry Tracking', path: '/dashboard/pharmacy/inventory/expiry' },
    ]},
    { label: 'Dispensing', icon: MdMedicalServices, children: [
      { label: 'Dispense Medicine', path: '/dashboard/pharmacy/dispense' },
      { label: 'History', path: '/dashboard/pharmacy/dispense/history' },
    ]},
    { label: 'Purchase Orders', icon: MdReceiptLong, children: [
      { label: 'All Orders', path: '/dashboard/pharmacy/orders' },
      { label: 'Create Order', path: '/dashboard/pharmacy/orders/create' },
      { label: 'Suppliers', path: '/dashboard/pharmacy/suppliers' },
    ]},
    { label: 'Profile', icon: MdPerson, children: [
      { label: 'My Profile', path: '/dashboard/pharmacy/profile' },
    ]},
  ],

  hr_manager: [
    { label: 'Dashboard', icon: MdDashboard, children: [
      { label: 'Overview', path: '/dashboard/hr' },
    ]},
    { label: 'Staff', icon: MdGroups, children: [
      { label: 'All Staff', path: '/dashboard/hr/staff' },
      { label: 'Add Staff', path: '/dashboard/hr/staff/add' },
    ]},
    { label: 'Attendance', icon: MdCalendarToday, children: [
      { label: 'Today Attendance', path: '/dashboard/hr/attendance' },
      { label: 'Attendance Report', path: '/dashboard/hr/attendance/report' },
    ]},
    { label: 'Payroll', icon: MdAttachMoney, children: [
      { label: 'Process Payroll', path: '/dashboard/hr/payroll' },
      { label: 'Payroll History', path: '/dashboard/hr/payroll/history' },
    ]},
    { label: 'Profile', icon: MdPerson, children: [
      { label: 'My Profile', path: '/dashboard/hr/profile' },
    ]},
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

function MenuItem({ item, collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const Icon = item.icon;

  // Auto-open if any child path matches current URL
  const isActive = item.children.some(c => location.pathname.startsWith(c.path));
  const [open, setOpen] = useState(isActive);

  const handleClick = () => {
    if (item.children.length === 1) {
      // Single child — navigate directly
      navigate(item.children[0].path);
    } else {
      setOpen(o => !o);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
          isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
        }`}
      >
        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}`} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            {item.children.length > 1 && (
              open ? <MdExpandLess className="w-4 h-4 shrink-0" /> : <MdExpandMore className="w-4 h-4 shrink-0" />
            )}
          </>
        )}
      </button>

      {open && !collapsed && item.children.length > 1 && (
        <div className="ml-4 mt-0.5 mb-1 border-l border-blue-600 pl-3 space-y-0.5">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end
              className={({ isActive }) =>
                `block px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-blue-700 font-semibold'
                    : 'text-blue-200 hover:bg-blue-700 hover:text-white'
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
  const normalizedRole = user?.role ? String(user.role).trim().toLowerCase().replace(/[\s-]+/g, '_') : '';
  const menuItems = ROLE_MENUS[normalizedRole] || [];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className="flex flex-col h-screen border-r border-blue-900 shadow-xl transition-all duration-300"
      style={{
        width: collapsed ? '70px' : '256px',
        minWidth: collapsed ? '70px' : '256px',
        background: 'linear-gradient(180deg, #0f2d5e 0%, #1a4a8a 100%)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-blue-700">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg bg-white">
          <MdLocalHospital className="w-5 h-5 text-blue-700" />
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Natik Hospital</p>
            <p className="text-xs text-blue-300 truncate">HIMS</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-blue-300 hover:text-white transition shrink-0 p-1 rounded-lg hover:bg-blue-700"
        >
          {collapsed ? <MdChevronRight className="w-5 h-5" /> : <MdChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="mx-3 mt-3 mb-1 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center shrink-0">
              <MdPerson className="w-4 h-4 text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-blue-300 truncate">{ROLE_LABELS[normalizedRole]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {menuItems.map((item) => (
          <MenuItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-3 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-red-500 hover:text-white transition w-full"
        >
          <MdLogout className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
