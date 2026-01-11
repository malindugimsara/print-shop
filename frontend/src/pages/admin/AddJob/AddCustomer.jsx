import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiClipboard, FiPlus } from "react-icons/fi";

export default function AddCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  // ===============================
  // ➕ ADD CUSTOMER
  // ===============================
  async function handleAddCustomer() {
    try {
      if (!customer.name || !customer.phoneNumber) {
        toast.error("Please fill all required fields");
        return;
      }

      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/customer/phoneNumber/${customer.phoneNumber}`
        );
        toast.error("Customer already exists");
        return;
      } catch {}

      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/customer`,
        customer,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Customer added successfully!");

      // Reset form
      setCustomer({
        name: "",
        email: "",
        phoneNumber: "",
      });
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add customer");
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-7 mb-10">
        
        <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-[#D16BA5]/20 rounded-xl">
                <FiPlus className="text-3xl text-[#D16BA5]" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#2C3E50]">Add New Customer</h1>
                <p className="text-gray-600">Register a new customer.</p>
              </div>
            </div>
      {/* <h2 className="text-4xl font-bold text-[#2C3E50]">Add New Customer</h2> */}

      {/* NAME */}
      <div className="mb-5 mt-8 p-5 bg-gray-50 rounded-lg space-y-6 ">
        <label className="block font-semibold text-[#2C3E50] mb-2">
          Customer Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-xl border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
          placeholder="Enter customer name"
        />

        {/* PHONE */}
        <div>
          <label className="block font-semibold text-[#2C3E50] mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            maxLength={10}
            className={`w-xl border rounded-lg p-3 focus:outline-none focus:ring-2
              ${
                !customer.phoneNumber ||
                customer.phoneNumber.length === 10
                  ? "border-gray-300 focus:ring-blue-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
            value={customer.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setCustomer({ ...customer, phoneNumber: value });
            }}
            placeholder="07XXXXXXXX"
          />

          {customer.phoneNumber.length > 0 &&
            customer.phoneNumber.length !== 10 && (
              <p className="text-red-500 text-sm mt-1">
                Phone number must be exactly 10 digits
              </p>
            )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block font-semibold mb-2">Customer Email</label>
          <input
            type="email"
            className="w-xl border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            placeholder="example@email.com"
          />
        </div>
       </div>

      {/* ADD CUSTOMER BUTTON */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleAddCustomer}
          className="bg-blue-300 hover:bg-blue-400 text-black px-6 py-3 rounded-xl shadow border border-black font-semibold transition-colors duration-300"
        >
          + Add New Customer
        </button>
      </div>
    </div>
  );
}
