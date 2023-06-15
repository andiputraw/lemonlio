export interface renderInterface {
  title: string;
  time: string;
  content: string;
  banner: string;
  error: boolean;
}

export interface editorInterface {
  created_at?: string;
  sub_category?: string;
  slug?: string;
  title?: string;
  banner?: string;
  isPublished?: boolean;
  link?: string;
  content?: string;
  edit?: boolean;
}
