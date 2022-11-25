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
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h2 {
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h3 {
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h4 {
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h5 {
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h6 {
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }

  p {
    font-size: 14px;
    font-family: ${({ theme }) => theme.font.text};
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

  blockquote {
    font-family: ${({ theme }) => theme.font.text};
    font-style: italic;
    font-weight: bold;
    background-color: ${({ theme }) => theme.palette.cardBgColor};
    color: ${({ theme }) => theme.palette.textColor};
  }

  img {
    width: 100%;
  }

  .ql-syntax {
    font-family: ${({ theme }) => theme.font.en};
    font-size: 14px;
    padding: 20px;
    background-color: ${({ theme }) => theme.palette.bgColor};
  }
`;
