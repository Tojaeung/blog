import { css } from 'styled-components';

export const EditorStyle = css`
  letter-spacing: 0.5px;
  line-height: 25px;
  word-wrap: break-word;

  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  h2 {
    font-size: 19.5px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h3 {
    font-size: 15.21px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
  }
  h4 {
    font-size: 13px;
    font-family: ${({ theme }) => theme.font.text};
  }
  h5 {
    font-size: 10.79px;
    font-family: ${({ theme }) => theme.font.text};
  }
  h6 {
    font-size: 10px;
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

  ol {
    font-size: 14px;
    font-family: ${({ theme }) => theme.font.text};
  }
  ul {
    font-size: 14px;
    font-family: ${({ theme }) => theme.font.text};
  }

  blockquote {
    position: relative;
    width: 100%;
    padding: 0 1rem;
    font-size: 14px;
    font-style: italic;
    font-family: ${({ theme }) => theme.font.text};
    border-left: 6px solid ${({ theme }) => theme.palette.badgeColor};
    color: ${({ theme }) => theme.palette.textColor};
  }

  img {
    width: 100%;
  }

  a {
    color: blue;
    text-decoration: underline;
  }

  .ql-syntax {
    font-family: ${({ theme }) => theme.font.en};
    font-size: 14px;
    padding: 10px;
    background-color: ${({ theme }) => theme.palette.darkGray};
    border-radius: 10px;
  }
`;
