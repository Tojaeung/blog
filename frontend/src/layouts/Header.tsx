import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <Container>
      <Link href="/">
        <LogoBox>
          <LogoImg />
          <LogoTypography>Tojaeung</LogoTypography>
        </LogoBox>
      </Link>

      <SearchBox>
        <SearchInput placeholder="포스팅을 찾아보세요 !!" onChange={(e) => setSearchKeyword(e.target.value)} />
      </SearchBox>

      <MenuBox>
        <MenuList>About Me</MenuList>
        <MenuList>Blog</MenuList>
        <MenuList>Contact</MenuList>
      </MenuBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const LogoImg = styled.img``;
const LogoTypography = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const SearchBox = styled.div``;
const SearchInput = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  width: 250px;
`;

const MenuBox = styled.ul`
  display: flex;
  gap: 20px;
  font-size: 20px;
`;
const MenuList = styled.li``;

export default Header;