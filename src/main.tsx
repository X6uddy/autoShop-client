import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { Toaster } from 'react-hot-toast';

interface State {
  store: Store
}

const store = new Store();
export const Context = createContext<State>({
  store
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{store}}>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </Context.Provider>
);