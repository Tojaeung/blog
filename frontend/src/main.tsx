import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import AuthProvider from 'contexts/Auth';

import { lightTheme } from 'styles/theme';
import App from './App';

import { GlobalStyles } from 'styles/globalStyle';
import 'styles/fonts.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
