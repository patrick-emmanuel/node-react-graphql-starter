import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { getAuthToken } from './utils';

const SectionRoute: React.StatelessComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = getAuthToken();
  // Implement permissions here.
  return (
    <>
      <Route
        {...rest}
        render={props =>
          token ? (
            <div className="mt-10 md:mx-64 sm:mx-16 mx-6">
              <Component {...props} />
            </div>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    </>
  );
};

SectionRoute.displayName = 'Route';
export default SectionRoute;
