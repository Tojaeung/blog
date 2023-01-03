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
        <Link to='/notice'>
          <MenuList>Notice</MenuList>
        </Link>
        <Link to='/blog'>
          <MenuList>Blog</MenuList>
        </Link>
        <Link to='/tag'>
          <MenuList>Tags</MenuList>
        </Link>
        <a href='https://soundcloud.com/tojaeung' target='_blank' rel='noreferrer'>
          <MenuList>Music</MenuList>
        </a>
      </MenuBox>
    </Container>
  );
}

export default DeskTop;
