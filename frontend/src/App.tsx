import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getRefresh } from 'apis/auth';

import { AuthContext } from 'contexts/Auth';
import { IAuthContext } from 'contexts/Auth/type';

import PublicRouter from 'routes/PublicRouter';
import PrivateRouter from 'routes/PrivateRouter';

import Header from 'layouts/Header';
import Footer from 'layouts/Footer';

import Home from 'pages/Home';
import Login from 'pages/Login';
import About from 'pages/About';
import Contact from 'pages/Contact';
import Guestbook from 'pages/Guestbook';
import Search from 'pages/Search';
import Category from 'pages/Category';
import Post from 'pages/Post';
import Tag from 'pages/Tag';
import TagName from 'pages/Tag/TagName';
import Admin from 'pages/Admin';
import AdminCategory from 'pages/Admin/Category';
import AdminPost from 'pages/Admin/Post';
import NotFound from 'pages/NotFound';

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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/category/:categoryId' element={<Category />} />
        <Route path='/post/:postId' element={<Post />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/Guestbook' element={<Guestbook />} />
        <Route path='/search' element={<Search />} />

        <Route path='/tag' element={<Tag />}>
          <Route path=':tagName' element={<TagName />} />
        </Route>

        <Route path='/' element={<PublicRouter />}>
          <Route path='login' element={<Login />} />
        </Route>

        <Route path='/' element={<PrivateRouter />}>
          <Route path='admin' element={<Admin />}>
            <Route path='category' element={<AdminCategory />} />
            <Route path='post' element={<AdminPost />} />
          </Route>
        </Route>

        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
