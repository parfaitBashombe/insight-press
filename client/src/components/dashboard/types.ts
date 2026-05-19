export type WriterView =
  | "overview"
  | "new-post"
  | "my-posts"
  | "analytics"
  | "settings"
  | "comments"
  | "media";

export type AdminView =
  | "admin-overview"
  | "admin-users"
  | "admin-promotions"
  | "settings";

export type ReaderView = "reader-overview" | "settings";

export type View = WriterView | AdminView | ReaderView;
