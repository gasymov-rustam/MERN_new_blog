import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import {
  AddPost,
  EditPostPage,
  LoginPage,
  MainPage,
  PostPage,
  PostsPage,
  RegisterPage,
} from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path='new' element={<AddPost />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
      </Routes>

      <ToastContainer position='bottom-right' autoClose={1000} theme='dark' />
    </Layout>
  );
};
