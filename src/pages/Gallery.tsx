"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export default function Gallery() {
  const { user } = useAuth(); // check if logged in
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null); // track deleting image

  const loadImages = async () => {
    try {
      const res = await api.get("/gallery");
      setImages(res.data);
    } catch {
      setImages([]);
      toast.error("ग्यालेरी लोड गर्न असफल भयो");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!user) return toast.error("तपाईंले लगइन गर्नु पर्छ"); // only logged in user
    if (!confirm("के तपाईं साँच्चै यो फोटो मेटाउन चाहनुहुन्छ?")) return;

    try {
      setDeleting(id);
      await api.delete(`/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      toast.success("फोटो मेटाइयो");
    } catch {
      toast.error("फोटो मेटाउन असफल भयो");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-slate-600">⏳ लोड हुँदै...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">ग्यालेरी</h2>
          <p className="text-xl text-slate-600">
            विद्यालयका अविस्मरणीय क्षणहरू
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">🖼️</div>
            <p className="text-2xl text-slate-500">
              अझै कुनै फोटो अपलोड गरिएको छैन
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-video border border-slate-200 hover:border-amber-400"
              >
                <img
                  src={img.imageUrl || "/placeholder.svg"}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Delete button for logged-in users */}
                {user && (
                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deleting === img._id}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg z-10 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting === img._id ? "मेट्दैछ..." : "🗑️ मेटाउनुहोस्"}
                  </button>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold">{img.title}</h3>
                    {img.description && (
                      <p className="text-sm mt-2 opacity-90">
                        {img.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
