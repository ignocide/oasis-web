import Link from 'next/link'
import axios from 'axios'
import Layout from '../components/layout'
import { Component } from 'react';
import withAuth from '../components/hoc/withAuth'
import withStore from '../components/hoc/withStore';
import { inject, observer } from 'mobx-react'

interface PI {
  shows: any
}

// @withStore()
// @withAuth
@inject('auth')
@observer
class Index extends Component<PI, null> {
  static getInitialProps = async function () {


    return {
    }
  }

  render() {
    return (
      <Layout>
        <h1>Batman TV Shows</h1>
        <ul>

        </ul>
      </Layout>
    )
  }

}
export default Index