import { lazy, Suspense } from 'react';

const RegisterPage = lazy(() =>
  import('./RegisterPage').then((module) => ({ default: module.RegisterPage }))
);

export const RegisterPageAsync = () => {
  return (
    <Suspense fallback='loading'>
      <RegisterPage />
    </Suspense>
  );
};
