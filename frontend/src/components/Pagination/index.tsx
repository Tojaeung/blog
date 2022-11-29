import * as S from './style';
import { IProps } from './type';

function Pagination({ pageNum, setPageNum, blockNum, setBlockNum, totalCnt }: IProps) {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  };

  const pageLimit = 5;
  const totalPage: number = Math.ceil(totalCnt || 0 / 10);
  const blockArea = Number(blockNum * pageLimit);
  const nArr = createArr(Number(totalPage));
  const pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea);

  const firstPage = () => {
    setPageNum(1);
    setBlockNum(0);
  };

  const lastPage = () => {
    setPageNum(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };

  const prevPage = () => {
    if (pageNum <= 1) {
      return;
    }
    if (pageNum - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPageNum((n: number) => n - 1);
  };

  const nextPage = () => {
    if (pageNum >= totalPage) {
      return;
    }
    if (pageLimit * Number(blockNum + 1) < Number(pageNum + 1)) {
      setBlockNum((n: number) => n + 1);
    }
    setPageNum((n: number) => n + 1);
  };

  return (
    <S.Container>
      <S.ArrowButton
        onClick={() => {
          firstPage();
        }}
      >
        &lt;&lt;
      </S.ArrowButton>

      <S.ArrowButton
        onClick={() => {
          prevPage();
        }}
        disabled={pageNum === 1}
      >
        &lt;
      </S.ArrowButton>

      <S.PageNumberBox>
        {pArr.map((n: number) => (
          <S.PageButton
            key={n}
            onClick={() => {
              setPageNum(n);
            }}
            currentPage={pageNum === n ? true : false}
          >
            {n}
          </S.PageButton>
        ))}
      </S.PageNumberBox>

      <S.ArrowButton
        onClick={() => {
          nextPage();
        }}
        disabled={pageNum === totalPage}
      >
        &gt;
      </S.ArrowButton>

      <S.ArrowButton
        onClick={() => {
          lastPage();
        }}
      >
        &gt;&gt;
      </S.ArrowButton>
    </S.Container>
  );
}

export default Pagination;
