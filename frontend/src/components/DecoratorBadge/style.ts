import styled from 'styled-components';
import { jittery } from 'styles/animation';

export const Container = styled.div`
  background-color: red;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${jittery} 3s infinite;
`;

export const Text = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: white;
`;
