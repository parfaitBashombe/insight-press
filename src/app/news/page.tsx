import { Suspense } from "react";
import SearchBar from "@/components/search-bar";
import NewsFeed from "@/components/news-feed";
import Navbar from "@/components/navbar";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "latest";

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="w-10/12 mx-auto py-12 md:py-20">
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover
          </h1>
          <p className="text-[#5c5853] font-sans mb-8 md:text-lg">
            Search the archive for topics moving the world today.
          </p>
          <SearchBar initialQuery={resolvedSearchParams.q || ""} />
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground border-b border-[#e5e0d8] pb-4 mb-6">
            {resolvedSearchParams.q
              ? `Tracking: "${resolvedSearchParams.q}"`
              : "Top Stories"}
          </h2>
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center text-[#8c857d] font-serif italic text-xl">
                Loading documents...
              </div>
            }
          >
            <NewsFeed query={q} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
