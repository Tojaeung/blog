import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyle';
import { lightTheme } from 'styles/theme';
import { Provider } from 'react-redux';
import wrapper from 'apps/store';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Provider store={store}>
        <Component {...props.pageProps} />;
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
