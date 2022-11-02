import { createElement, Fragment, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export const DynamicModuleLoader = ({ children, reducers, removeAfterUnmount = true }) => {
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createElement(Fragment, null, children);
};
