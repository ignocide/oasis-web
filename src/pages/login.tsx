import React from 'react';
import LoginForm from "../components/loginForm";
import Header from "../components/layout/header";
import withStore from "../components/hoc/withStore";

import '../style/index.scss';
import '../style/login/index.scss';

// import firebase from 'firebase';

interface IProps {
  url?: {
    query: {
      redirectUri?: string
    }
  }
}

interface IState {
}

@withStore()
class LoginPage extends React.Component<IProps, IState> {

  static getInitialProps() {
    return {};
  }

  componentDidMount() {
    // this.initFirebase();
  }

  render() {

    return (
      <div id="main" className={'login-page'}>
        <div id={'main-container'} className="container">
          <Header />
          <div className={'login-form-container'}>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

}

export default LoginPage;