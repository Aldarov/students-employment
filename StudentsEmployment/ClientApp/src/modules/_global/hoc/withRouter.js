import React from 'react';
import { useNavigate } from 'react-router-dom';

const withRouter = Component => ({...props}) => {
  const navigate = useNavigate();

  return (
    <Component
      {...props}
      navigate={navigate}
    />
  );
};

export default withRouter;
