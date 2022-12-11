import styled from 'styled-components';
import {
  CommonButtonStyle,
  CommonCommentStyle,
  CommonInputStyle,
  CommonTextStyle,
  CommonTitleStyle,
} from 'styles/common';

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  margin-top: 30px;

  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
  }
`;

export const GuestbookSection = styled.section`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
`;

export const Title = styled(CommonTitleStyle)``;

export const GuestbookBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 5px;
  padding: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;

export const GuestbookList = styled.li`
  background-color: ${({ theme }) => theme.palette.badgeColor};
  border-radius: 5px;
  padding: 5px;
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
`;
export const DateTime = styled(CommonTextStyle)`
  font-weight: normal;
  font-size: 12px;
`;
export const DeleteButton = styled.button`
  cursor: pointer;
`;

export const Content = styled(CommonTextStyle)`
  white-space: pre-wrap;
  line-height: 20px;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;

export const AuthorInput = styled(CommonInputStyle)`
  width: 50%;
`;
export const ContentInput = styled(CommonCommentStyle)`
  width: 100%;
  min-height: 100px;
`;
export const SubmitButton = styled(CommonButtonStyle)`
  width: 18%;
  min-width: 100px;
`;
