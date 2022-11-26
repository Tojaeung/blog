import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './style';

function Search() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyword === '') return;

    if (e.key === 'Enter') navigate(`/search?keyword=${keyword}`);
  };
  return (
    <S.Container>
      <S.SearchIcon size={20} />
      <S.SearchInput
        placeholder='포스팅을 찾아보세요 !!'
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleOnKeyPress}
      />
    </S.Container>
  );
}

export default Search;
