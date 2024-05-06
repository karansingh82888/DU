import React, { useEffect, useLayoutEffect, useState } from 'react';
import Login from './Login';
import { useTypedSelector } from '../redux';
import Dashboard from './Dashboard';
import { Strings } from '../resources/Strings';

const Router = () => {
  const authData = useTypedSelector(state => state.authReducer.loginData);
  const [isLoggedIn, setLoggedIn] = useState<null | boolean>(null)
  useEffect(() => {
    Strings.setLanguage(authData.language)
    setLoggedIn(authData.loginStatus)
  }, [])

    return (
      authData.loginStatus ? (
        <Dashboard />
      ) : (
        <Login />
      )
    );
};

export default Router;
