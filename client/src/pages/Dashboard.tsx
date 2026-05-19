import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaCheck, FaFloppyDisk, FaPlus } from "react-icons/fa6";
import type { View, WriterView, AdminView } from "@/components/dashboard/types";
import { Sidebar } from "@/components/dashboard/sidebar";
import { OverviewView } from "@/components/dashboard/views/overview-view";
import { NewPostView } from "@/components/dashboard/views/new-post-view";
import { MyPostsView } from "@/components/dashboard/views/my-posts-view";
import { AnalyticsView } from "@/components/dashboard/views/analytics-view";
import { SettingsView } from "@/components/dashboard/views/settings-view";
import { CommentsView } from "@/components/dashboard/views/comments-view";
import { MediaView } from "@/components/dashboard/views/media-view";
import { AdminOverviewView } from "@/components/dashboard/views/admin-overview-view";
import { AdminUsersView } from "@/components/dashboard/views/admin-users-view";
import { AdminPromotionsView } from "@/components/dashboard/views/admin-promotions-view";
import { ReaderOverviewView } from "@/components/dashboard/views/reader-overview-view";
import { useAuth } from "@/context/AuthContext";

const VIEW_LABELS: Record<View, string> = {
  overview: "Overview",
  "new-post": "New Post",
  "my-posts": "My Posts",
  analytics: "Analytics",
  settings: "Settings",
  comments: "Comments",
  media: "Media Library",
  "admin-overview": "Platform Overview",
  "admin-users": "User Management",
  "admin-promotions": "Promotion Requests",
  "reader-overview": "Your Dashboard",
};

const defaultViewByRole: Record<string, View> = {
  ADMIN: "admin-overview",
  WRITER: "overview",
  READER: "reader-overview",
};

const QUILL_STYLES = `
  .ql-toolbar.ql-snow { background: rgba(255,255,255,0.03) !important; border-color: rgba(255,255,255,0.08) !important; border-radius: 16px 16px 0 0 !important; padding: 10px 14px !important; }
  .ql-snow .ql-stroke { stroke: rgba(255,255,255,0.3) !important; }
  .ql-snow .ql-fill { fill: rgba(255,255,255,0.3) !important; }
  .ql-snow .ql-picker { color: rgba(255,255,255,0.4) !important; }
  .ql-snow .ql-picker-options { background: #1a1a1a !important; border-color: rgba(255,255,255,0.08) !important; border-radius: 12px !important; }
  .ql-snow .ql-picker-item:hover { color: #FBBF24 !important; }
  .ql-toolbar.ql-snow .ql-formats button:hover .ql-stroke { stroke: #FBBF24 !important; }
  .ql-toolbar.ql-snow .ql-formats button.ql-active .ql-stroke { stroke: #FBBF24 !important; }
  .ql-toolbar.ql-snow .ql-formats button:hover .ql-fill { fill: #FBBF24 !important; }
  .ql-toolbar.ql-snow .ql-formats button.ql-active .ql-fill { fill: #FBBF24 !important; }
  .ql-container.ql-snow { border: none !important; font-family: 'DM Sans', sans-serif; }
  .ql-editor { min-height: 340px; color: rgba(255,255,255,0.8) !important; font-size: 15px !important; line-height: 1.8 !important; padding: 20px 24px !important; }
  .ql-editor.ql-blank::before { color: rgba(255,255,255,0.2) !important; font-style: normal !important; font-size: 15px; }
  .ql-editor h1, .ql-editor h2, .ql-editor h3 { color: white !important; font-family: 'Playfair Display', serif !important; }
  .ql-editor p { color: rgba(255,255,255,0.75) !important; }
  .ql-editor blockquote { border-left: 3px solid #FBBF24 !important; color: rgba(255,255,255,0.5) !important; padding-left: 16px !important; margin: 16px 0 !important; }
  .ql-editor a { color: #FBBF24 !important; }
  .ql-snow .ql-editor pre.ql-syntax { background: rgba(255,255,255,0.05) !important; color: rgba(255,255,255,0.8) !important; border-radius: 8px !important; }
`;

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const routerNavigate = useNavigate();

  const roleName = user?.role?.name ?? "READER";
  const initialView = defaultViewByRole[roleName] ?? "reader-overview";

  const [currentView, setCurrentView] = useState<View>(initialView);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [publishedToastVisible, setPublishedToastVisible] = useState(false);
  const [savedToastVisible, setSavedToastVisible] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      routerNavigate("/signin");
    }
  }, [user, loading, routerNavigate]);

  useEffect(() => {
    if (user) {
      const newRoleName = user.role?.name ?? "READER";
      setCurrentView(defaultViewByRole[newRoleName] ?? "reader-overview");
    }
  }, [user?.role?.name]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setMobileSidebarOpen(false);
  };

  const showPublishedToast = () => {
    setPublishedToastVisible(true);
    setTimeout(() => setPublishedToastVisible(false), 3000);
  };

  const showSavedToast = () => {
    setSavedToastVisible(true);
    setTimeout(() => setSavedToastVisible(false), 3000);
  };

  const showNewPostButton = roleName === "WRITER" && currentView !== "new-post";

  if (loading || !user) {
    return (
      <div className="h-screen bg-[#0C0C0C] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0C0C0C] flex flex-col font-dm-sans overflow-hidden">
      <style>{QUILL_STYLES}</style>

      {publishedToastVisible && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-500/10 border border-green-500/25 text-green-400 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl backdrop-blur-sm">
          <FaCheck size={12} /> Post published successfully
        </div>
      )}
      {savedToastVisible && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white/5 border border-white/10 text-white/70 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl backdrop-blur-sm">
          <FaFloppyDisk size={12} /> Draft saved
        </div>
      )}

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar mobile currentView={currentView} navigate={navigateTo} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} navigate={navigateTo} />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="sticky top-0 z-20 bg-[#0C0C0C]/90 backdrop-blur-sm border-b border-white/6 px-5 sm:px-8 py-4 flex items-center gap-4">
            <button
              className="lg:hidden text-white/40 hover:text-white/70 transition-colors p-1"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <FaBars size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-white text-base sm:text-lg font-bold truncate font-playfair">
                {VIEW_LABELS[currentView]}
              </h2>
            </div>
            {showNewPostButton && (
              <button
                onClick={() => navigateTo("new-post")}
                className="hidden sm:inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20 shrink-0"
              >
                <FaPlus size={11} /> New Post
              </button>
            )}
          </header>

          <main className="flex-1 px-5 sm:px-8 py-8">
            {currentView === "settings" && <SettingsView />}

            {currentView === "overview" && <OverviewView navigate={(v) => navigateTo(v as WriterView)} />}
            {currentView === "new-post" && (
              <NewPostView onPublish={showPublishedToast} onSaveDraft={showSavedToast} />
            )}
            {currentView === "my-posts" && <MyPostsView navigate={(v) => navigateTo(v as WriterView)} />}
            {currentView === "analytics" && <AnalyticsView />}
            {currentView === "comments" && <CommentsView />}
            {currentView === "media" && <MediaView />}

            {currentView === "admin-overview" && <AdminOverviewView navigate={(v) => navigateTo(v as AdminView)} />}
            {currentView === "admin-users" && <AdminUsersView />}
            {currentView === "admin-promotions" && <AdminPromotionsView />}

            {currentView === "reader-overview" && <ReaderOverviewView />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
