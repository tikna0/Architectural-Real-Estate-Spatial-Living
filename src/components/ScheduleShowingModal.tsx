import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, User, Mail, Phone } from 'lucide-react';
import { Property, BookingDetails } from '../types';
import { sound } from '../utils/audio';

interface ScheduleShowingModalProps {
  properties: Property[];
  selectedProperty?: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleShowingModal: React.FC<ScheduleShowingModalProps> = ({
  properties,
  selectedProperty,
  isOpen,
  onClose
}) => {
  const [propertyId, setPropertyId] = useState(
    selectedProperty ? selectedProperty.id : properties[0]?.id || ''
  );
  const [date, setDate] = useState('2026-10-18');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [showingType, setShowingType] = useState<BookingDetails['type']>('in-person');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  if (!isOpen) return null;

  const currentProperty = properties.find((p) => p.id === propertyId) || properties[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim()) newErrors.name = 'Please provide your full legal name';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!phone.trim()) newErrors.phone = 'Contact telephone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sound.playSnap();
    const code = 'PX-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(code);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Apple Translucent Dimmer */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Surface Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/40 z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 apple-glass border-b border-black/5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0071E3]" />
            <h3 className="text-sm font-semibold text-[#1D1D1F]">
              Private Showing Concierge
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="apple-press p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
              Showing Reserved
            </h4>

            <p className="text-sm text-[#6E6E73] max-w-md mx-auto">
              Your appointment for <strong>{currentProperty?.title}</strong> is confirmed for{' '}
              <strong>{date}</strong> at <strong>{timeSlot}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/5 max-w-xs mx-auto">
              <div className="text-[11px] uppercase tracking-wider text-[#86868B]">
                Private Access Code
              </div>
              <div className="text-2xl font-bold tracking-wider text-[#1D1D1F] font-mono mt-1">
                {referenceCode}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#86868B] pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>A senior architectural partner has been dispatched to facilitate your review.</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="apple-press mt-4 px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#0071E3] hover:bg-[#0077ED] transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Property Selector */}
            <div>
              <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                Target Residence
              </label>
              <select
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F8F9FA] border border-[#E5E5E7] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-[#1D1D1F]"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} — ${p.price.toLocaleString()} ({p.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Showing Type Selector */}
            <div>
              <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                Tour Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'in-person', label: 'Private In-Person' },
                  { id: 'spatial-virtual', label: 'Virtual Spatial' },
                  { id: 'architectural-briefing', label: 'Architect Q&A' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      sound.playSnap();
                      setShowingType(t.id as any);
                    }}
                    className={`apple-press py-2 px-2 text-center rounded-xl text-xs font-medium border transition-all ${
                      showingType === t.id
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                        : 'bg-[#F8F9FA] text-[#6E6E73] border-[#E5E5E7] hover:border-black/20'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F9FA] border border-[#E5E5E7] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F9FA] border border-[#E5E5E7] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-[#1D1D1F]"
                >
                  <option value="10:00 AM">10:00 AM (Morning Light)</option>
                  <option value="1:00 PM">1:00 PM (Direct Solar)</option>
                  <option value="4:30 PM">4:30 PM (Sunset Illumination)</option>
                  <option value="7:00 PM">7:00 PM (Nocturne Lighting)</option>
                </select>
              </div>
            </div>

            {/* Client Credentials */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F9FA] border focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-[#1D1D1F] ${
                    errors.name ? 'border-rose-400' : 'border-[#E5E5E7]'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#1D1D1F] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F9FA] border focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-[#1D1D1F] ${
                      errors.email ? 'border-rose-400' : 'border-[#E5E5E7]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1D1D1F] mb-1">
                    Direct Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F9FA] border focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-[#1D1D1F] ${
                      errors.phone ? 'border-rose-400' : 'border-[#E5E5E7]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="apple-press w-full py-3 rounded-full text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] transition-colors shadow-sm"
              >
                Confirm Showing Schedule
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
