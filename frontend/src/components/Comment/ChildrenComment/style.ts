import styled from 'styled-components';
import { CommonTextStyle } from 'styles/globalStyle';

export const CommentBox = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Depth = styled.div`
  width: 50px;
  height: 100%;
`;

export const CommentList = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Author = styled(CommonTextStyle)`
  font-weight: bold;
  align-self: flex-start;
`;

export const Content = styled(CommonTextStyle)``;
