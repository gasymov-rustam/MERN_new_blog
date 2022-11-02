import { lazy, Suspense } from 'react';

const AddPost = lazy(() => import('./AddPost').then((module) => ({ default: module.AddPost })));

export const AddPostAsync = () => {
  return (
    <Suspense fallback='loading'>
      <AddPost />
    </Suspense>
  );
};
