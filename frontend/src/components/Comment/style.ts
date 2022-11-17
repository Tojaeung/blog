import styled from 'styled-components';
import { CommonButtonStyle, CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;

export const Title = styled(CommonTitleStyle)``;

export const CommentBox = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentList = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AuthorBox = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const Author = styled(CommonTextStyle)`
  font-weight: bold;
`;
export const DateTime = styled(CommonTextStyle)`
  font-weight: normal;
  font-size: 12px;
`;
export const DeleteButton = styled.button`
  cursor: pointer;
`;

export const Content = styled(CommonTextStyle)``;
export const ReplyButton = styled(CommonButtonStyle)`
  width: 7%;
  min-width: 50px;
  align-items: flex-start;
`;
