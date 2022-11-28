import styled from 'styled-components';
import { CommonButtonStyle, CommonInputStyle, CommonTitleStyle } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 170px);
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  background-color: ${({ theme }) => theme.palette.white};
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
