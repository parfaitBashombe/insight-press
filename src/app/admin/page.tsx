import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Manage Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View, edit, or assign roles to registered users.
            </p>
            <Button className="w-full">Go to Users</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Manage Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Create, edit, or delete posts on the website.
            </p>
            <Button className="w-full">Go to Posts</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
