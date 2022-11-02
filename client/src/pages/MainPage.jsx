import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopularPosts, PostItem } from '../components';
import { getAllPosts } from '../redux/features/post/postSlice';

const postSelector = (state) => state.post;

export const MainPage = memo(() => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector(postSelector);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return <div className='text-xl text-center text-white py-10'>Any Posts here!</div>;
  }

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>

        <div className='basis-1/5'>
          <div className='text-xs uppercase text-white'>Popular:</div>

          {popularPosts?.map((post, idx) => (
            <PopularPosts key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
});