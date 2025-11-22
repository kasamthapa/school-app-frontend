"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { X, Trash2, AlertCircle } from "lucide-react";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export default function Gallery() {
  const { user } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

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
    if (!user) return toast.error("तपाईंले लगइन गर्नु पर्छ");

    try {
      setDeleting(id);
      await api.delete(`/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      toast.success("फोटो मेटाइयो");
      setShowDeleteConfirm(null);
    } catch {
      toast.error("फोटो मेटाउन असफल भयो");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">लोड हुँदै...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-linear-to-br from-slate-50 via-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">
            विद्यालय संग्रह
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            ग्यालेरी
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            विद्यालयका अविस्मरणीय क्षणहरू र स्मृतिहरू एक ठाउँमा संरक्षित
          </p>
          <div className="h-1 w-24 bg-linear-to-r from-amber-400 via-amber-500 to-orange-500 mx-auto mt-8 rounded-full"></div>
        </div>

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-4">
            <div className="w-24 h-24 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-slate-800 mb-2">
              फोटो अभी उपलब्ध छैन
            </p>
            <p className="text-slate-500">
              नयाँ फोटो अपलोड गरेर सुरु गर्नुहोस्
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="group h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-slate-100 hover:border-amber-300"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={img.imageUrl || "/placeholder.svg"}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-lg font-bold leading-snug line-clamp-2">
                        {img.title}
                      </h3>
                      {img.description && (
                        <p className="text-sm mt-2 opacity-90 line-clamp-2">
                          {img.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {user && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(img._id);
                      }}
                      disabled={deleting === img._id}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <X size={24} className="text-slate-900" />
              </button>

              {/* Image */}
              <div className="bg-slate-100 max-h-96 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.imageUrl || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  {selectedImage.title}
                </h2>
                {selectedImage.description && (
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>
                )}

                {user && (
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(selectedImage._id);
                    }}
                    disabled={deleting === selectedImage._id}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    <Trash2 size={20} />
                    {deleting === selectedImage._id
                      ? "मेट्दैछ..."
                      : "मेटाउनुहोस्"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteConfirm(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
              फोटो मेटाउन निश्चित?
            </h3>
            <p className="text-slate-600 text-center mb-6">
              यो क्रिया स्थायी छ र पूर्ववत गर्न सकिँदैन।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-colors duration-200"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={deleting === showDeleteConfirm}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting === showDeleteConfirm ? "मेट्दैछ..." : "मेटाउनुहोस्"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
