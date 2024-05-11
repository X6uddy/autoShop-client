import {FC, useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {Context} from "./main";
import Header from './components/header/Header';
import Login from './pages/login/Login';
import Page404 from './pages/404/Page404';
import Autoparts from './pages/autoparts/Autoparts';
import Basket from './pages/basket/Basket';
import Orders from './pages/orders/Orders';
import { OrderList } from './pages/orders/OrderList/OrderList';
import Dashboard from './pages/dashboard/Dashboard';
import styles from './App.module.scss';
import SingleAutopart from './pages/singleAutopart/SingleAutopart';
import About from './pages/about/About';

const App: FC = () => {
  const {store} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  if (!store.isAuth) {
    return (
      <div>
        <Login/>
      </div>
    )
  }

  return (
    <>
      <Router>
        <Header/>
        <div className={styles.container}>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route index element={<Autoparts/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='autoparts' element={<Autoparts/>}/>
            <Route path='autoparts/:autopartId' element={<SingleAutopart/>}/>
            <Route path='orders' element={<Orders/>} />
            <Route path='orders/:clientId' element={<OrderList />} />
            <Route path='basket' element={<Basket/>} />
            <Route path='about' element={<About/>} />
            <Route path='*' element={<Page404/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default observer(App);