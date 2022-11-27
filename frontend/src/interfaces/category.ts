export type ICategory = {
  id: number;
  name: string;
  postCnt: number; // 카테고리의 포스팅 갯수
};

export type IUpdateCategory = {
  categoryId: number;
  updatedName: string;
};
