import styled from 'styled-components';
import { CommonTextStyle } from 'styles/common';

export const CommentBox = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Depth = styled.li`
  width: 2%;
  height: 100%;
`;
export const ListBox = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CommentList = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AuthorBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
export const Author = styled(CommonTextStyle)`
  font-weight: bold;
  align-self: flex-start;
`;
export const DateTime = styled(CommonTextStyle)`
  font-weight: normal;
  font-size: 12px;
`;

export const Content = styled(CommonTextStyle)``;
