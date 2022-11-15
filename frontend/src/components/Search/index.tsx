import { useRouter } from 'next/router';
import React, { useState, KeyboardEvent } from 'react';
import { Container, SearchIcon, SearchInput } from './style';

function Search() {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyword === '') return;

    if (e.key === 'Enter') router.push(`/search?keyword=${keyword}`);
  };
  return (
    <Container>
      <SearchIcon size={20} />
      <SearchInput
        placeholder="포스팅을 찾아보세요 !!"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleOnKeyPress}
      />
    </Container>
  );
}

export default Search;
