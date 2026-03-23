export interface Article {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  video_url?: string | null;
  description?: string;
  content?: string;
  pubDate: string;
  image_url?: string | null;
  source_id: string;
  source_priority: number;
  country: string[];
  category: string[];
  language: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: Article[];
  nextPage?: string | null;
}
