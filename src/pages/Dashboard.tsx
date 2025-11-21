"use client";

import type React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { convertADtoBS } from "../lib/utils";

interface Notice {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [adDate, setAdDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const { data } = await api.get("/contact");
        setContacts(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.log("No contact messages yet");
      }
    };
    loadContacts();

    const today = new Date();
    const todayAD = today.toISOString().split("T")[0];
    const todayBS = convertADtoBS(today);

    setAdDate(todayAD);
    setDate(todayBS);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAD = e.target.value;
    setAdDate(selectedAD);
    const convertedBS = convertADtoBS(selectedAD);
    setDate(convertedBS);
  };

  const loadNotices = async () => {
    try {
      const { data } = await api.get("/notices");
      setNotices(data);
    } catch {
      toast.error("सूचनाहरू लोड गर्न असफल भयो");
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/notices", { title, content, date: adDate });
      setTitle("");
      setContent("");
      const today = new Date();
      const todayAD = today.toISOString().split("T")[0];
      setAdDate(todayAD);
      setDate(convertADtoBS(today));
      loadNotices();
      toast.success("सूचना सफलतापूर्वक थपियो!");
    } catch {
      toast.error("सूचना थप्न असफल भयो");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("यो सूचना साँच्चै मेटाउने हो?")) return;
    try {
      await api.delete(`/notices/${id}`);
      loadNotices();
      toast.success("सूचना मेटाइयो");
    } catch {
      toast.error("मेटाउन असफल भयो");
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile) return;

    const formData = new FormData();
    formData.append("image", galleryFile);
    formData.append("title", galleryTitle);
    formData.append("description", galleryDesc);

    setUploading(true);
    try {
      await api.post("/gallery", formData);
      toast.success("फोटो सफलतापूर्वक अपलोड भयो!");
      setGalleryTitle("");
      setGalleryDesc("");
      setGalleryFile(null);
    } catch {
      toast.error("फोटो अपलोड असफल भयो");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <header className="bg-linear-to-r from-slate-900 via-teal-900 to-slate-900 text-white shadow-2xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              👨🏻‍💻प्रशासक ड्यासबोर्ड
            </h1>
            <p className="text-slate-300 mt-1 text-sm">
              नमस्ते,{" "}
              <span className="font-bold text-amber-400">{user?.username}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg transform hover:scale-105 transition active:scale-95"
            >
              🏠 मुख्य पृष्ठ
            </button>
            <button
              onClick={logout}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg transform hover:scale-105 transition active:scale-95"
            >
              🚪 लगआउट
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8">
        {/* Notice Management */}
        <div className="lg:col-span-2 space-y-8">
          {/* Add Notice Form */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              ✏️ नयाँ सूचना थप्नुहोस्
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="शीर्षक"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50"
                />
                <div>
                  <input
                    type="date"
                    value={adDate}
                    onChange={handleDateChange}
                    required
                    className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50 w-full"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    मिति (BS):{" "}
                    <span className="font-semibold text-slate-700">{date}</span>
                  </p>
                </div>
              </div>
              <textarea
                placeholder="सूचनाको पूरा विवरण..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
                className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition resize-none bg-slate-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
              >
                {loading ? "✓ थप्दैछ..." : "📤 सूचना प्रकाशित गर्नुहोस्"}
              </button>
            </form>
          </div>

          {/* Display Notices */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              📋 हालका सूचनाहरू
            </h2>
            {notices.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-2xl text-slate-500">
                  📭 कुनै सूचना उपलब्ध छैन
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="border-l-4 border-amber-500 bg-linear-to-r from-slate-50 to-white rounded-xl p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">
                          {notice.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          📅 {convertADtoBS(notice.date)}
                        </p>
                        <p className="text-slate-700 leading-relaxed mt-3">
                          {notice.content}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition transform hover:scale-105 active:scale-95 shrink-0"
                      >
                        🗑️ मेटाउनुहोस्
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Gallery Upload */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200 sticky top-24">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              🖼️ फोटो अपलोड
            </h3>
            <form onSubmit={handleGalleryUpload} className="space-y-5">
              <input
                type="text"
                placeholder="फोटोको शीर्षक"
                value={galleryTitle}
                onChange={(e) => setGalleryTitle(e.target.value)}
                required
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition bg-slate-50"
              />
              <input
                type="text"
                placeholder="छोटो विवरण (ऐच्छिक)"
                value={galleryDesc}
                onChange={(e) => setGalleryDesc(e.target.value)}
                className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition bg-slate-50"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGalleryFile(e.target.files?.[0] || null)}
                required
                className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-lg file:bg-indigo-600 file:text-white file:font-bold hover:file:bg-indigo-700 cursor-pointer"
              />
              <button
                type="submit"
                disabled={uploading || !galleryFile}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
              >
                {uploading ? "📤 अपलोड गर्दै..." : "📸 फोटो अपलोड गर्नुहोस्"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Messages Section */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            💬 सम्पर्क सन्देशहरू
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
            {contacts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-slate-500">
                  📭 अहिलेसम्म कुनै सन्देश आएको छैन
                </p>
              </div>
            ) : (
              contacts.map((msg: any) => (
                <div
                  key={msg._id}
                  className="bg-linear-to-br from-blue-50 to-slate-50 border-l-4 border-blue-500 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <p className="font-bold text-slate-900">{msg.name}</p>
                  <p className="text-sm text-blue-600 mt-1">📧 {msg.email}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    🕐 {new Date(msg.createdAt).toLocaleString("ne-NP")}
                  </p>
                  {msg.subject && (
                    <p className="font-semibold text-slate-800 mt-3">
                      📌 {msg.subject}
                    </p>
                  )}
                  <p className="text-slate-700 mt-2 text-sm line-clamp-3">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
