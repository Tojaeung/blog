import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { persistLogin } from 'apis/auth';

import Header from 'layouts/Header';
import Footer from 'layouts/Footer';

import Router from 'routes/Router';

import { lightTheme } from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return;
    else {
      persistLogin()
        .then(({ accessToken }) => localStorage.setItem('accessToken', accessToken))
        .catch(() => {
          alert('로그인 유지에 실패하였습니다.');
          localStorage.removeItem('accessToken');
        });
    }
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Container>
          <Router />
        </Container>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 10px;
  }
`;

export default App;
