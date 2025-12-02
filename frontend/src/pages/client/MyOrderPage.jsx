import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiFileText,
  FiPlus,
  FiEye,
} from "react-icons/fi";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/job", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const filteredOrder = response.data.filter(
          (order) => order.email === email
        );
        setOrders(filteredOrder);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleTrackNew = () => {
    navigate("/home");
  };

  // STATUS COLORS
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "In Progress":
      case "Out for Delivery":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FiCheckCircle className="text-green-600" />;
      case "In Progress":
      case "Out for Delivery":
        return <FiTruck className="text-blue-600" />;
      case "Pending":
        return <FiClock className="text-yellow-600" />;
      default:
        return <FiPackage className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-20 pb-10">
      <div className="container mx-auto px-5 max-w-6xl">

        {/* PAGE TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-[#2C3E50]">
            Your Orders
          </h1>
          <p className="text-lg text-[#2C3E50]/70 mt-3">
            Track and manage all your print orders in one place
          </p>
        </div>

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#2C3E50]">
              Order Summary
            </h2>
            <p className="text-sm text-[#2C3E50]/60">
              {orders.length} total orders
            </p>
          </div>

          <button
            onClick={handleTrackNew}
            className="flex items-center gap-2 bg-[#D16BA5] hover:bg-[#b8558e] text-white px-6 py-3 rounded-lg transition"
          >
            <FiPlus /> Track New Order
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl shadow-sm p-6">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <FiPackage className="text-6xl text-[#2C3E50]/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#2C3E50]">No Orders Yet</h3>
              <p className="text-[#2C3E50]/60 mt-2">
                Once you place an order, it will appear here.
              </p>

              <button
                onClick={handleTrackNew}
                className="mt-6 bg-[#48CAE4] hover:bg-[#3ab4ca] text-white px-5 py-2 rounded-lg transition"
              >
                Create Your First Order
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E0E0E0] text-[#2C3E50] font-semibold">
                    <th className="py-4 px-4">Tracking #</th>
                    <th className="py-4 px-4">Recipient</th>
                    <th className="py-4 px-4">Details</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Delivery</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.jobID}
                      className="border-b border-[#E0E0E0] hover:bg-[#F8F9FA] transition"
                    >
                      <td className="py-4 px-4 font-mono text-sm text-[#1E1E1E]">
                        {order.jobID}
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-medium">{order.name}</p>
                        <p className="text-sm text-[#2C3E50]/60">{order.email}</p>
                      </td>

                      <td className="py-4 px-4 text-[#2C3E50]/70">
                        {order.details}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getStatusBadgeColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-[#2C3E50] font-medium">
                        {new Date(order.needDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          {/* Statistics Cards */}
<div className="grid md:grid-cols-3 gap-8 mt-12">

  {/* Total Orders */}
  <div className="group bg-[##E0E0E0] backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-pink-400 hover:border-pink-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-pink-500/20">
    <div className="inline-flex items-center justify-center p-4 bg-pink-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
      <FiPackage className="text-3xl text-pink-300" />
    </div>

    <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
      {orders.length}
    </div>

    <div className="text-[#1E1E1E] text-xl font-semibold mb-4">Total Orders</div>

    <div className="w-full bg-white/10 rounded-full h-2">
      <div className="h-2 rounded-full w-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-1000"></div>
    </div>

    <div className="mt-4 text-sm text-[#1E1E1E]">All-time packages</div>
  </div>

  {/* Delivered */}
  <div className="group bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-green-400 hover:border-green-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-green-500/20">
    <div className="inline-flex items-center justify-center p-4 bg-green-400/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
      <FiCheckCircle className="text-3xl text-green-300" />
    </div>

    <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
      {orders.filter(order => order.status === 'Completed').length}
    </div>

    <div className="text-[#1E1E1E] text-xl font-semibold mb-4">Completed</div>

    <div className="w-full bg-white/10 rounded-full h-2">
      <div 
        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000"
        style={{
          width: `${
            orders.length > 0
              ? (orders.filter(order => order.status === 'Completed').length / orders.length) * 100
              : 0
            }%`
        }}
      ></div>
    </div>

    <div className="mt-4 text-sm text-[#1E1E1E]">Successfully completed</div>
  </div>

  {/* In Progress */}
  <div className="group bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-blue-400 hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-blue-500/20">
    <div className="inline-flex items-center justify-center p-4 bg-blue-400/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
      <FiTruck className="text-3xl text-blue-300" />
    </div>

    <div className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-3">
      {orders.filter(order =>
        ['In Transit', 'Out for Delivery', 'Pending'].includes(order.status)
      ).length}
    </div>

    <div className="text-[#1E1E1E] text-xl font-semibold mb-4">In Progress</div>

    <div className="w-full bg-white/10 rounded-full h-2">
      <div 
        className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000"
        style={{
          width: `${
            orders.length > 0
              ? (orders.filter(order =>
                  ['In Transit', 'Out for Delivery', 'Pending'].includes(order.status)
                ).length / orders.length) * 100
              : 0
            }%`
        }}
      ></div>
    </div>

    <div className="mt-4 text-sm text-[#1E1E1E]">Currently shipping</div>
  </div>

</div>

      </div>
      
    </div>
  );
};

export default MyOrdersPage;
