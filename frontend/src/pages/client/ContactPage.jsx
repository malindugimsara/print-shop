import { FiPhone, FiMapPin, FiMail, FiSend } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-28 pb-20 px-6">

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#2C3E50] mb-3">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600">
          We're here to help with all your printing needs.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white/60 backdrop-blur-xl border border-[#E0E0E0] rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all">
          
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Send a Message</h2>

          <form className="space-y-6">
            <div>
              <label className="text-[#1E1E1E] font-semibold text-sm">Full Name</label>
              <input 
                type="text" 
                className="mt-2 w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#48CAE4] focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-[#1E1E1E] font-semibold text-sm">Email</label>
              <input 
                type="email" 
                className="mt-2 w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#48CAE4] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-[#1E1E1E] font-semibold text-sm">Message</label>
              <textarea
                className="mt-2 w-full px-4 py-3 border border-[#E0E0E0] rounded-xl focus:ring-2 focus:ring-[#48CAE4] focus:outline-none h-32 resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#48CAE4] hover:bg-[#2aaecb] text-white font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <FiSend />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">

          {/* Card 1 */}
          <div className="bg-gradient-to-br from-[#D16BA5]/20 to-[#48CAE4]/20 backdrop-blur-xl border border-[#E0E0E0] rounded-3xl shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#D16BA5]/30">
                <FiPhone className="text-[#D16BA5] text-xl" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50]">Phone</h3>
            </div>
            <p className="text-gray-700">+94 77 123 4567</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-[#FFD166]/20 to-[#48CAE4]/20 backdrop-blur-xl border border-[#E0E0E0] rounded-3xl shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#FFD166]/40">
                <FiMapPin className="text-[#FFD166] text-xl" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50]">Location</h3>
            </div>
            <p className="text-gray-700">No.21, Print Street, Colombo, Sri Lanka</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-[#48CAE4]/20 to-[#D16BA5]/20 backdrop-blur-xl border border-[#E0E0E0] rounded-3xl shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#48CAE4]/30">
                <FiMail className="text-[#48CAE4] text-xl" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50]">Email</h3>
            </div>
            <p className="text-gray-700">support@printshop.lk</p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white/70 backdrop-blur-xl border border-[#E0E0E0] rounded-3xl shadow-md h-56 flex items-center justify-center text-gray-500 font-semibold">
            Map will be shown here
          </div>

        </div>

      </div>
    </div>
  );
}
