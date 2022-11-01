import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;
export const TitleInput = styled(CommonInputStyle)``;
export const ThumbnailInput = styled.input``;

export const EditorBox = styled.div`
  width: 800px;
  height: 400px;
`;

export const SubmitButton = styled(CommonButtonStyle)``;
