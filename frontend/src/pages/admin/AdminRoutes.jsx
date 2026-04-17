import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const ComingSoon = ({ page }) => (
  <div className="p-8 flex items-center justify-center h-full">
    <div className="text-center">
      <p className="text-4xl mb-3">🚧</p>
      <h2 className="text-xl font-bold text-gray-700">{page}</h2>
      <p className="text-gray-400 text-sm mt-1">This module is coming soon</p>
    </div>
  </div>
);

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route index element={<AdminDashboard />} />
      <Route path="daily-summary" element={<ComingSoon page="Daily Summary" />} />
      <Route path="revenue-snapshot" element={<ComingSoon page="Revenue Snapshot" />} />
      <Route path="bed-occupancy" element={<ComingSoon page="Bed Occupancy" />} />

      {/* User & Access Control */}
      <Route path="users" element={<ComingSoon page="All Users" />} />
      <Route path="users/create" element={<ComingSoon page="Create User" />} />
      <Route path="roles" element={<ComingSoon page="Roles & Permissions" />} />
      <Route path="logs" element={<ComingSoon page="Activity Logs" />} />

      {/* Doctor Management */}
      <Route path="doctors" element={<ComingSoon page="All Doctors" />} />
      <Route path="doctors/add" element={<ComingSoon page="Add Doctor" />} />
      <Route path="doctors/availability" element={<ComingSoon page="Doctor Availability" />} />
      <Route path="doctors/performance" element={<ComingSoon page="Doctor Performance" />} />

      {/* Patient Intelligence */}
      <Route path="patients" element={<ComingSoon page="All Patients" />} />
      <Route path="patients/history" element={<ComingSoon page="Patient History" />} />
      <Route path="patients/analytics" element={<ComingSoon page="Patient Analytics" />} />

      {/* Appointment & OPD Control */}
      <Route path="appointments" element={<ComingSoon page="All Appointments" />} />
      <Route path="appointments/book" element={<ComingSoon page="Book Appointment" />} />
      <Route path="opd" element={<ComingSoon page="OPD Records" />} />
      <Route path="opd/queue" element={<ComingSoon page="Queue / Token Status" />} />
      <Route path="opd/analytics" element={<ComingSoon page="OPD Analytics" />} />

      {/* IPD & Admission Control */}
      <Route path="ipd" element={<ComingSoon page="Active Admissions" />} />
      <Route path="ipd/admit" element={<ComingSoon page="Admit Patient" />} />
      <Route path="ipd/transfers" element={<ComingSoon page="Transfers Tracking" />} />
      <Route path="ipd/discharge" element={<ComingSoon page="Discharge Overview" />} />
      <Route path="ipd/analytics" element={<ComingSoon page="IPD Analytics" />} />

      {/* Bed & Resource Management */}
      <Route path="beds" element={<ComingSoon page="Bed Status" />} />
      <Route path="beds/manage" element={<ComingSoon page="Add / Edit Beds" />} />
      <Route path="beds/allocate" element={<ComingSoon page="Allocate / Deallocate" />} />
      <Route path="beds/analytics" element={<ComingSoon page="Occupancy Analytics" />} />

      {/* Financial Management */}
      <Route path="finance/bills" element={<ComingSoon page="All Bills" />} />
      <Route path="finance/bills/generate" element={<ComingSoon page="Generate Bill" />} />
      <Route path="finance/payments" element={<ComingSoon page="Payments" />} />
      <Route path="finance/dues" element={<ComingSoon page="Pending Dues" />} />
      <Route path="finance/analytics" element={<ComingSoon page="Revenue Analytics" />} />

      {/* Reports & Analytics */}
      <Route path="reports/revenue" element={<ComingSoon page="Revenue Reports" />} />
      <Route path="reports/patients" element={<ComingSoon page="Patient Reports" />} />
      <Route path="reports/doctors" element={<ComingSoon page="Doctor Reports" />} />
      <Route path="reports/beds" element={<ComingSoon page="Bed Utilization" />} />
      <Route path="reports/daily" element={<ComingSoon page="Daily Reports" />} />
      <Route path="reports/monthly" element={<ComingSoon page="Monthly Reports" />} />

      {/* Alerts & Notifications */}
      <Route path="alerts/pending" element={<ComingSoon page="Pending Actions" />} />
      <Route path="alerts/critical" element={<ComingSoon page="Critical Alerts" />} />
      <Route path="alerts/system" element={<ComingSoon page="System Notifications" />} />

      {/* fallback */}
      <Route path="*" element={<ComingSoon page="Admin Module" />} />
    </Routes>
  );
}

