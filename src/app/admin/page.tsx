import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Manage everything in one place — users, posts, and more.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
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
                View, edit, or assign roles to registered users with ease.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                Go to Users
              </Button>
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
                Create, edit, or delete posts to keep your website updated.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300">
                Go to Posts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
