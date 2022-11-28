export type IProps = {
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  blockNum: number;
  setBlockNum: React.Dispatch<React.SetStateAction<number>>;
  totalCnt?: number;
};
