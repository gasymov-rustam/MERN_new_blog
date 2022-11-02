import { lazy, Suspense } from 'react';

const PostPage = lazy(() => import('./PostPage').then((module) => ({ default: module.PostPage })));

export const PostPageAsync = () => {
  return (
    <Suspense fallback='loading'>
      <PostPage />
    </Suspense>
  );
};
