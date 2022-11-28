import styled from 'styled-components';

export const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.mainColor};
  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
`;

export const MenuBox = styled.ul`
  display: flex;
  gap: 20px;
  font-size: 22px;
  font-family: ${({ theme }) => theme.font.en};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.textColor};
`;
export const MenuList = styled.li`
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    color: ${({ theme }) => theme.palette.black};
  }
`;
