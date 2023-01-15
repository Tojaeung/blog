import { css } from 'styled-components';

export const EditorStyle = css`
  letter-spacing: 0.5px;
  line-height: 25px;
  word-wrap: break-word;

  h1 {
    font-size: 26px;
    font-weight: bold;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 24px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 22px;
    }
  }
  h2 {
    font-size: 19.5px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 18.5px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 17.5px;
    }
  }
  h3 {
    font-size: 15.21px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.text};
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 15px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 14px;
    }
  }

  p {
    font-size: 14px;
    font-family: ${({ theme }) => theme.font.text};
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 13px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 12px;
    }
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
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 13px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 12px;
    }
  }
  ul {
    font-size: 14px;
    font-family: ${({ theme }) => theme.font.text};
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 13px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 12px;
    }
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
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 13px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 12px;
    }
  }

  img {
    max-width: 100%;
  }

  a {
    font-size: 14px;
    color: blue;
    text-decoration: underline;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 13px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 12px;
    }
  }

  pre.ql-syntax {
    font-family: ${({ theme }) => theme.font.en};
    font-size: 14px;
    padding: 5px;
    margin: 5px 0;
    border-radius: 10px;
    background-color: #23241f;
    color: #f8f8f2;
    white-space: pre;
    overflow-x: scroll;
    overflow-y: hidden;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 13px;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 12px;
    }
  }
`;
