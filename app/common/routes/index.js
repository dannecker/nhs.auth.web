import React from 'react';

import { Route, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';
import Default from 'containers/layouts/Default';
import FAQ from 'containers/layouts/FAQ';

import SignInPage from 'containers/pages/SignInPage';
import AcceptPage from 'containers/pages/AcceptPage';
import ConditionPage from 'containers/pages/ConditionPage';

import NotFoundPage from 'containers/pages/NotFoundPage';

import { getUser, getToken } from 'reducers';

import { isLoginned, logout } from 'redux/session';
import { fetchUserData } from 'redux/user';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  const requireAuth = (nextState, replace, next) =>
    store.dispatch(isLoginned()).then((loginned) => {
      if (!loginned) {
        replace({ pathname: '/' });
        return next();
      }

      const currentState = store.getState();
      const person = getUser(currentState);

      if (person) return next();

      return store.dispatch(fetchUserData(getToken(currentState))).then((action) => {
        if (action.error) {
          store.dispatch(logout());
          replace({ pathname: '/' });
        }

        return next();
      });
    });

  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <Route component={Default}>
            <Route path="sign-in" component={SignInPage} />
            <Route path="accept" component={AcceptPage} onEnter={requireAuth} />
          </Route>

          <Route component={FAQ}>
            <Route path="conditions" component={ConditionPage} />
          </Route>

          <IndexRedirect to="sign-in" />
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
