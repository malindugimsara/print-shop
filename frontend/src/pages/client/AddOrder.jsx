import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";


export default function AddOrder() {
    const [jobID, setJobID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [details, setDetails] = useState("");
    const [needDate, setNeedDate] = useState("");
    const [isGeneratingID, setIsGeneratingID] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        generateJobID();
        loadUserDataFromToken();
    }, []);

    // ---------------------------
    //  Load user data from token
    // ---------------------------
    const loadUserDataFromToken = () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const decoded = jwtDecode(token);

            setName(decoded.name || "");
            setEmail(decoded.email || "");
            setPhoneNumber(decoded.phoneNumber || "");

        } catch (error) {
            console.error("Token decode error:", error);
        }
    };

    // ---------------------------
    //  Auto-generate Job ID
    // ---------------------------
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

    // ---------------------------
    //  Add New Job
    // ---------------------------
    async function handleAddJob() {
        try {
            setShowSpinner(true);

            if (!jobID || !name || !email || !phoneNumber || !details || !needDate) {
                toast.error("Please fill in all required fields.");
                setShowSpinner(false);
                return;
            }

            const job = {
                jobID,
                name,
                email,
                phoneNumber,
                details,
                needDate,
                status: "Pending", // always pending
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
            navigate("/myorder", { replace: true });
        } catch (error) {
            setShowSpinner(false);
            toast.error(error.response?.data?.message || "Failed to add job.");
            console.error("Error adding job:", error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 pt-20">
            <div className="w-full max-w-lg shadow-2xl rounded-2xl flex flex-col items-center bg-white p-8">

                <h1 className="text-4xl font-extrabold text-[#2C3E50] mb-8 drop-shadow-lg">Add Job</h1>

                {/* Job ID */}
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job ID (Auto-generated)
                    </label>
                    <input
                        value={isGeneratingID ? "Generating..." : jobID}
                        readOnly
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 text-gray-600"
                        type="text"
                    />
                </div>

                {/* Name */}
                <input
                    value={name}
                    readOnly
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-gray-100 cursor-not-allowed"
                    placeholder="Name"
                    type="text"
                />

                {/* Email */}
                <input
                    value={email}
                    readOnly
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-gray-100 cursor-not-allowed"
                    placeholder="Email"
                    type="email"
                />

                {/* Phone Number */}
                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-16 border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-gray-100 cursor-not-allowed"
                    type="number"
                    placeholder="Phone Number"
                />

                {/* Details */}
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full h-20 border border-gray-300 rounded-lg px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Details"
                />

                {/* Need Date */}
                <div className="relative w-full mb-4">
                    <input
                        type="date"
                        value={needDate}
                        onChange={(e) => setNeedDate(e.target.value)}
                        className="peer w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none"
                    />
                    <label className="absolute left-4 top-3 px-2 text-gray-500 transition-all duration-200 
                                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 
                                    peer-valid:-top-2 peer-valid:text-xs">
                        Need Date
                    </label>
                </div>


                

                {/* Submit */}
                <button
                    onClick={handleAddJob}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-4 shadow-md"
                    disabled={showSpinner}
                >
                    {showSpinner ? "Adding..." : "Add Job"}
                </button>

                {/* Cancel */}
                <Link
                    to={"/admin/"}
                    className="w-full h-12 bg-gray-400 hover:bg-gray-500 text-[#1E1E1E] font-semibold rounded-lg flex items-center justify-center shadow-md"
                >
                    Cancel
                </Link>

            </div>
        </div>
    );
}
