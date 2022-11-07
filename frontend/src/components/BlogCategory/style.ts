import styled from 'styled-components';

export const CategoryBadge = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  cursor: pointer;
`;
export const Category = styled.li<{ currentPage: boolean }>`
  font-size: 14px;
  background-color: ${(props) => (props.currentPage ? 'red ' : 'yellow')};
  padding: 10px;
  border-radius: 5px;
`;
