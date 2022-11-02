import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyle';
import { lightTheme } from 'styles/theme';
import { Provider } from 'react-redux';
import wrapper from 'apps/store';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Container>
          <Header />
          <Component {...props.pageProps} />;
          <Footer />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

import styled from 'styled-components';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export default MyApp;
