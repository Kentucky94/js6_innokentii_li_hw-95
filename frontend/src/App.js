import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import Layout from "./components/Layout/Layout";
import CocktailMainPage from "./containers/CocktailMainPage/CocktailMainPage";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import CocktailListPage from "./containers/CocktailListPage/CocktailListPage";
import CocktailCreatePage from "./containers/CocktailCreatePage/CocktailCreatePage";
import CocktailSinglePage from "./containers/CocktailSinglePage/CocktailSinglePage";

const ProtectedRoute = ({isAllowed, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to='/' />
};

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Layout>
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={CocktailMainPage} />
        <Route path='/admin/login' exact component={Login} />
        <ProtectedRoute isAllowed={user} path='/cocktails/all' exact component={CocktailListPage} />
        <ProtectedRoute isAllowed={user} path='/cocktails/create' exact component={CocktailCreatePage} />
        <Route path='/cocktails/:id' exact component={CocktailSinglePage}/>
      </Switch>
    </Layout>
  );
};

export default App;