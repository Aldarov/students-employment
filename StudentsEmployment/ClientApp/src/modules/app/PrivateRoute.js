import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
  const isAuth = useSelector(state => state.isAuth);
  const location = useLocation();

  return isAuth ? children : <Navigate to='/login' state={{ from: location?.pathname }}/>;
};

export default PrivateRoute;
