// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Notices from "./pages/Notices";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="notices" element={<Notices />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/test" element={<Test />} />
        {/* Admin Routes */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
