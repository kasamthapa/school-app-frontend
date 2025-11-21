export default function Faculty() {
  const teachers = [
    { name: "कृष्णप्रसाद आचार्य", subject: "नेपाली", emoji: "📝" },
    { name: "गिता शर्मा", subject: "अंग्रेजी", emoji: "🌍" },
    { name: "शिवराज पौडेल", subject: "गणित", emoji: "🔢" },
    { name: "राधा कुमाल", subject: "विज्ञान", emoji: "🔬" },
    { name: "मोहनलाल गुप्ता", subject: "सामाजिक", emoji: "📚" },
    { name: "पवित्रा ढकाल", subject: "कम्प्युटर", emoji: "💻" },
  ];

  return (
    <section className="py-20 bg-linear-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            हाम्रा शिक्षकहरू
          </h2>
          <p className="text-xl text-slate-600">
            अनुभवी, समर्पित र विद्यार्थीप्रेमी शिक्षकवर्ग
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((t, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-slate-100 hover:border-amber-300 transition duration-300 text-center hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition duration-300">
                {t.emoji}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {t.name}
              </h3>
              <div className="inline-block px-4 py-2 bg-linear-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full font-semibold text-sm mb-4">
                {t.subject} शिक्षक
              </div>
              <p className="text-slate-600 leading-relaxed">
                विद्यार्थीहरूलाई प्रेरित गर्ने कुशल शिक्षण शैली
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
