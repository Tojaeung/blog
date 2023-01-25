import styled from 'styled-components';
import { CommonButtonStyle, CommonTextStyle, CommonTitleStyle } from 'styles/common';
import { EditorStyle } from 'styles/editor';

export const Container = styled.div`
  width: 100%;
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
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const AdminButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
export const CreateButton = styled(CommonButtonStyle)``;
export const UpdateButton = styled(CommonButtonStyle)``;
export const DeleteButton = styled(CommonButtonStyle)``;

export const Title = styled(CommonTitleStyle)``;
export const Detail = styled(CommonTextStyle)``;

export const ThumbnailBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateThumbnailBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const ThumbnailInput = styled.input``;
export const UpdateThumbnailButton = styled(CommonButtonStyle)``;

export const thumbnailImageBox = styled.div`
  width: 680px;
`;

export const thumbnailImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Line = styled.hr`
  width: 100%;
`;

export const Content = styled.div`
  ${EditorStyle}
`;
