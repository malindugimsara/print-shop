import { FiUpload, FiFileText, FiPrinter, FiHelpCircle } from "react-icons/fi";

export default function Test() {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] text-[#1E1E1E] px-6 py-8 relative z-10 pt-20 pb-16">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#2C3E50] tracking-wide">
          Welcome to PrintShop
        </h1>

        <div className="px-4 py-2 rounded-lg bg-[#D16BA5] text-white font-semibold shadow-md hover:opacity-90 cursor-pointer transition">
          My Account
        </div>
      </header>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <ActionCard
            icon={<FiUpload size={28} />}
            title="Upload Documents"
            description="Send files for printing instantly."
            color="#48CAE4"
          />

          <ActionCard
            icon={<FiPrinter size={28} />}
            title="Place a Print Order"
            description="Customize and submit a new print job."
            color="#D16BA5"
          />

          <ActionCard
            icon={<FiFileText size={28} />}
            title="My Orders"
            description="Check your ongoing and past orders."
            color="#FFD166"
          />

          <ActionCard
            icon={<FiHelpCircle size={28} />}
            title="Help & Support"
            description="Get assistance from our support team."
            color="#2C3E50"
          />

        </div>
      </section>

      {/* Recent Orders */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">
          Recent Orders
        </h2>

        <div className="bg-white shadow-md rounded-xl border border-[#E0E0E0] p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#2C3E50] font-semibold border-b border-[#E0E0E0]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Document Name</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              <OrderRow id="PS-1023" name="Project Report.pdf" status="Completed" date="22 Nov 2025" />
              <OrderRow id="PS-1024" name="Invoice_44.pdf" status="In Progress" date="23 Nov 2025" />
              <OrderRow id="PS-1025" name="Poster Final.png" status="Pending" date="24 Nov 2025" />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ActionCard({ icon, title, description, color }) {
  return (
    <div
      className="p-6 rounded-xl shadow-md bg-white border border-[#E0E0E0] hover:shadow-xl transition cursor-pointer"
      style={{ borderTop: `5px solid ${color}` }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20`, color: color }}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-1 text-[#2C3E50]">{title}</h3>
      <p className="text-sm text-[#1E1E1E] opacity-70">{description}</p>
    </div>
  );
}

function OrderRow({ id, name, status, date }) {
  const getStatusColor = () => {
    if (status === "Completed") return "text-green-600";
    if (status === "In Progress") return "text-[#D16BA5]";
    return "text-yellow-600";
  };

  return (
    <tr className="border-b border-[#E0E0E0] hover:bg-[#F8F9FA] transition">
      <td className="py-3">{id}</td>
      <td className="py-3">{name}</td>
      <td className={`py-3 font-semibold ${getStatusColor()}`}>{status}</td>
      <td className="py-3">{date}</td>
    </tr>
  );
}
