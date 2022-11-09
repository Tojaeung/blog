import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonSelectStyle, CommonOptionStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;
export const Selector = styled(CommonSelectStyle)``;
export const Option = styled(CommonOptionStyle)``;

export const TitleInput = styled(CommonInputStyle)``;
export const ThumbnailInput = styled.input``;

export const EditorBox = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid;
`;

export const SubmitButton = styled(CommonButtonStyle)``;
