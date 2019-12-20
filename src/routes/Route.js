import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '../pages/_layouts/default';

import store from '~/store';

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students/list" />;
  }

  if (!signed) {
    return <Route {...rest} component={Component} />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  );
}

RouterWrapper.defaultProps = {
  isPrivate: false,
};

RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.element])
    .isRequired,
};
