import React from 'react';
import { Container, ArrowButton, PageButton, PageNumberBox } from './style';
import { IProps } from './type';

function Pagination({ page, setPage, blockNum, setBlockNum, totalCnt }: IProps) {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  };

  const pageLimit = 10;
  const totalPage: number = Math.ceil(totalCnt / 10);
  const blockArea: number = Number(blockNum * pageLimit);
  const nArr = createArr(Number(totalPage));
  let pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea);

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
  };

  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };

  const prevPage = () => {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
  };

  const nextPage = () => {
    if (page >= totalPage) {
      return;
    }
    if (pageLimit * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
  };

  return (
    <Container>
      <ArrowButton
        onClick={() => {
          firstPage();
        }}
      >
        &lt;&lt;
      </ArrowButton>

      <ArrowButton
        onClick={() => {
          prevPage();
        }}
        disabled={page === 1}
      >
        &lt;
      </ArrowButton>

      <PageNumberBox>
        {pArr.map((n: number) => (
          <PageButton
            key={n}
            onClick={() => {
              setPage(n);
            }}
            currentPage={page === n ? true : false}
          >
            {n}
          </PageButton>
        ))}
      </PageNumberBox>

      <ArrowButton
        onClick={() => {
          nextPage();
        }}
        disabled={page === totalPage}
      >
        &gt;
      </ArrowButton>

      <ArrowButton
        onClick={() => {
          lastPage();
        }}
      >
        &gt;&gt;
      </ArrowButton>
    </Container>
  );
}

export default Pagination;
