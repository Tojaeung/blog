import styled from 'styled-components';
import { CommonButtonStyle, CommonCommentStyle, CommonInputStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
export const Title = styled(CommonTitleStyle)`
  font-size: 20px;
`;

export const AuthorInput = styled(CommonInputStyle)`
  width: 50%;
`;
export const ContentInput = styled(CommonCommentStyle)`
  width: 70%;
  min-height: 100px;
`;
export const SubmitButton = styled(CommonButtonStyle)``;
