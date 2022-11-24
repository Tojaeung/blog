import styled from 'styled-components';

export const Viewer = styled.p`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  line-height: 20px;
`;
