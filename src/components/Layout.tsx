import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/image.png";

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  const navItems = [
    { path: "/", label: "गृहपृष्ठ" },
    { path: "/about", label: "हाम्रो बारे" },
    { path: "/faculty", label: "शिक्षकहरू" },
    { path: "/notices", label: "सूचनाहरू" },
    { path: "/gallery", label: "ग्यालेरी" },
    { path: "/contact", label: "सम्पर्क" },
  ];

  return (
    <>
      <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm sm:text-base">
          <div className="font-semibold">
            श्री सरस्वती बाल बोधिनी माध्यमिक विद्यालय
          </div>
          <div className="text-slate-300">
            फोन: ०१-४४२३५६७ | इमेल: info@school.edu.np
          </div>
        </div>
      </div>

      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-4 min-w-fit">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <img src={Logo || "/placeholder.svg"} alt="logo" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900">
                श्री सरस्वती बाल बोधिनी माध्यमिक विद्यालय
              </h1>
              <p className="text-xs text-amber-600 font-semibold">
                शिक्षा · अनुशासन · विकास
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive(item.path)
                    ? "bg-amber-100 text-amber-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isActive("/admin/dashboard")
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  ड्यासबोर्ड
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition transform hover:scale-105 active:scale-95"
                >
                  लगआउट
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive("/admin/login")
                    ? "bg-slate-700 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                एडमिन
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-md">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isActive(item.path)
                      ? "bg-amber-100 text-amber-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                {user ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        isActive("/admin/dashboard")
                          ? "bg-teal-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      ड्यासबोर्ड
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition transform hover:scale-105 active:scale-95 text-left"
                    >
                      लगआउट
                    </button>
                  </>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      isActive("/admin/login")
                        ? "bg-slate-700 text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    एडमिन
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="mainContent" className="min-h-screen">
        <Outlet />
      </main>

      <footer className="bg-linear-to-b from-slate-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-amber-400">
                विद्यालय
              </h3>
              <p className="text-slate-300 leading-relaxed">
                श्री राष्ट्रिय माध्यमिक विद्यालय
                <br />
                बागबजार, काठमाडौं
                <br />
                नेपाल
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-amber-400">
                उपयोगी लिङ्कहरू
              </h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="text-slate-300 hover:text-amber-400 transition block"
                >
                  गृहपृष्ठ
                </Link>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-amber-400 transition block"
                >
                  हाम्रो बारे
                </Link>
                <Link
                  to="/notices"
                  className="text-slate-300 hover:text-amber-400 transition block"
                >
                  सूचनाहरू
                </Link>
                <Link
                  to="/gallery"
                  className="text-slate-300 hover:text-amber-400 transition block"
                >
                  ग्यालेरी
                </Link>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-amber-400 transition block"
                >
                  सम्पर्क
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-amber-400">सम्पर्क</h3>
              <p className="text-slate-300 leading-relaxed">
                📞 फोन: ०१-४४२३५६७
                <br />
                📧 इमेल: info@school.edu.np
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            © २०८२ श्री सरस्वती बाल बोधिनी माध्यमिक विद्यालय. सर्वाधिकार
            सुरक्षित।
            <br />
            Made with ❤️ by Kasam Thapa Magar
          </div>
        </div>
      </footer>
    </>
  );
}
