import App, { Container } from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { ModalProvider } from "../components/context/Modal";
import youtube from "../lib/Youtube";

import '../style/index.scss';

const { publicRuntimeConfig } = getConfig();

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

  static async getInitialProps(appContext) {
    const props: any = await App.getInitialProps(appContext);

    return {
      ...props,
    };
  }

  constructor(props) {
    super(props);
    this.youtubeInit();
  }

  youtubeInit() {
    if (typeof window !== 'undefined') {
      youtube.init();
    }
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