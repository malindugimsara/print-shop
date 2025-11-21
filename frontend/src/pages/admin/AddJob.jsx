import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddJob() {
    const [jobID, setJobID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState("");
    const [needDate, setNeedDate] = useState("");
    const [status, setStatus] = useState("");
    const [isGeneratingID, setIsGeneratingID] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        generateJobID();
    }, []);

    const generateJobID = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/job",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const existingJobs = response.data;

            let highestNumber = 0;

            existingJobs.forEach(job => {
                if (job.jobID && job.jobID.startsWith("J")) {
                    const numberPart = parseInt(job.jobID.substring(1));
                    if (!isNaN(numberPart) && numberPart > highestNumber) {
                        highestNumber = numberPart;
                    }
                }
            });

            const nextNumber = highestNumber + 1;
            const newJobID = `J${nextNumber.toString().padStart(3, "0")}`;

            setJobID(newJobID);
            setIsGeneratingID(false);
        } catch (error) {
            console.error("Error generating job ID:", error);

            const fallbackNumber = Math.floor(Math.random() * 1000) + 1;
            const fallbackID = `J${fallbackNumber.toString().padStart(3, "0")}`;

            setJobID(fallbackID);
            setIsGeneratingID(false);
            toast.error("Could not fetch existing jobs. Using backup ID.");
        }
    };

    async function handleAddJob() {
        try {
            setShowSpinner(true);

            if (!jobID || !name || !email || !address || !details || !needDate || !status) {
                toast.error("Please fill in all required fields.");
                setShowSpinner(false);
                return;
            }

            const job = {
                jobID,
                name,
                email,
                address,
                details,
                needDate,
                status
            };

            const token = localStorage.getItem("token");

            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/job",
                job,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Job added successfully!");
            setShowSpinner(false);
            navigate("/admin/viewjob", { replace: true });
        } catch (error) {
            setShowSpinner(false);
            toast.error(error.response?.data?.message || "Failed to add job.");
            console.error("Error adding job:", error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">Add Job</h1>
            <div className="w-full max-w-lg shadow-2xl rounded-2xl flex flex-col items-center bg-white p-8">

                {/* Job ID */}
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job ID (Auto-generated)
                    </label>
                    <input
                        value={isGeneratingID ? "Generating..." : jobID}
                        readOnly
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 text-gray-600 focus:outline-none cursor-not-allowed"
                        type="text"
                    />
                </div>

                {/* Name */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Name"
                    type="text"
                />

                {/* Email */}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Email"
                    type="email"
                />

                {/* Address */}
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-16 border border-gray-300 rounded-lg px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Address"
                />

                {/* Details */}
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full h-20 border border-gray-300 rounded-lg px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Details"
                />

                {/* Need Date */}
                <input
                    value={needDate}
                    onChange={(e) => setNeedDate(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    type="date"
                />

                {/* Status */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                    <option value="" disabled>Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                {/* Submit */}
                <button
                    onClick={handleAddJob}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-4 transition duration-200 shadow-md"
                    disabled={showSpinner}
                >
                    {showSpinner ? "Adding..." : "Add Job"}
                </button>

                {/* Cancel */}
                <Link
                    to={"/admin/"}
                    className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg flex items-center justify-center transition duration-200 shadow-md"
                >
                    Cancel
                </Link>

            </div>
        </div>
    );
}
