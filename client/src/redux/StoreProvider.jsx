import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReduxStore } from './store';

export const StoreProvider = ({ children, initialState, asyncReducers }) => {
  const navigate = useNavigate();
  const store = createReduxStore(initialState, asyncReducers, navigate);

  return <Provider store={store}>{children}</Provider>;
};
