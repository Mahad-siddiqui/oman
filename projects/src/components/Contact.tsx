import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you. Get in touch with our team for any inquiries or assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Information Cards */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
            <MapPin className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
          <p className="text-gray-600 leading-relaxed">
            Al Qurum Street, Muscat<br />
            Sultanate of Oman<br />
            P.O. Box 1234
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
            <Phone className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
          <p className="text-gray-600 leading-relaxed">
            Reception: +968 2123 4567<br />
            Reservations: +968 2123 4568<br />
            WhatsApp: +968 9123 4567
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
            <Mail className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
          <p className="text-gray-600 leading-relaxed">
            info@omangrandhotel.com<br />
            reservations@omangrandhotel.com<br />
            support@omangrandhotel.com
          </p>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Front Desk:</span>
            <span>24/7 Open</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Restaurant:</span>
            <span>6:00 AM - 11:00 PM</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Room Service:</span>
            <span>24/7 Available</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Concierge:</span>
            <span>24/7 Available</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-7 h-7 text-emerald-600" />
          <h2 className="text-3xl font-bold text-gray-800">Send Us a Message</h2>
        </div>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Thank you for your message! We'll get back to you within 24 hours.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="+968 XXXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject *
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                required
              >
                <option value="">Select a subject</option>
                <option value="reservation">Reservation Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
                <option value="general">General Inquiry</option>
                <option value="event">Event Booking</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
              rows={6}
              placeholder="Tell us how we can help you..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      </div>

      {/* Map */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="h-96 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Map view would be integrated here</p>
            <p className="text-sm text-gray-500 mt-2">Google Maps or similar service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
