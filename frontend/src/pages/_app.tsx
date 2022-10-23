import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyle';
import { lightTheme } from 'styles/theme';
import { Provider } from 'react-redux';
import wrapper from 'apps/store';
import { GetServerSideProps } from 'next';
import { refresh } from 'features/auth/authThunk';
import { useAppDispatch } from 'hooks/useRtkCustomHook';
import { useEffect } from 'react';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Component {...props.pageProps} />;
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
