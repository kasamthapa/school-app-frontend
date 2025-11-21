import schoolTeam from "../assets/team.jpg"; // you'll add this photo later
import Principal from "../assets/PRINCIPAL.jpg";
import Vice_Principal from "../assets/VICE_PRINCIPAL.jpg";

export default function About() {
  return (
    <>
      <section className="py-20 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              हाम्रो नेतृत्व
            </h2>
            <p className="text-xl text-slate-600">
              विद्यालयलाई अगाडि बढाउने दूरदर्शी टिम
            </p>
            <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                name: "रामप्रसाद शर्मा",
                position: "प्रधानाध्यापक",
                image: Principal,
                desc: "२० वर्षभन्दा बढी अनुभव। गुणस्तरीय शिक्षामा अटल प्रतिबद्धता।",
              },
              {
                name: "सीताराम अधिकारी",
                position: "उप-प्रधानाध्यापक",
                image: Vice_Principal,
                desc: "शिक्षा र अनुशासनको सन्तुलनमा निपुण।",
              },
            ].map((leader, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden border border-slate-100 hover:border-amber-300 transition duration-300 hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-30 group-hover:opacity-50 transition"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {leader.name}
                  </h3>
                  <div className="inline-block px-4 py-2 bg-linear-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full font-semibold text-sm mb-4">
                    {leader.position}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {leader.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-linear-to-r from-slate-900 to-teal-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={schoolTeam || "/placeholder.svg"}
              alt="विद्यालय टिम"
              className="w-full h-auto opacity-100 hover:opacity-90 transition"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent flex flex-col items-center justify-end p-12">
              <h3 className="text-3xl font-bold text-white mb-3 text-center">
                हाम्रो सम्पूर्ण टिम
              </h3>
              <p className="text-lg text-slate-200 text-center max-w-2xl">
                एकजुट भएर विद्यार्थीको उज्ज्वल भविष्य निर्माण गर्दै
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
