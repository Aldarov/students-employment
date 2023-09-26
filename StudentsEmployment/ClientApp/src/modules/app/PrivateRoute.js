import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
  const isAuth = useSelector(state => state.isAuth);
  const location = useLocation();

  return isAuth ? children : <Navigate to='/login' state={{ from: location?.pathname }}/>;
};

export default PrivateRoute;
