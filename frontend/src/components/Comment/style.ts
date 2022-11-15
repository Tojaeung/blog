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

export const Author = styled(CommonTextStyle)`
  font-weight: bold;
  align-self: flex-start;
`;

export const Content = styled(CommonTextStyle)``;
export const ReplyButton = styled(CommonButtonStyle)`
  width: 10%;
  min-width: 55px;
  align-items: flex-start;
`;
