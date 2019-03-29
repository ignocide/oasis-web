import App, { Container } from 'next/app';
import React from 'react';

interface IProps {
  Component: any,
  pageProps: any,
  stores: any
}

// {
//   "user_name": "gugzin@naver.com",
//   "scope": [
//   "openId"
// ],
//   "ati": "57425632-e488-440c-aad8-3d005752ef37",
//   "id": 1,
//   "exp": 1581754372,
//   "authorities": [
//   "write",
//   "ROLE_USER",
//   "read"
// ],
//   "jti": "c6f169d9-c3b7-4f03-be53-8c656af8923f",
//   "client_id": "custom"
// }

interface DecodedToken {
  user_name: string,
  authorities: string[],
  id: number,
}

class OasisApp extends App<IProps> {
  state: any;
  clazz: any[];

  constructor(props) {
    super(props);
    // console.log("이게 먼저??")
    // const isServer = typeof window === 'undefined'
    // // let storeMap = props.stores
    // const stores = isServer
    //   ? props.stores
    //   : initializeStores(props.stores);
    // const accessToken = cookieUtil.get(COOKIE_KEYS.ACCESS_TOKEN)
    // setToken(accessToken)

    // this.state = {
    //   stores: stores
    // }
  }

  static async getInitialProps(appContext) {
    // const { ctx } = appContext;

    // const { req } = ctx

    // const stores = initializeStores();

    // cookieUtil.setCtx(ctx);
    // const accessToken = cookieUtil.get(COOKIE_KEYS.ACCESS_TOKEN)
    // if (req && accessToken) {
    //   try {
    //     const decodedToken = await authApi.checkToken({ token: accessToken })
    //     const authStore: AuthStore = stores.auth;
    //     authStore.setUser({
    //       username: decodedToken.user_name,
    //       authorities: decodedToken.authorities,
    //       id: decodedToken.id,
    //     })
    //     setToken(accessToken)
    //   } catch (e) {
    //     console.error(e)
    //     // cookieUtil.destroy(COOKIE_KEYS.ACCESS_TOKEN)
    //     // cookieUtil.destroy(COOKIE_KEYS.REFRESH_TOKEN)
    //     // setToken()
    //   }

    // }

    // if (req && req.session) {
    //   const authStore :AuthStore= stores.auth;
    //   const user = req.session.user
    //   const token = req.session.token;
    //   authStore.setUser(user);
    //   authStore.setToken(token);
    //   setToken(token);
    // }
    // const props = await App.getInitialProps(appContext)
    const props: any = await App.getInitialProps(appContext);

    // initializeStores();
    return {
      ...props,
      // stores: {
      //   ...stores
      // }
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.info("여기 들림?")
  //   const isServer = typeof window === 'undefined'
  //   // let storeMap = props.stores
  //   const stores = isServer
  //     ? nextProps.stores
  //     : initializeStores(nextProps.stores);
  //   const accessToken = cookieUtil.get(COOKIE_KEYS.ACCESS_TOKEN)
  //   setToken(accessToken)

  //   return {
  //     stores: stores
  //   }
  // }

  render() {
    const {Component, pageProps, ...props} = this.props;
    // const { stores } = this.state;
    // console.log('in render stores', stores)
    return (
      <Container>
        <Component  {...pageProps} />
        <div id="modal-container" />
      </Container>
    );
  }
}

export default OasisApp;