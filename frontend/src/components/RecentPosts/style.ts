import styled from 'styled-components';
import { CommonTextStyle } from 'styles/common';

export const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const List = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.5s;
  &:hover {
    transform: translateY(-5px);
    text-decoration: underline;
  }
`;

export const Thumbnail = styled.img`
  width: 20%;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.palette.boxShdow};
`;

export const ContentBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CategoryName = styled(CommonTextStyle)``;
export const Title = styled(CommonTextStyle)`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 20px;
`;

export const CreatedAt = styled(CommonTextStyle)`
  font-size: 12px;
`;
