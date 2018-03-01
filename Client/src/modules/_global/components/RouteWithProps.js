import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RouteWithProps(props) {
  const { component: Component, componentProps, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} {...componentProps}/>
      )}
    />
  );
}

RouteWithProps.propTypes ={
  component: PropTypes.any.isRequired,
  componentProps: PropTypes.object.isRequired
};
