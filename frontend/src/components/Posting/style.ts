import styled from 'styled-components';
import { CommonButtonStyle, CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

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

export const Line = styled.hr`
  width: 100%;
`;

export const Content = styled.div`
  line-height: 20px;
  word-wrap: break-word;
  h1 {
    font-size: 32px;
    font-weight: bold;
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
  }
  h3 {
    font-size: 19px;
    font-weight: bold;
  }
  h4 {
    font-size: 16px;
    font-weight: bold;
  }
  h5 {
    font-size: 12px;
    font-weight: bold;
  }
  h6 {
    font-size: 10px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
  }

  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
  s {
    text-decoration: line-through;
  }
  i {
    font-weight: bold;
  }

  .ql-syntax {
    font-size: 14px;
    padding: 20px;
    background-color: ${({ theme }) => theme.palette.bgColor};
  }
`;
