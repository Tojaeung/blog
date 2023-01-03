import { Routes, Route } from 'react-router-dom';

import PublicRouter from './PublicRoute';
import PrivateRouter from './PrivateRoute';

import Home from 'pages/Home';
import Login from 'pages/Login';
import Notice from 'pages/Notice';
import Blog from 'pages/Blog';
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
import AdminUpdate from 'pages/Admin/Update';
import NotFound from 'pages/NotFound';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/notice' element={<Notice />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/category/:categoryId' element={<Category />} />
      <Route path='/post/:postId' element={<Post />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/Guestbook' element={<Guestbook />} />
      <Route path='/search' element={<Search />} />

      <Route path='/'>
        <Route path='/tag' element={<Tag />} />
        <Route path='/tag/:tagName' element={<TagName />} />
      </Route>

      <Route path='/' element={<PublicRouter />}>
        <Route path='login' element={<Login />} />
      </Route>

      <Route path='/' element={<PrivateRouter />}>
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/category' element={<AdminCategory />} />
        <Route path='/admin/post' element={<AdminPost />} />
        <Route path='/admin/update/:postId' element={<AdminUpdate />} />
      </Route>

      <Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default Router;
