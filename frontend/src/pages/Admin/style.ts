import styled from 'styled-components';
import { CommonButtonStyle, CommonTitleStyle } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 189px);
  margin: 0 auto;
`;

export const Title = styled(CommonTitleStyle)`
  margin: 20px 0;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;
export const LinkButton = styled(CommonButtonStyle)`
  padding: 40px;
  font-weight: bold;
  font-size: 20px;
`;
