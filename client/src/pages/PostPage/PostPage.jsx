import { instanceApi } from '../../utils/axios';
import { memo, useCallback, useEffect, useState } from 'react';
import { CommentItem } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit } from 'react-icons/ai';
import {
  commentSliceName,
  commentSliceReducer,
  createComment,
  getPostComments,
} from '../../redux/features/comment/commentSlice';
import { removePost } from '../../redux/features/post/postSlice';
import { DynamicModuleLoader } from '../../utils/DynamicModuleLoader';

const reducers = {
  [commentSliceName]: commentSliceReducer,
};

export const PostPage = memo(() => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  const { user } = useSelector((state) => state.auth);
  const comments = useSelector((state) => state?.comment?.comments);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Post has been removed');
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const fetchPost = useCallback(async () => {
    const { data } = await instanceApi.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return <div className='text-xl text-center text-white py-10'>Loading...</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div>
        <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          <Link className='flex' to={'/'}>
            Back
          </Link>
        </button>

        <div className='flex gap-10 py-8'>
          <div className='w-2/3'>
            <div className='flex flex-col basis-1/4 flex-grow'>
              <div className={post?.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
                {post?.imgUrl && (
                  <img
                    src={`http://localhost:5000/${post.imgUrl}`}
                    alt='img'
                    className='object-cover w-full'
                  />
                )}
              </div>
            </div>

            <div className='flex justify-between items-center pt-2'>
              <div className='text-xs text-white opacity-50'>{post.username}</div>

              <div className='text-xs text-white opacity-50'>
                <Moment date={post.createdAt} format='D MMM YYYY' />
              </div>
            </div>

            <div className='text-white text-xl'>{post.title}</div>
            <p className='text-white opacity-60 text-xs pt-4'>{post.text}</p>

            <div className='flex gap-3 items-center mt-2 justify-between'>
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiFillEye /> <span>{post.views}</span>
                </button>

                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
                </button>
              </div>

              {user?.id === post.author && (
                <div className='flex gap-3 mt-4'>
                  <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>

                  <button
                    onClick={removePostHandler}
                    className='flex items-center justify-center gap-2  text-white opacity-50'
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
            <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                value={comment}
                placeholder='Comment'
                className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                type='submit'
                onClick={handleSubmit}
                className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
              >
                Send
              </button>
            </form>

            {comments?.map((cmt) => (
              <CommentItem key={cmt._id} comment={cmt} />
            ))}
          </div>
        </div>
      </div>
    </DynamicModuleLoader>
  );
});
