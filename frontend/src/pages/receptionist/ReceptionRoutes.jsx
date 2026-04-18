import { Routes, Route } from 'react-router-dom';
import ReceptionDashboard from './ReceptionDashboard';
import TodaySummary from './TodaySummary';

import PatientList from './patients/PatientList';
import RegisterPatient from './patients/RegisterPatient';
import SearchPatient from './patients/SearchPatient';

import AppointmentList from './appointments/AppointmentList';
import BookAppointment from './appointments/BookAppointment';
import TokenQueue from './appointments/TokenQueue';

import TodayOPD from './opd/TodayOPD';
import ConsultationHistory from './opd/ConsultationHistory';

import ActiveAdmissions from './ipd/ActiveAdmissions';
import AdmitPatient from './ipd/AdmitPatient';
import Transfers from './ipd/Transfers';

import BedStatus from './beds/BedStatus';
import AllocateBed from './beds/AllocateBed';

import AllBills from './billing/AllBills';
import GenerateBill from './billing/GenerateBill';
import Payments from './billing/Payments';
import PendingDues from './billing/PendingDues';

import PendingActions from './notifications/PendingActions';
import Alerts from './notifications/Alerts';

import Profile from './Profile';

const ComingSoon = ({ page }) => (
  <div className="p-8 flex items-center justify-center h-full">
    <div className="text-center">
      <p className="text-4xl mb-3">🚧</p>
      <h2 className="text-xl font-bold text-gray-700">{page}</h2>
      <p className="text-gray-400 text-sm mt-1">This module is coming soon</p>
    </div>
  </div>
);

export default function ReceptionRoutes() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route index element={<ReceptionDashboard />} />
      <Route path="summary" element={<TodaySummary />} />

      {/* Patients */}
      <Route path="patients" element={<PatientList />} />
      <Route path="patients/register" element={<RegisterPatient />} />
      <Route path="patients/search" element={<SearchPatient />} />

      {/* Appointments */}
      <Route path="appointments" element={<AppointmentList />} />
      <Route path="appointments/book" element={<BookAppointment />} />
      <Route path="queue" element={<TokenQueue />} />

      {/* OPD */}
      <Route path="opd" element={<TodayOPD />} />
      <Route path="opd/history" element={<ConsultationHistory />} />

      {/* IPD */}
      <Route path="ipd" element={<ActiveAdmissions />} />
      <Route path="ipd/admit" element={<AdmitPatient />} />
      <Route path="ipd/transfers" element={<Transfers />} />

      {/* Bed Management */}
      <Route path="beds" element={<BedStatus />} />
      <Route path="beds/allocate" element={<AllocateBed />} />

      {/* Billing */}
      <Route path="billing" element={<AllBills />} />
      <Route path="billing/generate" element={<GenerateBill />} />
      <Route path="billing/payments" element={<Payments />} />
      <Route path="billing/dues" element={<PendingDues />} />

      {/* Notifications */}
      <Route path="notifications/pending" element={<PendingActions />} />
      <Route path="notifications/alerts" element={<Alerts />} />

      {/* Profile */}
      <Route path="profile" element={<Profile />} />

      {/* Fallback */}
      <Route path="*" element={<ComingSoon page="Reception Module" />} />
    </Routes>
  );
}
