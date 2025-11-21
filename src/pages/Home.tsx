"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";
import SchoolBuildingImg from "../assets/modern-school-building-with-bright-sunlight-educat.jpg";
import StudentsImg from "../assets/happy-students-studying-together-in-classroom-lear.jpg";
import AchievementImg from "../assets/achievements-awards-celebration-success-trophy.jpg";

interface Notice {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      title: "शिक्षाको ज्योति",
      desc: "गुणस्तरीय शिक्षाबाट उज्यालो भविहानी",
      emoji: "🔆",
      image: SchoolBuildingImg,
    },
    {
      title: "विद्यार्थी जीवन",
      desc: "सिकाइ, खेलकुद र रचनात्मकता",
      emoji: "🎓",
      image: StudentsImg,
    },
    {
      title: "हाम्रो गर्व",
      desc: "राष्ट्रिय स्तरका उत्कृष्ट नतिजा",
      emoji: "🏆",
      image: AchievementImg,
    },
  ];

  useEffect(() => {
    api.get("/notices").then((res) => setNotices(res.data.slice(0, 6)));
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <>
      <section className="relative h-96 sm:h-[500px] overflow-hidden rounded-b-3xl shadow-2xl">
        {carouselImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition duration-1000 ease-in-out ${
              currentSlide === i ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${img.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-slate-900/75 via-slate-900/60 to-teal-900/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
              <div className="text-6xl sm:text-8xl mb-4">{img.emoji}</div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                {img.title}
              </h2>
              <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mb-8">
                {img.desc}
              </p>
              <Link
                to="/about"
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transform hover:scale-105 transition active:scale-95"
              >
                थप जान्नुहोस्
              </Link>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition ${
                currentSlide === i
                  ? "w-8 bg-amber-500"
                  : "w-3 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "🏫",
                title: "हाम्रो बारे",
                path: "/about",
                desc: "विद्यालयको इतिहास",
              },
              {
                icon: "👨‍🏫",
                title: "शिक्षकहरू",
                path: "/faculty",
                desc: "अनुभवी शिक्षकवर्ग",
              },
              {
                icon: "📢",
                title: "सूचनाहरू",
                path: "/notices",
                desc: "नवीनतम घोषणा",
              },
              {
                icon: "🖼️",
                title: "ग्यालेरी",
                path: "/gallery",
                desc: "क्षणहरू साझा गर्नुहोस्",
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-slate-100 hover:border-amber-300 transition hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              नवीनतम सूचनाहरू
            </h2>
            <p className="text-lg text-slate-600">
              विद्यालयका महत्त्वपूर्ण घोषणाहरू
            </p>
            <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-slate-500">
                  📋 हाल कुनै सूचना उपलब्ध छैन
                </p>
              </div>
            ) : (
              notices.map((n, idx) => (
                <div
                  key={n._id}
                  className="bg-linear-to-br from-slate-50 to-white rounded-xl shadow-lg hover:shadow-2xl border border-slate-200 hover:border-amber-300 p-6 transition"
                >
                  <div
                    className={`w-1 h-16 rounded-full mb-4 bg-linear-to-b ${
                      idx % 2 === 0
                        ? "from-amber-500 to-orange-600"
                        : "from-teal-500 to-cyan-600"
                    }`}
                  ></div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">📅 {n.date}</p>
                  <p className="text-slate-700 leading-relaxed line-clamp-3">
                    {n.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {notices.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/notices"
                className="inline-block px-8 py-4 bg-linear-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition active:scale-95"
              >
                सबै सूचनाहरू हेर्नुहोस् →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
