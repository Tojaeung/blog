import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyle';
import { lightTheme } from 'styles/theme';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Component {...pageProps} />;
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

import styled from 'styled-components';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export default MyApp;
