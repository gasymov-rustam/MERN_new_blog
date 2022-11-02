import { lazy, Suspense } from 'react';

const PostsPage = lazy(() =>
  import('./PostsPage').then((module) => ({ default: module.PostsPage }))
);

export const PostsPageAsync = () => {
  return (
    <Suspense fallback='loading'>
      <PostsPage />
    </Suspense>
  );
};
