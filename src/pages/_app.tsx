import App, { Container } from 'next/app';
import React from 'react';
import { ModalProvider } from "../components/context/Modal";

interface IProps {
  Component: any,
  pageProps: any,
  stores: any
}

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
  }

  static async getInitialProps(appContext) {
    const props: any = await App.getInitialProps(appContext);

    return {
      ...props,
    };
  }

  render() {
    const { Component, pageProps, ...props } = this.props;
    return (
      <Container>
        <ModalProvider>
          <Component  {...pageProps} />
          <div id="modal-container" />
        </ModalProvider>
      </Container>
    );
  }
}

export default OasisApp;