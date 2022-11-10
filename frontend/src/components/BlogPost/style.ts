import styled from 'styled-components';
import { CommonTextStyle } from 'styles/globalStyle';

export const PostBox = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const PostList = styled.li`
  width: 32.22%;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  padding: 20px;
`;

export const Title = styled(CommonTextStyle)`
  font-size: 23px;
  font-weight: bold;
`;
export const ViewBox = styled.div`
  line-height: 20px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
export const Detailed = styled(CommonTextStyle)`
  color: gray;
`;
