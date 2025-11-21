import type React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // This login function already has navigate inside on success
      await login(username, password);
      // ← DO NOT CALL navigate() HERE — it's already inside login()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("गलत युजरनेम वा पासवर्ड");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block w-16 h-16 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
              रा
            </div>
            <h1 className="text-3xl font-bold text-slate-900">प्रशासक लगइन</h1>
            <p className="text-slate-600 mt-2 font-medium">
              श्री सरस्वती बाल बोधिनी माध्यमिक विद्यालय
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                युजरनेम
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-400">👤</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50"
                  placeholder="admin"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                पासवर्ड
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-400">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition bg-slate-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm font-medium">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95 text-lg"
            >
              {loading ? "🔄 लगइन गर्दै..." : "🔓 लगइन गर्नुहोस्"}
            </button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-slate-600 text-sm mt-8">
            केवल प्रशासकहरूको लागि
          </p>
        </div>
      </div>
    </div>
  );
}
