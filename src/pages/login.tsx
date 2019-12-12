import React from 'react';
import LoginForm from "../components/loginForm";
import Header from "../components/layout/Header";
import withStore from "../components/hoc/withStore";
import { inject, observer } from 'mobx-react';
import ToastrStore from '../store/common/ToastrStore'
import ToastrMessage from '../dto/common/toastrMessage'
import '../style/index.scss';
import '../style/login/index.scss';

// import firebase from 'firebase';

interface IProps {
  url?: {
    query: {
      redirectUri?: string
    }
  },
  toastrStore: ToastrStore
}

interface IState {
}

@withStore()
@inject('toastrStore')
@observer
class LoginPage extends React.Component<IProps, IState> {

  static getInitialProps() {
    return {};
  }

  componentDidMount() {
    // this.initFirebase();
    this.props.toastrStore.alert(new ToastrMessage('message'))
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