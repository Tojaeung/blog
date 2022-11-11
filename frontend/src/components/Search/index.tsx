import React, { useState, KeyboardEvent } from 'react';
import { Container, SearchIcon, SearchInput } from './style';

function Search() {
  const [keyWord, setKeyWord] = useState('');

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
    }
  };
  return (
    <Container>
      <SearchIcon size={20} />
      <SearchInput
        placeholder="포스팅을 찾아보세요 !!"
        onChange={(e) => setKeyWord(e.target.value)}
        onKeyDown={handleOnKeyPress}
      />
    </Container>
  );
}

export default Search;
