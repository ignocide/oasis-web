import React from 'react';
import * as authApi from "../api/server/auth/index";
import { COOKIE_KEYS, default as cookieUtil } from "../lib/cookies";
import { setToken } from "../api/server/oasis";
import Router from 'next/router';

import '../style/login-form.scss';
import Panel, { PanelBody, PanelFooter, PanelHeader } from "./common/Panel";
import { ButtonGroup, FieldInput } from "./form/Field";
import { Button } from "./form/index";

interface IProps {
}

interface IState {
  loginForm: {
    username: string,
    password: string,
  }
}

class LoginForm extends React.Component<IProps, IState> {
  state = {
    loginForm: {
      username: '',
      password: ''
    }
  };

  requestLogin = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { loginForm } = this.state;
    const { access_token, refresh_token } = await authApi.login({
      username: loginForm.username,
      password: loginForm.password
    });

    setToken(access_token);
    cookieUtil.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
    cookieUtil.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);

    Router.push({
      pathname: '/'
    });
  };
  // handleLogin () {
  //   firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

  validate = (e) => {
    const { username, password } = this.state.loginForm;
    if (!username || !password) {
      e.stopPropagation();
      e.preventDefault();
    }

  };

  onChangeLoginFormValue = (e) => {
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const { username, password } = this.state.loginForm;

    return (
      <Panel>
        <form id='Login' onSubmit={this.requestLogin}>
          <PanelHeader>
            {'로그인'}
          </PanelHeader>
          <PanelBody>
            <FieldInput label={'email'} value={username} type={'text'} onChange={this.onChangeLoginFormValue} name={'username'} />
            <FieldInput label={'password'} value={password} type={'password'} onChange={this.onChangeLoginFormValue} name={'password'} />
          </PanelBody>
          <PanelFooter>
            <ButtonGroup>
              <Button shape={'fill'} onClick={this.validate}>{'로그인'}</Button>
            </ButtonGroup>
          </PanelFooter>
        </form>
      </Panel>
    );
  }
}

export default LoginForm;
