import styled from 'styled-components';
import { CommonTitleStyle, CommonButtonStyle, CommonInputStyle, CommonTextStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled(CommonTitleStyle)``;

export const CreateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const CreateInput = styled(CommonInputStyle)``;
export const CreateButton = styled(CommonButtonStyle)``;

export const CategoryBox = styled.ul``;
export const CategoryList = styled.li`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Name = styled(CommonTextStyle)``;
export const Count = styled(CommonTextStyle)``;
export const DeleteButton = styled(CommonButtonStyle)``;

export const UpdateBox = styled.div`
  display: flex;
  gap: 10px;
`;

export const UpdateInput = styled(CommonInputStyle)``;
export const UpdateButton = styled(CommonButtonStyle)``;
