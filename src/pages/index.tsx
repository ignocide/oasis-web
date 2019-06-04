import Layout from '../components/layout';
import React from 'react';
import { inject, observer } from 'mobx-react';
import withStore from "../components/hoc/withStore";

interface PI {
  shows: any
}

@withStore({
})
@inject('auth')
@observer
class Index extends React.Component<PI, any> {
  static getInitialProps = async function () {


    return {};
  };

  render() {
    return (
      <Layout>
        <h1>{'Batman TV Shows'}</h1>
        <ul>

        </ul>
      </Layout>
    );
  }

}

export default Index;