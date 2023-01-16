import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { CommonTextStyle } from 'styles/common';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const List = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.5s;
  &:hover {
    transform: translateY(-5px);
    text-decoration: underline;
  }
`;

export const UserBox = styled.div`
  display: flex;
  gap: 5px;
`;

export const Comment = styled(CommonTextStyle)`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
`;
export const User = styled(CommonTextStyle)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.mainColor};
`;

export const UserIcon = styled(AiOutlineUser)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.mainColor};
`;
