import { saveState } from '../localStorage';

const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  saveState({
    employees: state.employees,
    auth: {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
    },
    ui: {
      theme: state.ui.theme,
    },
  });

  return result;
};

export default persistenceMiddleware;
