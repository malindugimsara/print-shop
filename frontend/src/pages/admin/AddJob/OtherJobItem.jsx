import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

export default function OtherJobItem({ jobData, setJobData, status, setStatus, index }) {
  const [coverItems, setCoverItems] = useState([]);
  const [newCover, setNewCover] = useState("");
  const [showCoverInput, setShowCoverInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editCovers, setEditCovers] = useState({});
  const [selectedCover, setSelectedCover] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  /* ================= LOAD COVERS ================= */
  useEffect(() => {
    async function fetchCovers() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/othercover`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCoverItems(res.data || []);

        if (jobData?.otherCoverType) {
          setSelectedCover(jobData.otherCoverType);
        }
      } catch (err) {
        toast.error("Failed to load other types");
      }
    }

    fetchCovers();
  }, [BACKEND_URL]);

  /* ================= HELPERS ================= */
  const handleChange = (field, value) => {
    setJobData({ ...jobData, [field]: value });
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  /* ================= ADD OTHER ================= */
  async function handleAddCover() {
    if (!newCover.trim()) {
      toast.error("Enter cover name");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/othercover`,
        { name: newCover },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCoverItems((prev) => [...prev, res.data]);
      setNewCover("");
      setShowCoverInput(false);
      toast.success("Other added");
    } catch (err) {
      toast.error("Failed to add other");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UPDATE OTHER ================= */
  async function handleUpdateCover(id) {
    const name = editCovers[id];
    if (!name?.trim()) return toast.error("Invalid name");

    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/otherCover/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCoverItems((prev) =>
        prev.map((c) => (c._id === id ? res.data : c))
      );

      setEditingId(null);
      toast.success("Other updated");
    } catch {
      toast.error("Update failed");
    }
  }

  /* ================= DELETE OTHER ================= */
  async function deleteCover(id) {
    if (!window.confirm("Delete this other?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/othercover/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoverItems((prev) => prev.filter((c) => c._id !== id));
      toast.success("Other deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border">

      <h1 className="text-2xl font-bold text-center mb-6">Other Job</h1>

      {/* Size + Quantity */}
      <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg border">
        <div>
          <label className="font-semibold block mb-2">Size</label>
          {["A3", "A4", "A5", "Other"].map((s) => (
            <label key={s} className="mr-4">
              <input
                type="radio"
                name={`size-${index}`}
                checked={jobData?.size === s}
                onChange={() => handleChange("size", s)}
              />{" "}
              {s}
            </label>
          ))}
        </div>

        <div>
          <label className="font-semibold block mb-2">Quantity</label>
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
        <label className="font-semibold block mb-2">Title</label>
        <input
          className="w-full p-2 border rounded"
            value={jobData?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Other List */}
      <div className="mt-6 p-5 rounded-lg border bg-gray-50">
        <h2 className="font-bold text-lg mb-4 text-pink-600">📄 Other Type</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto">
            {coverItems.map((item) => (
            <div key={item._id} className="flex items-center gap-3 border-b py-1">
                <input
                type="radio"
                name="otherCoverType"
                value={item.name}
                checked={selectedCover === item.name}
                onChange={() => {
                    setSelectedCover(item.name);
                    handleChange("otherCoverType", item.name);
                }}
                />

                <input
                className={`flex-1 p-1 rounded ${
                    editingId !== item._id && "bg-gray-100"
                }`}
                disabled={editingId !== item._id}
                value={editCovers[item._id] ?? item.name}
                onChange={(e) =>
                    setEditCovers({ ...editCovers, [item._id]: e.target.value })
                }
                />

                {editingId === item._id ? (
                <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateCover(item._id)}
                >
                    Save
                </button>
                ) : (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                    setEditingId(item._id);
                    setEditCovers({ [item._id]: item.name });
                    }}
                >
                    <MdOutlineEdit />
                </button>
                )}

                <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteCover(item._id)}
                >
                <MdOutlineDeleteOutline />
                </button>
            </div>
            ))}
        </div>

        {showCoverInput && (
          <div className="flex gap-2 mt-4">
            <input
              value={newCover}
              onChange={(e) => setNewCover(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleAddCover}
              className="bg-blue-500 text-white px-4 rounded"
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        )}

        <button
          onClick={() => setShowCoverInput(!showCoverInput)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Description */}
      <div className="mt-6 bg-gray-50 p-5 rounded-lg border">
        <textarea
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Description"
            value={jobData?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="mt-6 bg-gray-50 p-5 rounded-lg border">
        {["Pending", "In Progress", "Completed"].map((s) => (
          <label key={s} className="mr-4">
            <input
              type="radio"
              name={`jobStatus-${index}`}
            checked={status === s}
              onChange={() => handleStatusChange(s)}
            />{" "}
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}
