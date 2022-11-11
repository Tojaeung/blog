import styled from 'styled-components';
import DeskTop from './DeskTop';
import Mobile from './Mobile';

const Header = () => {
  return (
    <Container>
      <DeskTop />
      <Mobile />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.palette.mainColor};
`;

export default Header;
