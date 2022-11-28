import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { getRefresh } from 'apis/auth';

import { AuthContext } from 'contexts/Auth';
import { IAuthContext } from 'contexts/Auth/type';

import Header from 'layouts/Header';
import Footer from 'layouts/Footer';

import Router from 'routes/Router';

import { lightTheme } from 'styles/theme';
import { GlobalStyles } from 'styles/globalStyle';

function App() {
  const { setAuth } = useContext(AuthContext) as IAuthContext;

  useEffect(() => {
    getRefresh()
      .then((data) => {
        setAuth(data);
        localStorage.setItem('accessToken', data.accessToken);
      })
      .catch(() => {
        alert('다시 로그인 해주세요.');
        setAuth(null);
        localStorage.removeItem('accessToken');
      });
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
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
`;

export default App;
