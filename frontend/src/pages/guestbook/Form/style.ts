import styled from 'styled-components';
import { CommonButtonStyle, CommonCommentStyle, CommonInputStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
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
export const Title = styled(CommonTitleStyle)`
  font-size: 20px;
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
