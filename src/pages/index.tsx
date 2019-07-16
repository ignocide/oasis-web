import Layout from '../components/layout';
import React from 'react';
import Link from "next/link";
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
        <ul>
          <li>
            <Link href={'/todo'}>{'todo'}</Link>
            <Link href={'/woofer'}>{'woofer'}</Link>
          </li>
        </ul>
      </Layout>
    );
  }

}

export default Index;