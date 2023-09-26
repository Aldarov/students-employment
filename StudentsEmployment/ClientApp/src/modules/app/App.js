import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { EmploymentList } from '../employmentList';
import { Employment } from '../employment';
import { OrganizationList } from '../organizationList';
import { Organization } from '../organization';
import { Login } from '../auth';
import PrivateRoute from './PrivateRoute';
import NotFound from '../NotFound';
import Alert from '../alert';
import { checkAuth } from '../auth/';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    dispatch(checkAuth());
    setLoading(false);
  })

  if (loading) return <h3>Пожалуйста, подождите идет загрузка...</h3>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/" element={
            <PrivateRoute>
              <EmploymentList/>
            </PrivateRoute>
          }/>
          <Route path="/employment" element={
            <PrivateRoute>
              <EmploymentList/>
            </PrivateRoute>
          }/>
          <Route path="/employment/:id" element={
            <PrivateRoute>
              <Employment/>
            </PrivateRoute>
          }/>
          <Route path="/organization" element={
            <PrivateRoute>
              <OrganizationList/>
            </PrivateRoute>
          }/>
          <Route path="/organization/:id" element={
            <PrivateRoute>
              <Organization/>
            </PrivateRoute>
          }/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
      <Alert/>
    </>
  );
}

export default App;
