import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RegisterPage() {
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    name: "",
    email: initialEmail,
    address: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      })
      .then(() => {
        toast.success("Registration successful!");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        toast.error(err.response?.data?.message || "Registration failed");
      });
  }

  function handleGoogleRegister() {
    console.log("Google register clicked");
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-16 py-10 relative">
        {/* Light CMYK decorative background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-16 left-10 w-64 h-64 bg-cyan-300/40 rotate-12 blur-3xl rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-72 h-72 bg-pink-400/40 -rotate-12 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-52 h-52 bg-yellow-300/40 blur-3xl rounded-full"></div>
        </div>

        <div className="z-10 text-center max-w-md">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
            Join <span className="text-pink-600">PrintShop</span>
          </h1>
          <p className="text-gray-600 text-base lg:text-lg mb-8">
            Create your account and start managing your print orders efficiently.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-gray-700 text-sm">Fast Order Management</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <span className="text-gray-700 text-sm">Easy Print Tracking</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-gray-700 text-sm">Email Notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-50 px-6 lg:px-10 py-10">
        <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1 text-center">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Sign up to get started with PrintShop
          </p>

          <div className="space-y-3 mb-4">
            {["name", "email", "address", "phoneNumber", "password", "confirmPassword"].map(
              (field, i) => (
                <input
                  key={i}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  type={
                    field.toLowerCase().includes("password")
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  placeholder={
                    field === "confirmPassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
              )
            )}
          </div>

          <button
            onClick={handleRegister}
            className="w-full h-10 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-semibold transition-transform hover:scale-[1.02] hover:shadow-md"
          >
            Register
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full h-10 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-pink-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
