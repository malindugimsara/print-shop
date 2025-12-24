import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CustomerInfo({ customer, setCustomer }) {

    return (
        <div className="grid grid-cols-1 gap-6 mb-10">

            {/* name */}
            <div>
                <label className="block font-semibold text-[#2C3E50] mb-2">Customer Name <span className="text-red-500">*</span> </label>
                <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
            </div>

            {/* email + Phone + Dates */}
            <div className="grid grid-cols-2 gap-6">

                {/* PHONE */}
                <div>
                    <label className="block font-semibold text-[#2C3E50] mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="tel"
                        minLength={10}
                        className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2
                        ${
                            customer.phoneNumber.length === 0 ||
                            customer.phoneNumber.length === 10
                            ? "border-gray-300 focus:ring-blue-500"
                            : "border-red-500 focus:ring-red-500"
                        }`}
                        value={customer.phoneNumber}
                        onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setCustomer({ ...customer, phoneNumber: value });
                        }}
                    />

                    {customer.phoneNumber.length > 0 &&
                        customer.phoneNumber.length !== 10 && (
                        <p className="text-red-500 text-sm mt-1">
                            Phone number must be exactly 10 digits
                        </p>
                        )}
                </div>


                {/* email */}
                <div>
                    <label className="block font-semibold text-[#2C3E50] mb-2">Customer Email</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                </div>

                {/* JOB DATE */}
                <div>
                    <label className="block font-semibold text-[#2C3E50] mb-2">Job Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={customer.jobDate}
                        onChange={(e) =>
                            setCustomer({ ...customer, jobDate: e.target.value })
                        }
                    />
                </div>

                {/* NEED DATE */}
                <div>
                    <label className="block font-semibold text-[#2C3E50] mb-2">Need Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={customer.needDate}
                        onChange={(e) =>
                            setCustomer({ ...customer, needDate: e.target.value })
                        }
                    />
                </div>
            </div>
        </div>
    );
}
