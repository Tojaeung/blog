export type IProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

export type IImage = {
  imageId: number;
  imageUrl: string; // 파일 저장경로
};
