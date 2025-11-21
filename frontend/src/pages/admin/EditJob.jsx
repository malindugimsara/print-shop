import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditJob() {
    const locationData = useLocation();
    const navigate = useNavigate();

    if (!locationData.state) {
        toast.error("No job data found to edit.");
        window.location.href = "/admin/viewjob";
    }

    const [jobID, setJobID] = useState(locationData.state.jobID);
    const [name, setName] = useState(locationData.state.name);
    const [email, setEmail] = useState(locationData.state.email);
    const [address, setAddress] = useState(locationData.state.address);
    const [details, setDetails] = useState(locationData.state.details);
    const [needDate, setNeedDate] = useState(locationData.state.needDate || new Date().toISOString().split("T")[0]);
    const [status, setStatus] = useState(locationData.state.status || "Pending");

    async function handleEditJob() {
        const updatedJob = {
            jobID,
            name,
            email,
            address,
            details,
            needDate,
            status
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/job/" + jobID,
                updatedJob,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            // await axios.post(
            //     import.meta.env.VITE_BACKEND_URL + "/api/job/send-update-email",
            //     updatedJob,
            //     {
            //         headers: {
            //             "Authorization": "Bearer " + token
            //         }
            //     }
            // );

            toast.success("Job edited & Email sent successfully!");
            navigate("/admin/viewjob");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to edit job.");
            console.error(error);
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Edit Job</h1>
                <form className="w-full flex flex-col gap-4">
                    <input
                        disabled
                        value={jobID}
                        onChange={(e) => setJobID(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 text-gray-500 font-semibold"
                        type="text"
                        placeholder="Job ID"
                    />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:border-blue-400 focus:outline-none"
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:border-blue-400 focus:outline-none"
                        type="email"
                        placeholder="E-mail"
                    />
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full h-16 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:border-blue-400 focus:outline-none"
                        placeholder="Address"
                    />
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full h-20 border border-gray-300 rounded-lg px-4 py-2 resize-none focus:border-blue-400 focus:outline-none"
                        placeholder="Details"
                    />
                    <input
                        value={needDate}
                        onChange={(e) => setNeedDate(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:border-blue-400 focus:outline-none"
                        type="date"
                        placeholder="Need Date"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white focus:border-blue-400 focus:outline-none"
                    >
                        <option value="" disabled>Select status</option>
                        <option value="Pending">Pending</option>
                        <option value="In_Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button
                        type="button"
                        onClick={handleEditJob}
                        className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-200 mt-2"
                    >
                        Edit Job
                    </button>
                    <Link
                        to={"/admin/viewjob"}
                        className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg flex items-center justify-center transition duration-200"
                    >
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
}
