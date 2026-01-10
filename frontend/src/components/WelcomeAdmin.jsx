// src/components/admin/WelcomeAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import { FaHourglassEnd, FaSpinner, FaCheckCircle } from "react-icons/fa";

export default function WelcomeAdmin() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Admin";

  // State to store jobs
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/job", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Compute job counts
  const summary = { Pending: 0, "In Progress": 0, Completed: 0 };

  jobs.forEach(job => {
    job.items?.forEach(item => {
      if (summary[item.status] !== undefined) {
        summary[item.status]++;
      }
    });
  });

return (
    <div
        className="flex flex-col justify-center items-center h-full p-6"
        style={{
            backgroundImage: 'url("/bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
        }}
    >
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Welcome {userName}! 🎉
        </h1>
        <p className="text-lg text-gray-600 max-w-xl text-center">
            You are logged in as an administrator. Use the left menu to manage users, jobs, and accounts.  
            Have a productive session!
        </p>

        <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
            className="w-40 mt-6"
        />

        {/* Job Summary Cards */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-3xl">
            {loading ? (
                <div className="w-full flex justify-center items-center">
                    <VscLoading className="text-4xl animate-spin text-blue-500" />
                </div>
            ) : (
                <>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg w-48 text-center hover:shadow-xl transition-shadow">
                        <FaHourglassEnd className="text-4xl mx-auto mb-3" />
                        <h2 className="text-xl font-bold">Pending</h2>
                        <p className="text-4xl font-bold mt-3">{summary.Pending}</p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg w-48 text-center hover:shadow-xl transition-shadow">
                        <FaSpinner className="text-4xl mx-auto mb-3" />
                        <h2 className="text-xl font-bold">In Progress</h2>
                        <p className="text-4xl font-bold mt-3">{summary["In Progress"]}</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg w-48 text-center hover:shadow-xl transition-shadow">
                        <FaCheckCircle className="text-4xl mx-auto mb-3" />
                        <h2 className="text-xl font-bold">Completed</h2>
                        <p className="text-4xl font-bold mt-3">{summary.Completed}</p>
                    </div>
                </>
            )}
        </div>
    </div>
);
}
