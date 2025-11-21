"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setLoading(false);
      });
  }, []);

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
