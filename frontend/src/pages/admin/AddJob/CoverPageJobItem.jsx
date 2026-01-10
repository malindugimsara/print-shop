import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

export default function CoverPageJobItem({ jobData, setJobData, status, setStatus, index }) {
  const [coverItems, setCoverItems] = useState([]);
  const [newCover, setNewCover] = useState("");
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCovers, setEditCovers] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [selectedCover, setSelectedCover] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Load covers from backend
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchCovers() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/cover`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (Array.isArray(res.data)) {
         setCoverItems(res.data); 
        }

         if (jobData?.coverType) {
          setSelectedCover(jobData.coverType);
        }
      } catch (error) {
        toast.error("Failed to load covers");
        console.error(error);
      }
    }

    fetchCovers();
  }, [BACKEND_URL, jobData]);

  
  // Update job data
  const handleChange = (field, value) => {
    setJobData({
      ...jobData,
      [field]: value,
    });
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };


  // Add new cover (Customer pattern)
  async function handleAddCover() {
    try {
      if (!newCover.trim()) {
        toast.error("Please enter cover name");
        return;
      }

      // 🔎 Duplicate check
      try {
        await axios.get(
          `${BACKEND_URL}/api/cover/${newCover}`
        );
        toast.error("Cover already exists");
        return;
      } catch {
        // Not found → OK
      }

      const token = localStorage.getItem("token");

      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/cover`,
        { name: newCover },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCoverItems([...coverItems, res.data]);
      setNewCover("");
      setShowCoverInput(false);

      toast.success("Cover added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add cover");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCover(coverID) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete cover? This action cannot be undone."
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cover/${coverID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCoverItems(prevCovers => prevCovers.filter(c => c._id !== coverID));
      toast.success("Cover deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete cover");
    }
  }

  async function handleUpdateCover(coverID) {
    const newName = editCovers[coverID];

    if (!newName || !newName.trim()) {
      toast.error("Cover name cannot be empty");
      return;
    }

    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/cover/${coverID}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI immediately
      setCoverItems((prev) =>
        prev.map((c) => (c._id === coverID ? res.data : c))
      );

      toast.success("Cover updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cover");
    }
  }

  const handleEditChange = (id, value) => {
    setEditCovers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

 
  // UI
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border">

      {/* Header */}
      <div className="p-4 mb-6 bg-gray-100 rounded-lg text-center">
        <h1 className="text-2xl font-bold">Cover Page</h1>
      </div>

      {/* Size + Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg border">
        <div>
          <label className="font-semibold mb-2 block">Size</label>
          <div className="flex gap-3">
            {["A3", "A4", "Other"].map((s) => (
              <label key={s} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`size-${index}`}
                  checked={jobData?.size === s}
                  onChange={() => handleChange("size", s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold mb-2 block">Quantity</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={jobData?.quantity || ""} 
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
        </div>
      </div>

      {/* Title */}
      <div className="mt-6 bg-gray-50 p-5 rounded-lg border">
        <label className="font-semibold mb-2 block">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={jobData?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Cover list */}
      <div className="mt-6 p-5 rounded-lg border bg-gray-50">
        <h2 className="font-bold text-lg mb-4 text-pink-600">📄 Cover Type</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {coverItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 border-b pb-1"
            >
              {/* RADIO */}
              <input
                type="radio"
                name="coverType"
                value={item.name}
                checked={selectedCover === item.name}
                onChange={() => {
                  setSelectedCover(item.name);
                  handleChange("coverType", item.name);
                }}
              />

              {/* EDITABLE INPUT */}
              <input
                type="text"
                value={editCovers[item._id] ?? item.name}
                disabled={editingId !== item._id}
                onChange={(e) => handleEditChange(item._id, e.target.value)}
                className={`flex-1 p-1  rounded ${
                  editingId !== item._id ? "bg-gray-100" : ""
                }`}
              />

              {/* EDIT / SAVE */}
              {editingId === item._id ? (
                <button
                  onClick={() => {
                    handleUpdateCover(item._id);
                    setEditingId(null);
                  }}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setEditCovers(prev => ({
                      ...prev,
                      [item._id]: item.name,
                    }));
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  <MdOutlineEdit />
                </button>
              )}

              {/* DELETE */}
              <button
                onClick={() => deleteCover(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded mr-5"
              >
                <MdOutlineDeleteOutline />
              </button>
            </div>
          ))}


        </div>

        {showCoverInput && (
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={newCover}
              onChange={(e) => setNewCover(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Enter new cover..."
            />
            <button
              onClick={handleAddCover}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        )}

        <button
          onClick={() => setShowCoverInput(!showCoverInput)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Description */}
      <div className="mt-6 p-5 rounded-lg border bg-gray-50">
        <label className="font-semibold mb-2 block">Description</label>
        <textarea
          rows="5"
          className="w-full p-2 border rounded"
          placeholder="Write job description..."
          value={jobData?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 hover:border-[#48CAE4] transition">
        <label className="block font-semibold text-[#2C3E50] mb-3">Status</label>
        <div className="flex gap-2">
            {["Pending", "In Progress", "Completed"].map((s) => (
                <label key={s} className="flex items-center cursor-pointer p-2 rounded hover:bg-blue-50 transition">
                    <input
                        type="radio"
                        name={`jobStatus-${index}`}
                        checked={status === s}
                        className="mr-2 cursor-pointer w-4 h-4"
                        onChange={() => handleStatusChange(s)}
                    />
                    <span className="text-sm text-[#2C3E50]">{s}</span>
                </label>
            ))}
        </div>
      </div>
    </div>
  );
}
