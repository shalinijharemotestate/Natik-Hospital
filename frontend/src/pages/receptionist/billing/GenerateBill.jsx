import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdDelete, MdCheckCircle, MdPrint, MdSearch } from 'react-icons/md';

const patients = [
  { id: 'PAT-001', name: 'Ravi Kumar', age: 34, phone: '9876543210' },
  { id: 'PAT-002', name: 'Priya Singh', age: 28, phone: '9123456780' },
  { id: 'PAT-003', name: 'Mohan Das', age: 52, phone: '9988776655' },
  { id: 'PAT-004', name: 'Sunita Gupta', age: 45, phone: '8877665544' },
];

const SERVICE_CATALOG = [
  { name: 'OPD Consultation', rate: 500 },
  { name: 'Follow-up Visit', rate: 300 },
  { name: 'ECG', rate: 400 },
  { name: 'Blood Test (CBC)', rate: 350 },
  { name: 'X-Ray', rate: 600 },
  { name: 'Ultrasound', rate: 1200 },
  { name: 'Injection', rate: 150 },
  { name: 'Dressing', rate: 200 },
  { name: 'Bed Charges (per day)', rate: 1500 },
  { name: 'ICU Charges (per day)', rate: 5000 },
  { name: 'Medicines', rate: 0 },
];

const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

export default function GenerateBill() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [items, setItems] = useState([{ service: '', qty: 1, rate: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [payMode, setPayMode] = useState('Cash');
  const [done, setDone] = useState(false);
  const [invoiceNo] = useState('INV-' + Date.now().toString().slice(-4));

  const results = query.length >= 2
    ? patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.phone.includes(query))
    : [];

  const addItem = () => setItems(i => [...i, { service: '', qty: 1, rate: 0 }]);
  const removeItem = idx => setItems(i => i.filter((_, j) => j !== idx));
  const updateItem = (idx, field, value) => setItems(i => i.map((item, j) => j === idx ? { ...item, [field]: value } : item));

  const subtotal = items.reduce((s, i) => s + (Number(i.qty) * Number(i.rate)), 0);
  const discountAmt = Math.round(subtotal * (Number(discount) / 100));
  const total = subtotal - discountAmt;

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="w-9 h-9 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Bill Generated!</h2>
          <p className="text-gray-500 text-sm mb-5">Invoice for {selectedPatient?.name}</p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Invoice No</span><span className="font-bold text-blue-700 font-mono">{invoiceNo}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-bold text-gray-800">₹{total.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Payment</span><span className="font-semibold text-gray-800">{payMode}</span></div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
              <MdPrint className="w-4 h-4" /> Print
            </button>
            <button onClick={() => navigate('/dashboard/reception/billing')}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
              All Bills
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
            <MdArrowBack className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Generate Bill</h1>
            <p className="text-xs text-gray-500 mt-0.5">Create invoice for patient services</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-3xl mx-auto space-y-5">
        {/* Patient */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="font-bold text-gray-800">Select Patient</h2>
          {!selectedPatient ? (
            <>
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search patient by name or phone..."
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {results.map(p => (
                <button key={p.id} onClick={() => setSelectedPatient(p)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition text-left">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.id} · {p.age} yrs · {p.phone}</p>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div>
                <p className="font-semibold text-blue-800">{selectedPatient.name}</p>
                <p className="text-xs text-blue-600">{selectedPatient.id} · {selectedPatient.age} yrs</p>
              </div>
              <button onClick={() => { setSelectedPatient(null); setQuery(''); }} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Change</button>
            </div>
          )}
        </div>

        {/* Services */}
        {selectedPatient && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Services / Items</h2>
                <button onClick={addItem} className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                  <MdAdd className="w-4 h-4" /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 px-1">
                  <span className="col-span-6">Service</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-center">Rate (₹)</span>
                  <span className="col-span-2 text-right">Amount</span>
                </div>

                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-6">
                      <select value={item.service}
                        onChange={e => {
                          const cat = SERVICE_CATALOG.find(s => s.name === e.target.value);
                          updateItem(idx, 'service', e.target.value);
                          if (cat) updateItem(idx, 'rate', cat.rate);
                        }}
                        className={inputCls}>
                        <option value="">Select service</option>
                        {SERVICE_CATALOG.map(s => <option key={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input type="number" min={1} value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} className={inputCls + ' text-center'} />
                    </div>
                    <div className="col-span-2">
                      <input type="number" min={0} value={item.rate} onChange={e => updateItem(idx, 'rate', e.target.value)} className={inputCls + ' text-center'} />
                    </div>
                    <div className="col-span-1 text-right text-sm font-semibold text-gray-800">
                      ₹{(Number(item.qty) * Number(item.rate)).toLocaleString()}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {items.length > 1 && (
                        <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 transition">
                          <MdDelete className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Discount (%)</span>
                  <input type="number" min={0} max={100} value={discount} onChange={e => setDiscount(e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {discountAmt > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>- ₹{discountAmt.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="text-blue-700">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <h2 className="font-bold text-gray-800">Payment Mode</h2>
              <div className="flex gap-3">
                {['Cash', 'Card', 'UPI', 'Insurance'].map(m => (
                  <button key={m} onClick={() => setPayMode(m)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition"
                    style={{
                      borderColor: payMode === m ? '#1d4ed8' : '#e5e7eb',
                      background: payMode === m ? '#dbeafe' : '#f9fafb',
                      color: payMode === m ? '#1d4ed8' : '#64748b',
                    }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pb-6">
              <button onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button disabled={items.some(i => !i.service) || total === 0}
                onClick={() => setDone(true)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow disabled:opacity-50 hover:shadow-md transition hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0d6ebd)' }}>
                Generate Invoice — ₹{total.toLocaleString()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
