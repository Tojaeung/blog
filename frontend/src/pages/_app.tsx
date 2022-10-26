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
        <Header />
        <Component {...props.pageProps} />;
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
