import type { Metadata } from "next";

import NewsPageContent from "@/components/news/news-page-content";

export const metadata: Metadata = {
  title: "News",
  description:
    "Browse all articles and posts on InsightPress. Stay up-to-date with technology, design, and web development trends.",
};

export default function NewsPage() {
  return <NewsPageContent />;
}
