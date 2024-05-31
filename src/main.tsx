import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import { Toaster } from 'react-hot-toast';
import Basket from "./store/basket"

interface State {
  store: Store,
  basket: Basket
}

const store = new Store();
const basket = new Basket();
export const Context = createContext<State>({
  store,
  basket
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{store, basket}}>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </Context.Provider>
);