import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import { EmploymentList } from '../employmentList';
import { Employment } from '../employment';
import { OrganizationList } from '../organizationList';
import { Organization } from '../organization';
import { Login } from '../auth';
import { Dictionaries } from '../layout';
import PrivateRoute from './PrivateRoute';
import NotFound from '../NotFound';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const App = () => {
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
      <Alert
        stack={{limit: 5}}
        timeout='none'
        position='bottom'
        effect='scale'
      />
      <Dictionaries/>
    </>
  );
}

export default App;
