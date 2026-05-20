import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/Home";
import BlogsPage from "./pages/Blogs";
import ArticleDetailPage from "./pages/ArticleDetail";
import AuthorProfilePage from "./pages/AuthorProfile";
import VerifyPage from "./pages/Verify";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import { ArticlesProvider } from "@/lib/context/articles-context";
import { useAuth } from "@/lib/context/auth-context";

const GuestOnly = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const location = useLocation();

  const authRoutes = ["/signin", "/signup", "/dashboard", "/profile"];
  const shouldHideLayout =
    authRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/articles/") ||
    location.pathname.startsWith("/authors/") ||
    location.pathname === "/verify-request";

  return (
    <ArticlesProvider>
      {!shouldHideLayout && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/authors/:id" element={<AuthorProfilePage />} />
          <Route
            path="/verify-request"
            element={<VerifyPage />}
          />
          <Route
            path="/signin"
            element={
              <GuestOnly>
                <SignInPage />
              </GuestOnly>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestOnly>
                <SignUpPage />
              </GuestOnly>
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {!shouldHideLayout && <Footer />}
    </ArticlesProvider>
  );
};

export default App;
