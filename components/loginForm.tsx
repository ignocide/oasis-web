import { Component } from 'react';
import '../style/login-form.scss'
import * as authApi from "../api/server/auth/index";
import { COOKIE_KEYS, default as cookieUtil } from "../lib/cookies";
import { setToken } from "../api/server/oasis";
import Router from 'next/router'

interface IProps {
}

interface IState {
  loginForm: {
    username: string,
    password: string,
  }
}

class LoginForm extends Component<IProps, IState> {
  state = {
    loginForm: {
      username: '',
      password: ''
    }
  }

  requestLogin = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { loginForm } = this.state
    const { access_token, refresh_token } = await authApi.login({
      username: loginForm.username,
      password: loginForm.password
    })
    setToken(access_token)
    cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
    cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);

    Router.push({
      pathname: '/'
    })
  }
  // handleLogin () {
  //   firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

  validate = (e) => {
    const { username, password } = this.state.loginForm;
    if (!username || !password) {
      e.stopPropagation();
      e.preventDefault();
    }

  }

  onChangeLoginFormValue = (e) => {
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const { username, password } = this.state.loginForm;

    return (
      <form id='Login' onSubmit={this.requestLogin}>
        <div className='SocialHeader'>
          로그인
          </div>
        <div className='SocialBody'>
          <input value={username} type={'text'} onChange={this.onChangeLoginFormValue} name={'username'} /><br />
          <input value={password} type={'password'} onChange={this.onChangeLoginFormValue} name={'password'} /><br />
          <button className='btn btn-social google' onClick={this.validate}>로그인</button>
        </div>
      </form>
    )
  }
}

export default LoginForm;
