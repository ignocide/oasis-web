import { Component } from 'react';
import { stackStore } from '../../store/index';
import withStore from './withStore';
import AuthStore from '../../store/auth';
import { inject } from 'mobx-react';
import { setToken } from '../../api/server';

interface IProps {
  withAuthProps: {
    user?: any,
    token?: string,
  },
  auth: AuthStore
}

function withAuth(WrappedComponent) {
  // ...and returns another component...
  @inject('auth')
  class _withAuth extends Component<IProps, any> {
    constructor(props) {
      super(props);
      const {auth, withAuthProps} = props;
      const {user, token} = withAuthProps;
      if (user) {
        auth.setUser(user);
        auth.setToken(token);
        setToken(token);
      }
    }

    static async getInitialProps(ctx) {
      // const { user } = ctx.req.session
      const {req} = ctx;

      let user = null;
      let token = null;
      if (req && req.session) {
        user = req.session.user;
        token = req.session.token;
        setToken(token);
      }
      let appProps = WrappedComponent.getInitialProps(ctx);
      return {
        ...appProps,
        withAuthProps: {
          user, token
        }
      };
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent  {...this.props} />;
    }
  };

  return withStore(AuthStore)(_withAuth);
}

export default withAuth;