import styled from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

export const PostBox = styled.ul`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PostList = styled.li`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
  padding: 20px;
`;

export const ImageBox = styled.div`
  width: 20%;
`;

export const TextBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
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
