import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEduForms, getDirectionTypes, getDistributionTypes, getUserInfo
} from './dictionaries.actions';


const Dictionaries = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getEduForms());
      dispatch(getDirectionTypes());
      dispatch(getDistributionTypes());
      dispatch(getUserInfo());
    }
  }, [isAuth]);

  return null;
};


export default Dictionaries;
