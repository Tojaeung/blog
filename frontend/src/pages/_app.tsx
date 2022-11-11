import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyle';
import 'styles/fonts.css';
import { lightTheme } from 'styles/theme';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <OuterContainer>
        <Header />
        <InnerContainer>
          <Component {...pageProps} />;
        </InnerContainer>
        <Footer />
      </OuterContainer>
    </ThemeProvider>
  );
}

import styled from 'styled-components';

const OuterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  font-family: ${({ theme }) => theme.font.text};
  background-color: ${({ theme }) => theme.palette.bgColor};
`;

const InnerContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.bgColor};
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    padding: 0 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 10px;
  }
`;

export default MyApp;
