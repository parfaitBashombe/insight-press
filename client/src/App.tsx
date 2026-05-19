import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import ArticleDetailPage from "./pages/ArticleDetail";
import VerifyPage from "./pages/Verify";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/Dashboard";

const App: React.FC = () => {
  const location = useLocation();

  const authRoutes = ["/signin", "/signup", "/verify-request", "/dashboard"];
  const shouldHideLayout =
    authRoutes.includes(location.pathname) || location.pathname.startsWith("/articles/");

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/verify-request" element={<VerifyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
