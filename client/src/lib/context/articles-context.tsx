import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { getPublicArticles } from "@/lib/api/reader";
import type { PublicArticle } from "@/types/reader";

type BlogSlice = {
  articles: PublicArticle[];
  page: number;
  totalPages: number;
  query: string;
  loading: boolean;
  loadingMore: boolean;
};

type ArticlesContextType = {
  homeArticles: PublicArticle[] | null;
  homeLoading: boolean;
  ensureHome: () => void;
  blog: BlogSlice;
  ensureBlog: () => void;
  updateBlogQuery: (q: string) => void;
  loadMoreBlog: () => void;
};

const ArticlesContext = createContext<ArticlesContextType | null>(null);

const defaultBlog: BlogSlice = {
  articles: [],
  page: 1,
  totalPages: 1,
  query: "",
  loading: false,
  loadingMore: false,
};

export const ArticlesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [homeArticles, setHomeArticles] = useState<PublicArticle[] | null>(
    null,
  );
  const [homeLoading, setHomeLoading] = useState(false);
  const homeDone = useRef(false);

  const [blog, setBlog] = useState<BlogSlice>(defaultBlog);
  const blogDone = useRef(false);
  const blogRef = useRef<BlogSlice>(defaultBlog);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncSetBlog = useCallback((updater: (prev: BlogSlice) => BlogSlice) => {
    setBlog((prev) => {
      const next = updater(prev);
      blogRef.current = next;
      return next;
    });
  }, []);

  const ensureHome = useCallback(() => {
    if (homeDone.current) return;
    homeDone.current = true;
    setHomeLoading(true);
    getPublicArticles({ page: 1, pageSize: 3 })
      .then((res) => setHomeArticles(res.data.data))
      .catch(() => setHomeArticles([]))
      .finally(() => setHomeLoading(false));
  }, []);

  const doFetchBlog = useCallback(
    (pageNum: number, append: boolean, query: string) => {
      syncSetBlog((prev) => ({
        ...prev,
        loading: !append,
        loadingMore: append,
      }));
      getPublicArticles({
        page: pageNum,
        pageSize: 10,
        search: query || undefined,
      })
        .then((res) =>
          syncSetBlog((prev) => ({
            ...prev,
            articles: append
              ? [...prev.articles, ...res.data.data]
              : res.data.data,
            page: pageNum,
            totalPages: res.data.totalPages,
            query,
            loading: false,
            loadingMore: false,
          })),
        )
        .catch(() =>
          syncSetBlog((prev) => ({
            ...prev,
            loading: false,
            loadingMore: false,
          })),
        );
    },
    [syncSetBlog],
  );

  const ensureBlog = useCallback(() => {
    if (blogDone.current) return;
    blogDone.current = true;
    doFetchBlog(1, false, "");
  }, [doFetchBlog]);

  const updateBlogQuery = useCallback(
    (q: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        syncSetBlog((prev) => ({ ...prev, articles: [], page: 1, query: q }));
        doFetchBlog(1, false, q);
      }, 400);
    },
    [doFetchBlog, syncSetBlog],
  );

  const loadMoreBlog = useCallback(() => {
    const curr = blogRef.current;
    if (curr.page >= curr.totalPages || curr.loadingMore || curr.loading)
      return;
    doFetchBlog(curr.page + 1, true, curr.query);
  }, [doFetchBlog]);

  return (
    <ArticlesContext.Provider
      value={{
        homeArticles,
        homeLoading,
        ensureHome,
        blog,
        ensureBlog,
        updateBlogQuery,
        loadMoreBlog,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error("useArticles must be used inside ArticlesProvider");
  return ctx;
};
