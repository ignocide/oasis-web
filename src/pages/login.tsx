import React from 'react';
import { Row } from "../components/layout/grid";
import LoginForm from "../components/loginForm";
import '../style/index.scss';
import '../style/header.scss';
import Header from "../components/layout/header";
import withStore from "../components/hoc/withStore";

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

  static getInitialProps (){
    return {}
  }
  componentDidMount() {
    // this.initFirebase();
  }

  render() {

    return (
      <div id="main">
        <div id={'main-container'} className="container">
          <Header />
          <Row style={{paddingTop: 50, textAlign: 'center'}}>
            <LoginForm />
          </Row>
        </div>
      </div>
    );
  }

}

export default LoginPage;