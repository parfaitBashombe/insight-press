import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { getWriterStats, getMyArticles } from "@/lib/api/writer";
import type { WriterStats, Article } from "@/types/writer";

interface WriterContextValue {
  stats: WriterStats | null;
  articles: Article[];
  total: number;
  loaded: boolean;
  ensure: () => void;
  reload: () => Promise<void>;
  addArticle: (article: Article) => void;
  patchArticle: (articleId: string, changes: Partial<Article>) => void;
  removeArticle: (articleId: string) => void;
}

const WriterContext = createContext<WriterContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useWriter = (): WriterContextValue => {
  const ctx = useContext(WriterContext);
  if (!ctx) throw new Error("useWriter must be inside WriterProvider");
  return ctx;
};

export const WriterProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<WriterStats | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const done = useRef(false);
  const fetchingRef = useRef(false);

  const doFetch = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoaded(false);
    try {
      const [statsRes, articlesRes] = await Promise.all([
        getWriterStats(),
        getMyArticles(1, 100),
      ]);
      setStats(statsRes.data);
      setArticles(articlesRes.data.data);
      setTotal(articlesRes.data.total);
      done.current = true;
      setLoaded(true);
    } catch (e) {
      console.error(e);
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  const ensure = useCallback(() => {
    if (done.current) return;
    doFetch();
  }, [doFetch]);

  const reload = useCallback((): Promise<void> => {
    done.current = false;
    return doFetch();
  }, [doFetch]);

  const addArticle = useCallback((article: Article) => {
    setArticles((prev) => [article, ...prev]);
    setTotal((prev) => prev + 1);
    setStats((prev) =>
      prev
        ? {
            articles: {
              ...prev.articles,
              total: prev.articles.total + 1,
              drafts: prev.articles.drafts + 1,
            },
          }
        : prev,
    );
  }, []);

  const patchArticle = useCallback(
    (articleId: string, changes: Partial<Article>) => {
      setArticles((prev) =>
        prev.map((a) =>
          a.article_id === articleId ? { ...a, ...changes } : a,
        ),
      );
      if (changes.status === "PUBLISHED") {
        setStats((prev) =>
          prev
            ? {
                articles: {
                  ...prev.articles,
                  published: prev.articles.published + 1,
                  drafts: Math.max(0, prev.articles.drafts - 1),
                },
              }
            : prev,
        );
      } else if (changes.status === "DRAFT") {
        setStats((prev) =>
          prev
            ? {
                articles: {
                  ...prev.articles,
                  drafts: prev.articles.drafts + 1,
                  published: Math.max(0, prev.articles.published - 1),
                },
              }
            : prev,
        );
      }
    },
    [],
  );

  const removeArticle = useCallback((articleId: string) => {
    setArticles((prev) => {
      const removing = prev.find((a) => a.article_id === articleId);
      if (removing) {
        setStats((s) => {
          if (!s) return s;
          return {
            articles: {
              total: s.articles.total - 1,
              published:
                removing.status === "PUBLISHED"
                  ? s.articles.published - 1
                  : s.articles.published,
              drafts:
                removing.status === "DRAFT"
                  ? s.articles.drafts - 1
                  : s.articles.drafts,
            },
          };
        });
        setTotal((t) => t - 1);
      }
      return prev.filter((a) => a.article_id !== articleId);
    });
  }, []);

  return (
    <WriterContext.Provider
      value={{
        stats,
        articles,
        total,
        loaded,
        ensure,
        reload,
        addArticle,
        patchArticle,
        removeArticle,
      }}
    >
      {children}
    </WriterContext.Provider>
  );
};
