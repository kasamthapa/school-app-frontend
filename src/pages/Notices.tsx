import { useEffect, useState } from "react";
import api from "../lib/api";
import { convertADtoBS } from "../lib/utils";

interface Notice {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    api
      .get("/notices")
      .then((res) => setNotices(res.data))
      .catch(() => setNotices([]));
  }, []);

  return (
    <section className="py-20 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">सूचनाहरू</h2>
          <p className="text-xl text-slate-600">
            विद्यालयका नवीनतम जानकारी तथा घोषणाहरू
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-2xl text-slate-500">हाल कुनै सूचना उपलब्ध छैन</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.map((notice, idx) => (
              <div
                key={notice._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-slate-100 hover:border-amber-300"
              >
                <div
                  className={`h-2 bg-linear-to-r ${
                    idx % 3 === 0
                      ? "from-amber-500 to-orange-600"
                      : idx % 3 === 1
                      ? "from-teal-500 to-cyan-600"
                      : "from-slate-700 to-slate-900"
                  }`}
                ></div>

                <div className="p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">📌</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        📅 {convertADtoBS(notice.date)} (BS) / {notice.date}{" "}
                        (AD)
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-base">
                    {notice.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
