"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });
        if (error) throw error;
        setMessage("✅ Check your email to confirm your account");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("✅ Signed in successfully!");
      }
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage("Redirecting to Google...");

    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            {isSignup ? "Create an account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isSignup
              ? "Sign up to start sharing your stories"
              : "Sign in to continue sharing your stories"}
          </p>
        </div>

        {/* Auth Card */}
        <Card>
          <CardHeader>
            <CardTitle>{isSignup ? "Sign Up" : "Sign In"}</CardTitle>
            <CardDescription>
              {isSignup
                ? "Fill in your details to create a new account"
                : "Enter your email and password to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Message */}
            {message && (
              <div
                className={`mb-2 rounded-md p-2 text-sm ${
                  message.includes("✅") || message.includes("Redirecting")
                    ? "bg-green-50 text-green-700 border border-green-300"
                    : "bg-red-50 text-red-700 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}

            {/* Email/password form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {!isSignup && (
                <div className="text-sm text-right">
                  <a href="#" className="font-medium text-blue-700">
                    Forgot your password?
                  </a>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800"
                disabled={isLoading}
              >
                {isLoading
                  ? isSignup
                    ? "Signing up..."
                    : "Signing in..."
                  : isSignup
                  ? "Sign Up"
                  : "Sign In"}
              </Button>
            </form>

            {/* OR separator */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-t border-gray-300" />
              <span className="mx-2 text-gray-400">or</span>
              <hr className="flex-1 border-t border-gray-300" />
            </div>

            {/* Google Sign-In */}
            <Button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full bg-white border hover:bg-gray-100 text-zinc-600"
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5" />
              {isLoading ? "Redirecting..." : "Sign in with Google"}
            </Button>

            {/* Switch Auth Mode */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="font-medium text-blue-700 cursor-pointer"
                >
                  {isSignup ? "Sign in" : "Sign up for free"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
