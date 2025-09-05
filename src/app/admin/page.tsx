"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  FileText,
  Settings,
  PieChart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Manage everything in one place — users, posts, analytics, and more.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Manage Users */}
          <Card className="rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Manage Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">
                View, edit, assign roles, and manage registered users.
              </p>
              <Link href="/admin/users">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                  Go to Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manage Posts */}
          <Card className="rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-xl">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Manage Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create, edit, delete, and manage featured posts.
              </p>
              <Link href="/admin/posts">
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300">
                  Go to Posts
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Site Analytics */}
          <Card className="rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-xl">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Track website performance, post engagement, and user activity.
              </p>
              <Link href="/admin/analytics">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manage Comments */}
          <Card className="rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Manage Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Review, approve, or delete user comments on posts.
              </p>
              <Link href="/admin/comments">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 transition-all duration-300">
                  Go to Comments
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Site Settings */}
          <Card className="rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-xl">
                <Settings className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Site Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Configure website preferences, appearance, and integrations.
              </p>
              <Link href="/admin/settings">
                <Button className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300">
                  Go to Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
