import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../redux/features/auth/authSlice';

const statusSelector = (state) => state.auth.status;

export const LoginPage = memo(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const status = useSelector(statusSelector);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(loginUser({ username, password }));
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (status) toast(status);
  }, [status]);

  return (
    <form className='w-1/4 h-60 mx-auto mt-40' onSubmit={(e) => e.preventDefault()}>
      <h1 className='text-lg text-white text-center'>Authorization</h1>

      <label className='text-xs text-gray-400'>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-gray-400'>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <div className='flex gap-8 justify-center mt-4'>
        <button
          type='submit'
          disabled={!password.length || !username.length}
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4 disabled:opacity-20'
        >
          Sign In
        </button>

        <Link to='/register' className='flex justify-center items-center text-xs text-white'>
          Have not an account ?
        </Link>
      </div>
    </form>
  );
});
