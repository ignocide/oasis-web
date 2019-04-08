import React from 'react';
import { Row } from "../components/layout/grid";
import LoginForm from "../components/loginForm";
import '../style/index.scss';
import '../style/header.scss';
import Header from "../components/header";

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

class LoginPage extends React.Component<IProps, IState> {

  componentDidMount() {
    // this.initFirebase();
  }

  // initFirebase = () => {
  //   firebase.initializeApp(clientConfig.firebase)
  //
  //   firebase.auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       // this.setState({ user: user })
  //       // console.log(user)
  //       const { url } = this.props
  //       const token = await user.getIdToken()
  //       try {
  //         await axios.post('/api/login', {
  //           token
  //         })
  //         let replacePath = url.query.redirectUri || '/woofer'
  //         url.replace(replacePath)
  //
  //       }
  //       catch (e) {
  //         alert('로그인 실패 관리한테 물어보세요')
  //       }
  //     } else {
  //       this.setState({ user: null })
  //       // eslint-disable-next-line no-undef
  //       fetch('/api/logout', {
  //         method: 'POST',
  //         credentials: 'same-origin'
  //       })
  //     }
  //   })
  // }

  render() {

    return (
      <div className="main">
        <Header />
        {/*<nav id={'gnb'}>*/}
        {/*<div className="gnb-main">*/}
        {/*<div className="gnb-main-wrapper container">*/}
        {/*<div className="gnb-main-left">*/}
        {/*<Link href={'/'}>{"WOOFER"}</Link>*/}
        {/*</div>*/}
        {/*<div className="gnb-main-center">*/}

        {/*</div>*/}
        {/*<div className="gnb-main-right">*/}
        {/*<Link href={'/'}>{"로그인"}</Link>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<div className="gnb-sub">*/}
        {/*<div className="gnb-sub-wrapper container">*/}
        {/*<div className="gnb-sub-left">*/}
        {/*<Link href={'/'}>{'재생목록'}</Link>*/}
        {/*<Link href={'/'}>{'검색'}</Link>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</nav>*/}
        <div id={'main-container'} className="container">
          <Row style={{paddingTop: 50, textAlign: 'center'}}>
            <LoginForm />
          </Row>
        </div>
        {/*<div className="container">*/}
        {/*<Row style={{paddingTop: 50, textAlign: 'center'}}>*/}
        {/*<Col size={6}>*/}
        {/*<LoginForm />*/}
        {/*</Col>*/}
        {/*</Row>*/}
        {/*</div>*/}
      </div>
    );
  }

}

export default LoginPage;