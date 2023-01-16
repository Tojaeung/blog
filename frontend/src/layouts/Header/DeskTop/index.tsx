import { Link } from 'react-router-dom';
import Logo from 'components/Logo';
import Search from 'components/Search';
import { Container, MenuBox, MenuList } from './style';

function DeskTop() {
  return (
    <Container>
      <Logo />
      <Search />

      <MenuBox>
        <Link to='/blog'>
          <MenuList>블로그</MenuList>
        </Link>
        <Link to='/tag'>
          <MenuList>#태그</MenuList>
        </Link>
        <Link to='/guestbook'>
          <MenuList>방명록</MenuList>
        </Link>
        <a href='https://soundcloud.com/tojaeung' target='_blank' rel='noreferrer'>
          <MenuList>음악</MenuList>
        </a>
      </MenuBox>
    </Container>
  );
}

export default DeskTop;
