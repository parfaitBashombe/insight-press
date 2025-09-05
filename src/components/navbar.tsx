"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes, FaBars } from "react-icons/fa";
import { ArrowRight, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { UserData } from "@/lib/types/user-data";
import { useAtom } from "jotai";
import { userAtom, userDataAtom } from "@/lib/store/user-data-store";
import NavbarSkeleton from "./skeletons/navbar";

const links = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      setUser(data.user);
      const result = await fetchUserData(data.user?.id as string);
      setUserData(result);
    }
    if (error) throw new Error("Server error");
  };

  const fetchUserData = async (auth_id: string) => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("users")
        .select("*, roles(*, role_permissions(*, permissions(*)))")
        .eq("id", auth_id)
        .single();

      if (data) {
        return data as UserData;
      }
    } catch (error) {
      console.dir(error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email: string | undefined) => {
    if (!email) return "U";
    return email
      .split("@")[0]
      .split(".")
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return <NavbarSkeleton />;

  const firstSegment = "/" + pathname.split("/")[1];

  return (
    <nav
      className={
        "sticky top-0 z-50 transition-all duration-300 bg-white backdrop-blur-xl border-b border-gray-200/80 shadow-sm"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-extrabold text-blue-600 tracking-tight"
          >
            InsightPress
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {(userData?.roles.name === "admin"
              ? [...links, { name: "Admin", href: "/admin" }]
              : links
            ).map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-gray-600 hover:text-blue-600 transition-colors group ${
                    firstSegment === link.href
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${
                      firstSegment === link.href ? "scale-x-100" : ""
                    }`}
                  ></span>
                </Link>
              );
            })}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="overflow-hidden w-10 h-10 bg-accent rounded-full flex items-center justify-center cursor-pointer">
                    {user.user_metadata?.picture ? (
                      <img
                        src={user.user_metadata.picture}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(user?.email)
                    )}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/signin"
                className="group inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 whitespace-nowrap"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-30 h-[100vh]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-[100vh] w-3/4 bg-white shadow-lg px-6 py-8 flex flex-col justify-between transform transition-transform duration-300">
            <div className="flex flex-col space-y-6">
              {(userData?.roles.name === "admin"
                ? [...links, { name: "Admin", href: "/admin" }]
                : links
              ).map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative text-gray-600 hover:text-blue-600 transition-colors group ${
                      firstSegment === link.href
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${
                        firstSegment === link.href ? "scale-x-100" : ""
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className="flex items-center flex-wrap gap-2">
                    <span className="overflow-hidden w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      {user.user_metadata?.picture ? (
                        <img
                          src={user.user_metadata.picture}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(user?.email)
                      )}
                    </span>
                    <span>{user.email}</span>
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/signin"
                className="group inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 w-full whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                <span> Sign In</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
