import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 500px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const Title = styled(CommonTitleStyle)``;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const IdInput = styled(CommonInputStyle)``;
export const PwInput = styled(CommonInputStyle)``;
export const LoginButton = styled(CommonButtonStyle)``;
