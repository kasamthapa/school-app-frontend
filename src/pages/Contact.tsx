/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    try {
      await api.post("/contact", { name, email, subject, message });
      toast.success(
        "तपाईंको सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै सम्पर्क गर्नेछौं।"
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("सन्देश पठाउन असफल भयो। कृपया पुन: प्रयास गर्नुहोस्।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            सम्पर्क गर्नुहोस्
          </h2>
          <p className="text-xl text-slate-600">हामी तपाईंसँग जोडिन आतुर छौं</p>
          <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              {
                icon: "📍",
                title: "ठेगाना",
                content:
                  "श्री सरस्वती बाल बोधिनी माध्यमिक विद्यालय\nमर्खु गाउ \nमकवानपुर \n🇳🇵नेपाल",
              },
              {
                icon: "📞",
                title: "फोन",
                content: "०१-४४२३५६७\n९८४१२३४५६७ (मोबाइल)",
              },
              {
                icon: "📧",
                title: "इमेल",
                content: "info@rastriyamadhyamik.edu.np",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-slate-100 hover:border-amber-300 transition duration-300 hover:-translate-y-2"
              >
                <div className="flex gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              हामीलाई सन्देश पठाउनुहोस्
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  नाम *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="तपाईंको पूरा नाम"
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  इमेल *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@gmail.com"
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  विषय
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="सन्देशको विषय (ऐच्छिक)"
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  सन्देश *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition resize-none bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
              >
                {loading ? "📤 पठाउँदै..." : "📤 सन्देश पठाउनुहोस्"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
