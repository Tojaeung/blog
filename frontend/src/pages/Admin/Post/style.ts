import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonSelectStyle, CommonOptionStyle } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 10px;
  }
`;
export const Selector = styled(CommonSelectStyle)``;
export const Option = styled(CommonOptionStyle)``;

export const TitleInput = styled(CommonInputStyle)``;
export const ThumbnailInput = styled.input`
  margin-top: 40px;
`;

export const TagSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const SearchTagInput = styled(CommonInputStyle)``;
export const SearchButton = styled(CommonButtonStyle)``;

export const TagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const TagInput = styled(CommonInputStyle)``;
export const AddTagButton = styled(CommonButtonStyle)``;
export const InitButton = styled(CommonButtonStyle)``;

export const SubmitButton = styled(CommonButtonStyle)``;
