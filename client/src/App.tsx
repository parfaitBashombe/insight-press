import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import VerifyPage from "./pages/Verify";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
// import AboutPage from "./pages/About";
// import ContactPage from "./pages/Contact";

const App: React.FC = () => {
  const location = useLocation();

  // Define paths where Navbar and Footer should NOT be displayed
  const authRoutes = ["/signin", "/signup", "/verify-request"];
  const shouldHideLayout = authRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {!shouldHideLayout && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/verify-request" element={<VerifyPage />} />

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          */}
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
