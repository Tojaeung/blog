export type IGuestbook = {
  id: number;
  author: string;
  content: string;
  isAdmin: boolean;
  createdAt: string;
  lastModifiedAt: string;
};

export type INewGuestbook = {
  author: string;
  content: string;
  isAdmin: boolean;
};
