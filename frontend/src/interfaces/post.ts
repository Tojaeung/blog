export type PostType = {
  id: number;
  title: string;
  content: string;
  views: number;
  thumbnail: string;
  categoryName: string;
  createdAt: string;
  lastModifiedAt: string;
};

export type PagePostType = {
  totalCnt: number;
  posts: PostType[];
};
