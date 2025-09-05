const NavbarSkeleton = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200/80 shadow-sm animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Skeleton */}
          <div className="h-8 w-32 bg-gray-300 rounded"></div>

          {/* Desktop Links Skeleton */}
          <div className="hidden md:flex items-center space-x-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-300 rounded"></div>
            ))}

            {/* User Avatar Skeleton */}
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="md:hidden w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Mobile Menu Skeleton */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex flex-col space-y-4 p-6 bg-white shadow-lg animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-3/4 bg-gray-300 rounded"></div>
          ))}
          <div className="h-10 w-10 bg-gray-300 rounded-full mt-4"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
