import React from 'react';
import { Provider } from 'mobx-react';

import { getStores, initializeStores, insertClasses, insertStores } from '../../store/index';
import * as authApi from '../../api/auth/index';
import { setToken } from '../../api';
import cookieUtil, { COOKIE_KEYS } from '../../lib/cookies';

interface IState {
  stores: any;
}

function withStore(additionalStores: any = {}) {
  return function(WrappedComponent) {
    class _withStore extends React.Component<any, IState> {
      static async getInitialProps(ctx) {
        const { req } = ctx;

        insertStores(additionalStores);
        // insertStores({
        //     boardListStore: BoardListStore,
        //     boardStore: BoardStore
        // })
        let stores = initializeStores();

        cookieUtil.setCtx(ctx);
        const accessToken = cookieUtil.get(COOKIE_KEYS.ACCESS_TOKEN);
        if (req && accessToken) {
          try {
            const decodedToken = await authApi.checkToken({ token: accessToken });
            const { authStore } = stores;

            authStore.setUser({
              username: decodedToken.user_name,
              authorities: decodedToken.authorities,
              id: decodedToken.id,
            });

            setToken(accessToken);
          } catch (e) {
            console.error(e);
            // cookieUtil.destroy(COOKIE_KEYS.ACCESS_TOKEN)
            // cookieUtil.destroy(COOKIE_KEYS.REFRESH_TOKEN)
            // setToken()
          }
        }
        stores = getStores();
        const props = await WrappedComponent.getInitialProps(ctx);
        return {
          ...props,
          stores,
        };
      }

      constructor(props) {
        super(props);
        const isServer = typeof window === 'undefined';
        // let storeMap = props.stores
        let stores = null;
        if (isServer) {
          stores = props.stores;
        } else {
          insertClasses(additionalStores);
          stores = initializeStores(props.stores);
        }

        const accessToken = cookieUtil.get(COOKIE_KEYS.ACCESS_TOKEN);
        setToken(accessToken);

        this.state = {
          stores: stores,
        };
      }

      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        const { pageProps, ...props } = this.props;
        const { stores } = this.state;
        return (
          <Provider {...stores}>
            <WrappedComponent {...props} />
          </Provider>
        );
      }
    }

    return _withStore;
  };
}

export default withStore;
