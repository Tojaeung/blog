import styled from 'styled-components';
import ReactQuill from 'react-quill';

export const Editor = styled(ReactQuill)`
  width: 100%;
  height: 600px;
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

  .ql-syntax {
    font-family: ${({ theme }) => theme.font.en};
    font-size: 14px;
    padding: 20px;
    background-color: ${({ theme }) => theme.palette.bgColor};
  }
`;
