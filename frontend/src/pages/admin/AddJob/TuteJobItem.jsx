import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

export default function TuteJobItem({ jobData = {}, setJobData, status, setStatus, index }) {
  const [coverItems, setCoverItems] = useState([]);
  const [innerItems, setInnerItems] = useState([]);

  const [newCover, setNewCover] = useState("");
  const [newInner, setNewInner] = useState("");

  const [showCoverInput, setShowCoverInput] = useState(false);
  const [showInnerInput, setShowInnerInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [editCovers, setEditCovers] = useState({});
  const [editInners, setEditInners] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [selectedCover, setSelectedCover] = useState("");
  const [selectedInner, setSelectedInner] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Fetch covers and inner pages
  useEffect(() => {
    async function fetchData() {
      try {
        const [coverRes, innerRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/cover`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BACKEND_URL}/api/innerpage`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (Array.isArray(coverRes.data)) setCoverItems(coverRes.data);
        if (Array.isArray(innerRes.data)) setInnerItems(innerRes.data);

        if (jobData?.coverType) setSelectedCover(jobData.coverType);
        if (jobData?.innerPage) setSelectedInner(jobData.innerPage);
      } catch (error) {
        toast.error("Failed to load data");
        console.error(error);
      }
    }

    fetchData();
  }, [BACKEND_URL, jobData]);

  const handleChange = (field, value) => setJobData({ ...jobData, [field]: value });
const handleStatusChange = (value) => {
        setStatus(value);
    };

  // ---------- Cover Handlers ----------
  const handleEditCoverChange = (id, value) => setEditCovers(prev => ({ ...prev, [id]: value }));

  const handleAddCover = async () => {
    if (!newCover.trim()) return toast.error("Please enter cover name");

    try {
      await axios.get(`${BACKEND_URL}/api/cover/${newCover}`);
      return toast.error("Cover already exists");
    } catch { /* not found, ok */ }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/cover`,
        { name: newCover },
        { headers: { Authorization: `Bearer ${token}` } }
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
  };

  const handleUpdateCover = async (id) => {
    const newName = editCovers[id];
    if (!newName || !newName.trim()) return toast.error("Cover name cannot be empty");
    try {
      const res = await axios.put(`${BACKEND_URL}/api/cover/${id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
      setCoverItems(prev => prev.map(c => (c._id === id ? res.data : c)));
      toast.success("Cover updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cover");
    }
  };

  const handleDeleteCover = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cover?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/cover/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setCoverItems(prev => prev.filter(c => c._id !== id));
      toast.success("Cover deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete cover");
    }
  };

  // ---------- Inner Page Handlers ----------
  const handleEditInnerChange = (id, value) => setEditInners(prev => ({ ...prev, [id]: value }));

  const handleAddInner = async () => {
    if (!newInner.trim()) return toast.error("Please enter inner page name");

    try {
      await axios.get(`${BACKEND_URL}/api/innerpage/${newInner}`);
      return toast.error("Inner page already exists");
    } catch { /* not found, ok */ }

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/innerpage`, { name: newInner }, { headers: { Authorization: `Bearer ${token}` } });
      setInnerItems([...innerItems, res.data]);
      setNewInner("");
      setShowInnerInput(false);
      toast.success("Inner page added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add inner page");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInner = async (id) => {
    const newName = editInners[id];
    if (!newName || !newName.trim()) return toast.error("Inner page name cannot be empty");
    try {
      const res = await axios.put(`${BACKEND_URL}/api/innerpage/${id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
      setInnerItems(prev => prev.map(i => (i._id === id ? res.data : i)));
      toast.success("Inner page updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update inner page");
    }
  };

  const handleDeleteInner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inner page?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/innerpage/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setInnerItems(prev => prev.filter(i => i._id !== id));
      toast.success("Inner page deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete inner page");
    }
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md p-6 border">
      {/* Title */}
      <div className="p-4 bg-[#F8F9FA] border border-gray-300 rounded-xl mb-6 flex justify-center items-center">
        <h1 className="text-2xl font-bold text-[#2C3E50]">Tute</h1>
      </div>

    {/* TOP SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F8F9FA] p-6 rounded-xl border">

        {/* Tute Type */}
        <div>
            <label className="block font-semibold mb-2 text-[#2C3E50]">Tute Type</label>
            <div className="space-y-2">
                {["Duplo", "Photocopy"].map(type => (
                <label key={type} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name={`tuteType-${index}`}
                    checked={jobData?.tuteType === type}
                    onChange={() => handleChange("tuteType", type)}
                    />
                    {type}
                </label>
                ))}
            </div>
        </div>

        {/* Size */}
        <div>
            <label className="block font-semibold mb-2 text-[#2C3E50]">Size</label>
            <div className="space-y-2">
                {["A3", "A4", "Other"].map(type => (
                <label key={type} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name={`size-${index}`}
                    checked={jobData?.size === type}
                    onChange={() => handleChange("size", type)}
                    />
                    {type}
                </label>
                ))}
            </div>
        </div>

        {/* Finishing */}
        <div>
            <label className="block font-semibold mb-2 text-[#2C3E50]">Finishing</label>
            <div className="space-y-2">
                {["Center Pin", "Side Pin", "Binding"].map(type => (
                <label key={type} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name={`finishing-${index}`}
                    checked={jobData?.finishing === type}
                    onChange={() => handleChange("finishing", type)}
                    />
                    {type}
                </label>
                ))}
            </div>
        </div>

    </div>

    {/* Quantity + Title */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8F9FA] p-6 rounded-xl border mt-6">

    {/* Quantity */}
    <div>
        <label className="font-semibold text-[#2C3E50]">Quantity</label>
        <input
        type="number"
        className="w-full mt-2 p-2 border rounded-lg focus:border-[#48CAE4]"
        value={jobData?.quantity || ""}              // ✅ controlled
        onChange={(e) => handleChange("quantity", e.target.value)}
        />
    </div>

    {/* Title */}
    <div>
        <label className="font-semibold text-[#2C3E50]">Title</label>
        <input
        type="text"
        className="w-full mt-2 p-2 border rounded-lg focus:border-[#48CAE4]"
        value={jobData?.title || ""}                  // ✅ controlled
        onChange={(e) => handleChange("title", e.target.value)}
        />
    </div>

    </div>


      {/* Cover Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* COVER */}
        <div className="p-5 border rounded-xl">
          <h2 className="text-lg font-bold text-[#D16BA5] mb-3">📄 Cover</h2>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {coverItems.map(item => (
              <div key={item._id} className="flex items-center gap-3 border-b pb-1">
                <input
                  type="radio"
                  name="coverType"
                  value={item.name}
                  checked={selectedCover === item.name}
                  onChange={() => { setSelectedCover(item.name); handleChange("coverType", item.name); }}
                />
                <input type="text" value={editCovers[item._id] ?? item.name} disabled={editingId !== item._id} onChange={e => handleEditCoverChange(item._id, e.target.value)} className={`flex-1 p-1 rounded ${editingId !== item._id ? "bg-gray-100" : ""}`} />
                {editingId === item._id ? (
                  <button onClick={() => { handleUpdateCover(item._id); setEditingId(null); }} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                ) : (
                  <button onClick={() => { setEditingId(item._id); setEditCovers(prev => ({ ...prev, [item._id]: item.name })); }} className="px-2 py-1 bg-blue-500 text-white rounded"><MdOutlineEdit /></button>
                )}
                <button onClick={() => handleDeleteCover(item._id)} className="px-2 py-1 bg-red-500 text-white rounded"><MdOutlineDeleteOutline /></button>
              </div>
            ))}
          </div>

          {showCoverInput && (
            <div className="flex gap-2 mt-4">
              <input type="text" value={newCover} onChange={e => setNewCover(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Enter new cover..." />
              <button onClick={handleAddCover} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">{loading ? "Saving..." : "Add"}</button>
            </div>
          )}
          <button onClick={() => setShowCoverInput(!showCoverInput)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">+ Add Item</button>
        </div>

        {/* INNER PAGES */}
        <div className="p-5 border rounded-xl">
          <h2 className="text-lg font-bold text-[#D16BA5] mb-3">📑 Inner Pages</h2>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {innerItems.map(item => (
              <div key={item._id} className="flex items-center gap-3 border-b pb-1">
                <input
                  type="radio"
                  name="innerPage"
                  value={item.name}
                  checked={selectedInner === item.name}
                  onChange={() => { setSelectedInner(item.name); handleChange("innerPage", item.name); }}
                />
                <input type="text" value={editInners[item._id] ?? item.name} disabled={editingId !== item._id} onChange={e => handleEditInnerChange(item._id, e.target.value)} className={`flex-1 p-1 rounded ${editingId !== item._id ? "bg-gray-100" : ""}`} />
                {editingId === item._id ? (
                  <button onClick={() => { handleUpdateInner(item._id); setEditingId(null); }} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                ) : (
                  <button onClick={() => { setEditingId(item._id); setEditInners(prev => ({ ...prev, [item._id]: item.name })); }} className="px-2 py-1 bg-blue-500 text-white rounded"><MdOutlineEdit /></button>
                )}
                <button onClick={() => handleDeleteInner(item._id)} className="px-2 py-1 bg-red-500 text-white rounded"><MdOutlineDeleteOutline /></button>
              </div>
            ))}
          </div>

          {showInnerInput && (
            <div className="flex gap-2 mt-4">
              <input type="text" value={newInner} onChange={e => setNewInner(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Enter new inner page..." />
              <button onClick={handleAddInner} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">{loading ? "Saving..." : "Add"}</button>
            </div>
          )}
          <button onClick={() => setShowInnerInput(!showInnerInput)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">+ Add Item</button>
        </div>
      </div>

      {/* Description */}
    <div className="mt-6 p-5 border rounded-xl bg-[#F8F9FA]">
    <label className="block font-semibold text-[#2C3E50] mb-2">
        Description
    </label>

    <textarea
        rows="5"
        className="w-full p-3 border rounded-lg focus:border-[#48CAE4]"
        placeholder="Write job description..."
        value={jobData?.description || ""}          // ✅ controlled
        onChange={(e) => handleChange("description", e.target.value)}
    />
    </div>


     {/* Status */}
        <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 hover:border-[#48CAE4] transition mt-6">
            <label className="block font-semibold text-[#2C3E50] mb-3">Status</label>
            <div className="flex gap-2">
                {["Pending", "In Progress", "Completed"].map((s) => (
                    <label key={s} className="flex items-center cursor-pointer p-2 rounded hover:bg-blue-50">
                        <input
                            type="radio"
                            name="jobStatus"
                            className="mr-2"
                            checked={status === s}
                            onChange={() => handleStatusChange(s)}
                        />
                        <span>{s}</span>
                    </label>
                ))}
            </div>
        </div>

    </div>
  );
}
