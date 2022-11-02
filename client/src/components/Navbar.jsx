import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions, checkIsAuth } from '../redux/features/auth/authSlice';

export const Navbar = memo(() => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: 'white',
  };

  return (
    <header className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
        E
      </span>

      {isAuth && (
        <nav>
          <ul className='flex gap-8'>
            <li>
              <NavLink
                to='/'
                className='text-sx text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Main
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/posts'
                className='text-sx text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                My Post
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/new'
                className='text-sx text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add Post
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {isAuth ? (
          <button
            onClick={() => {
              toast('Sign out!');
              dispatch(authActions.logout());
            }}
          >
            Sign Out
          </button>
        ) : (
          <Link to={'/login'}>Sign In</Link>
        )}
      </div>
    </header>
  );
});
