import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;
export const NotFoundImage = styled.img`
  width: 300px;
  height: 300px;
`;
export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ErrorCode = styled.h1`
  font-family: ${({ theme }) => theme.font.logo};
  font-weight: bold;
  font-size: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 80px;
  }
`;
export const Message = styled.p`
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 10px;
  font-size: 30px;
  font-weight: bold;
  line-height: 35px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 20px;
  }
`;
