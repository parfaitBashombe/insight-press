export type Post = {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  cover_img: string;
  updated_at: string;
  created_at: string;
  isFeatured: boolean;
};
