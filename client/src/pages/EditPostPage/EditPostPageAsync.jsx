import { lazy, Suspense } from 'react';

const EditPostPage = lazy(() =>
  import('./EditPostPage').then((module) => ({ default: module.EditPostPage }))
);

export const EditPostPageAsync = () => {
  return (
    <Suspense fallback='loading'>
      <EditPostPage />
    </Suspense>
  );
};
