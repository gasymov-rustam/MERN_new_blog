import { lazy, Suspense } from 'react';

const LoginPage = lazy(() =>
  import('./LoginPage').then((module) => ({ default: module.LoginPage }))
);

export const LoginPageAsync = () => {
  return (
    <Suspense fallback='loading'>
      <LoginPage />
    </Suspense>
  );
};
