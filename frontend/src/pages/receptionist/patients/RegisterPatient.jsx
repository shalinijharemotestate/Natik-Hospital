import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdPerson, MdPhone, MdEmail, MdHome, MdCalendarToday,
  MdCheckCircle, MdArrowBack, MdSave
} from 'react-icons/md';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other'];
const ID_TYPES = ['Aadhaar', 'PAN', 'Passport', 'Voter ID', 'Driving Licence'];

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

export default function RegisterPatient() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', blood: '',
    phone: '', altPhone: '', email: '',
    address: '', city: '', state: '', pincode: '',
    idType: '', idNumber: '',
    emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    notes: '',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'PAT-' + Date.now().toString().slice(-6);
    setPatientId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Patient Registered!</h2>
          <p className="text-gray-500 text-sm mb-4">
            {form.firstName} {form.lastName} has been successfully registered.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-blue-500 font-medium">Patient ID</p>
            <p className="text-2xl font-bold text-blue-700 font-mono">{patientId}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', dob: '', gender: '', blood: '', phone: '', altPhone: '', email: '', address: '', city: '', state: '', pincode: '', idType: '', idNumber: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '', notes: '' }); }}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Register Another
            </button>
            <button
              onClick={() => navigate('/dashboard/reception/appointments/book')}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
            <MdArrowBack className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Register New Patient</h1>
            <p className="text-xs text-gray-500 mt-0.5">Fill in patient details to create a record</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdPerson className="w-5 h-5 text-blue-600" /> Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First Name" required>
              <input required value={form.firstName} onChange={set('firstName')} placeholder="First name" className={inputCls} />
            </Field>
            <Field label="Last Name" required>
              <input required value={form.lastName} onChange={set('lastName')} placeholder="Last name" className={inputCls} />
            </Field>
            <Field label="Date of Birth" required>
              <input required type="date" value={form.dob} onChange={set('dob')} className={inputCls} />
            </Field>
            <Field label="Gender" required>
              <select required value={form.gender} onChange={set('gender')} className={inputCls}>
                <option value="">Select gender</option>
                {GENDERS.map(g => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Blood Group">
              <select value={form.blood} onChange={set('blood')} className={inputCls}>
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdPhone className="w-5 h-5 text-blue-600" /> Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Phone Number" required>
              <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" maxLength={10} className={inputCls} />
            </Field>
            <Field label="Alternate Phone">
              <input type="tel" value={form.altPhone} onChange={set('altPhone')} placeholder="Alternate number" maxLength={10} className={inputCls} />
            </Field>
            <Field label="Email Address">
              <input type="email" value={form.email} onChange={set('email')} placeholder="patient@email.com" className={inputCls} />
            </Field>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdHome className="w-5 h-5 text-blue-600" /> Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Field label="Street Address">
                <input value={form.address} onChange={set('address')} placeholder="House no., street, area" className={inputCls} />
              </Field>
            </div>
            <Field label="City">
              <input value={form.city} onChange={set('city')} placeholder="City" className={inputCls} />
            </Field>
            <Field label="State">
              <input value={form.state} onChange={set('state')} placeholder="State" className={inputCls} />
            </Field>
            <Field label="PIN Code">
              <input value={form.pincode} onChange={set('pincode')} placeholder="6-digit PIN" maxLength={6} className={inputCls} />
            </Field>
          </div>
        </div>

        {/* ID Proof */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdEmail className="w-5 h-5 text-blue-600" /> ID Proof
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="ID Type">
              <select value={form.idType} onChange={set('idType')} className={inputCls}>
                <option value="">Select ID type</option>
                {ID_TYPES.map(i => <option key={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="ID Number">
              <input value={form.idNumber} onChange={set('idNumber')} placeholder="ID number" className={inputCls} />
            </Field>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MdCalendarToday className="w-5 h-5 text-blue-600" /> Emergency Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Contact Name">
              <input value={form.emergencyName} onChange={set('emergencyName')} placeholder="Full name" className={inputCls} />
            </Field>
            <Field label="Contact Phone">
              <input type="tel" value={form.emergencyPhone} onChange={set('emergencyPhone')} placeholder="Phone number" className={inputCls} />
            </Field>
            <Field label="Relation">
              <input value={form.emergencyRelation} onChange={set('emergencyRelation')} placeholder="e.g. Spouse, Parent" className={inputCls} />
            </Field>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <Field label="Additional Notes">
            <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Allergies, pre-existing conditions, special notes..." className={inputCls} />
          </Field>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pb-6">
          <button type="button" onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white shadow hover:shadow-md transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
            <MdSave className="w-4 h-4" /> Register Patient
          </button>
        </div>
      </form>
    </div>
  );
}
